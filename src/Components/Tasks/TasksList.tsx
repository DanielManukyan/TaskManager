import { useAppSelector } from "../../hooks/redux";
import { selectTasks } from "../../features/task/taskSlice";
import TaskField from "./TaskField";

interface Props {
  columnId: string;
}

export default function TasksList({ columnId }: Props) {

  const tasks = useAppSelector(selectTasks);

  const columnTasks = tasks.filter(
    task => task.columnId === columnId
  );

  return (
    <div className="flex flex-col gap-2">
      {columnTasks.map(task => (
        <TaskField
          key={task.id}
          taskId={task.id}
          columnId={task.columnId}
          title={task.title}
        />
      ))}
    </div>
  );
}