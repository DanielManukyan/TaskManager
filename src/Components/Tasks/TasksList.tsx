import { useAppSelector } from "../../hooks/redux";
import { selectTasks } from "../../features/task/taskSlice";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTask from "../Dnd/SortableTask";

interface Props {
  columnId: string;
}

export default function TasksList({ columnId }: Props) {

  const tasks = useAppSelector(selectTasks);

  const columnTasks = tasks.filter(
    task => task.columnId === columnId
  ).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <SortableContext items={columnTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
      <div className="flex flex-col gap-2 min-h-6">
        {columnTasks.map((task) => (
          <SortableTask
            key={task.id}
            taskId={task.id}
            columnId={task.columnId}
            title={task.title}
          />
        ))}
      </div>
    </SortableContext>
  );
}