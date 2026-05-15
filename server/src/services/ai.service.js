const OpenAI = require('openai');
const AISummary = require('../models/AISummary');
const Task = require('../models/Task');
const { getAnalyticsOverview } = require('./analytics.service');

const heuristicSummary = (tasks, analytics) => {
  const highPriority = tasks.filter((task) => ['high', 'urgent'].includes(task.priority) && task.status !== 'completed');
  const upcoming = tasks
    .filter((task) => task.status !== 'completed' && task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  const topFocus = highPriority[0] || upcoming[0] || tasks.find((task) => task.status !== 'completed');
  const suggestionBase = topFocus
    ? `Focus on \"${topFocus.title}\" next because it has the strongest urgency signal.`
    : 'You are all caught up. Use tomorrow to plan deeper work blocks and recovery time.';

  return {
    content: `You completed ${analytics.totals.completed} of ${analytics.totals.total} tracked tasks, giving you a productivity score of ${analytics.productivityScore}%. ${suggestionBase}`,
    productivityScore: analytics.productivityScore,
    insights: [
      `${analytics.totals.pending} tasks are still open in your workspace.`,
      `${highPriority.length} open tasks are high or urgent priority.`,
      `${analytics.totals.overdue} tasks are currently overdue.`
    ],
    suggestions: [
      suggestionBase,
      'Batch similar tasks together to reduce context switching.',
      'Schedule one focused block tomorrow for unfinished work and one lighter admin block.'
    ]
  };
};

const buildPrompt = (tasks, analytics) => {
  const compactTasks = tasks.slice(0, 15).map((task) => ({
    title: task.title,
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate,
    category: task.categorySlug,
    labels: task.labels
  }));

  return `You are an AI productivity coach. Analyze the following task snapshot and return JSON with keys: content, productivityScore, insights(array of 3 strings), suggestions(array of 3 strings). Keep it concise but motivational. Data: ${JSON.stringify({ analytics, tasks: compactTasks })}`;
};

const generateDailySummary = async (userId) => {
  const tasks = await Task.find({ user: userId, isDeleted: false }).lean();
  const analytics = await getAnalyticsOverview(userId);
  const summaryDate = new Date().toISOString().slice(0, 10);

  let payload = heuristicSummary(tasks, analytics);

  if (process.env.OPENAI_API_KEY) {
    try {
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: buildPrompt(tasks, analytics) }]
      });

      const parsed = JSON.parse(completion.choices[0].message.content || '{}');
      payload = {
        content: parsed.content || payload.content,
        productivityScore: Number(parsed.productivityScore ?? payload.productivityScore),
        insights: Array.isArray(parsed.insights) ? parsed.insights : payload.insights,
        suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : payload.suggestions
      };
    } catch (error) {
      console.error('OpenAI summary fallback triggered:', error.message);
    }
  }

  const summary = await AISummary.findOneAndUpdate(
    { user: userId, summaryDate },
    { user: userId, summaryDate, ...payload },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return summary;
};

module.exports = { generateDailySummary };
