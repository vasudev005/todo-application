const { generateDailySummary } = require('../services/ai.service');

const getSummary = async (req, res) => {
  const summary = await generateDailySummary(req.user._id);
  res.json({ summary });
};

module.exports = { getSummary };
