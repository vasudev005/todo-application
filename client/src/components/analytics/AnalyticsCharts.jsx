import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  LineChart,
  Line
} from 'recharts';

const palette = ['#8b5cf6', '#3b82f6', '#14b8a6', '#f97316', '#f43f5e'];

const AnalyticsCharts = ({ analytics }) => {
  if (!analytics) return null;

  const pieData = analytics.categoryStats.map((item) => ({ name: item.name, value: item.total }));

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <div className="glass-panel h-80 p-5">
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Weekly productivity</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analytics.weeklyProductivity}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.12} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
            <Bar dataKey="created" fill="#93c5fd" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-panel h-80 p-5">
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Category analysis</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4}>
              {pieData.map((entry, index) => (
                <Cell key={entry.name} fill={palette[index % palette.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-panel h-80 p-5 xl:col-span-2">
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Progress tracking</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analytics.weeklyProductivity}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.12} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="completed" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
