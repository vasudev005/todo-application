import { Activity, CheckCheck, Clock3, TrendingUp } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import AnalyticsCharts from '../components/analytics/AnalyticsCharts';
import { useTasks } from '../contexts/TaskContext';

const AnalyticsPage = () => {
  const { analytics } = useTasks();

  return (
    <div>
      <PageHeader title="Analytics" description="Track completion velocity, category spread, and productivity trends with live charts." />
      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={TrendingUp} label="Productivity score" value={`${analytics?.productivityScore ?? 0}%`} hint="Current completion performance." />
        <StatCard icon={CheckCheck} label="Completed" value={analytics?.totals?.completed ?? 0} hint="Tasks marked done." tone="from-emerald-500/15 to-green-500/15" />
        <StatCard icon={Clock3} label="Pending" value={analytics?.totals?.pending ?? 0} hint="Tasks still active." tone="from-amber-500/15 to-orange-500/15" />
        <StatCard icon={Activity} label="Overdue" value={analytics?.totals?.overdue ?? 0} hint="Items beyond due date." tone="from-rose-500/15 to-pink-500/15" />
      </div>
      <AnalyticsCharts analytics={analytics} />
    </div>
  );
};

export default AnalyticsPage;
