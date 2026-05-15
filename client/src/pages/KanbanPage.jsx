import PageHeader from '../components/common/PageHeader';
import KanbanBoard from '../components/tasks/KanbanBoard';
import { useTasks } from '../contexts/TaskContext';

const KanbanPage = () => {
  const { filteredTasks, reorderTasks } = useTasks();

  return (
    <div>
      <PageHeader title=" Task board" description="Drag tasks fluidly between Todo, In Progress, and Completed for a visual delivery workflow." />
      <KanbanBoard tasks={filteredTasks} onReorder={reorderTasks} />
    </div>
  );
};

export default KanbanPage;
