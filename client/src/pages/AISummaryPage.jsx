import { Sparkles } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import AISummaryPanel from '../components/ai/AISummaryPanel';
import { useTasks } from '../contexts/TaskContext';

const AISummaryPage = () => {
  const { summary, loadSummary, createAiReminder } = useTasks();

  return (
    <div>
      <PageHeader
        title="AI summary"
        description="OpenAI-powered daily recap with pending task insights, smart prioritization, and motivation."
        action={
          <div className="flex gap-3">
            <button className="btn-secondary" onClick={createAiReminder}>Create AI reminder</button>
            <button className="btn-primary gap-2" onClick={loadSummary}><Sparkles className="h-4 w-4" /> Refresh summary</button>
          </div>
        }
      />
      <AISummaryPanel summary={summary} />
    </div>
  );
};

export default AISummaryPage;
