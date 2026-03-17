import { useState, type FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { selectColumnById, insertTaskIntoColumn } from "../../features/column/columnSlice";
import { addTask } from "../../features/task/taskSlice";
import TaskList from "../Tasks/TasksList";

interface ColumnProps {
  columnId: string;
}

function Column({ columnId }: ColumnProps) {
  const dispatch = useAppDispatch();
  const column = useAppSelector(state => selectColumnById(state, columnId));

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  if (!column) return null;

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const action = addTask(columnId, title);
    dispatch(action);
    dispatch(insertTaskIntoColumn({ columnId, taskId: action.payload.id }));

    setTitle("");
    setIsAdding(false);
  };

  return (
    <div className="flex w-64 bg-gray-200 rounded-xl flex-col p-3 gap-3">
      <div className="font-bold text-lg">{column.title}</div>
      <TaskList columnId={columnId} />
      {isAdding ? (
        <form onSubmit={handleAddTask} className="flex flex-col gap-2">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" className="border rounded px-2 py-1 w-full" autoFocus />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
            <button type="button" className="bg-gray-300 px-3 py-1 rounded" onClick={() => { setIsAdding(false); setTitle(''); }}>Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setIsAdding(true)} className="text-gray-700 hover:bg-gray-300 w-full text-left px-2 py-1 rounded">+ Add a Card</button>
      )}
    </div>
  );
}

export default Column;