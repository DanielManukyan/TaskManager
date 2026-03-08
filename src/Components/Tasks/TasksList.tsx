import TaskField from "./TaskField";
import { useAppSelector } from "../../hooks/redux";
import { selectColumnById } from "../../features/column/columnSlice";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface TaskListProps {
  columnId: string;
}

function TaskList({ columnId }: TaskListProps) {
  const column = useAppSelector(state => selectColumnById(state, columnId));
  if (!column) return null;

  return (
    <SortableContext items={column.taskIds.map(id => `${columnId}-${id}`)} strategy={verticalListSortingStrategy}>
      <div className="flex flex-col gap-2">
        {column.taskIds.map(taskId => <TaskField key={taskId} taskId={taskId} columnId={columnId} />)}
      </div>
    </SortableContext>
  );
}

export default TaskList;