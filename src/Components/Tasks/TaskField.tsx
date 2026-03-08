/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { selectTaskById, removeTask } from "../../features/task/taskSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskFieldProps {
  taskId: string;
  columnId: string;
}

function TaskField({ taskId, columnId }: TaskFieldProps) {
  const dispatch = useAppDispatch();
  const task = useAppSelector(state => selectTaskById(state, taskId));
  if (!task) return null;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: `${columnId}-${taskId}`,data: { task } })
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-2 flex items-center justify-between border rounded bg-white shadow-sm">
      <h3 className="font-bold">{task.title}</h3>
      {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
      <p onClick={() => dispatch(removeTask(taskId))} className="cursor-pointer">X</p>
    </div>
  );
}

export default TaskField;