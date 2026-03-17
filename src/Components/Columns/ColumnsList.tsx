import { useState, type FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { selectColumns, addColumn } from "../../features/column/columnSlice";
import Column from "./Column";

interface ColumnListProps {
  boardId: string;
}

function ColumnsList({ boardId }: ColumnListProps) {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(selectColumns).filter(c => c.boardId === boardId);

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const handleAddColumn = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addColumn({ title: title.trim(), boardId }));
    setTitle("");
    setIsAdding(false);
  };

  return (
    <div className="flex items-start gap-4">
        {columns.map(column => (
          <Column key={column.id} columnId={column.id} />
        ))}

      <div className="bg-gray-300/90 px-2 w-64 rounded">
        {isAdding ? (
          <form onSubmit={handleAddColumn} className="flex flex-col gap-2 p-2">
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="List title"
              className="border rounded px-2 py-1 w-full"
              autoFocus
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
                Add List
              </button>
              <button
                type="button"
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => { setIsAdding(false); setTitle(""); }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="text-gray-700 hover:bg-gray-300 w-full text-left px-2 py-2 rounded"
          >
            + Add another list
          </button>
        )}
      </div>
    </div>
  );
}

export default ColumnsList;