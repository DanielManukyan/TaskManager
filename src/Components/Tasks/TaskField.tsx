import { useMemo, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { deleteTask, updateTask } from "../../features/task/taskSlice";

interface Props {
  taskId: string;
  columnId: string;
  title: string;
}

export default function TaskField({ taskId, columnId, title }: Props) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  const isDirty = useMemo(() => value.trim() !== title.trim(), [title, value]);

  const onSave = async () => {
    const nextTitle = value.trim();
    if (!nextTitle) return;
    if (!isDirty) {
      setIsEditing(false);
      return;
    }
    await dispatch(updateTask({ id: taskId, patch: { title: nextTitle, columnId } }));
    setIsEditing(false);
  };

  const onDelete = async () => {
    await dispatch(deleteTask(taskId));
  };

  return (
    <div className="bg-white rounded px-2 py-2 shadow-sm border border-gray-200">
      {isEditing ? (
        <div className="flex gap-2 items-center">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            autoFocus
          />
          <button
            type="button"
            onClick={onSave}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setValue(title);
              setIsEditing(false);
            }}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm break-words">{title}</div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}