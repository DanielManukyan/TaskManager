import { useState, type FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { selectColumns, addColumn, updateColumn } from "../../features/column/columnSlice";
import { selectTasks, updateTask } from "../../features/task/taskSlice";
import SortableColumn from "../Dnd/SortableColumn";
import { DndContext, closestCenter, type DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";

interface ColumnListProps {
  boardId: string;
}

function ColumnsList({ boardId }: ColumnListProps) {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(selectColumns)
    .filter((c) => c.boardId === boardId)
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const tasks = useAppSelector(selectTasks);

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleAddColumn = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addColumn({ title: title.trim(), boardId }));
    setTitle("");
    setIsAdding(false);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeType = active.data.current?.type as string | undefined;
    const overType = over.data.current?.type as string | undefined;

    // ===== columns =====
    if (activeType === "column" && overType === "column") {
      const activeId = String(active.id);
      const overId = String(over.id);
      if (activeId === overId) return;

      const oldIndex = columns.findIndex((c) => c.id === activeId);
      const newIndex = columns.findIndex((c) => c.id === overId);
      if (oldIndex === -1 || newIndex === -1) return;

      const next = arrayMove(columns, oldIndex, newIndex);
      next.forEach((col, idx) => {
        if (col.order !== idx) dispatch(updateColumn({ id: col.id, patch: { order: idx } }));
      });
      return;
    }

    // ===== tasks =====
    if (activeType === "task") {
      const activeTaskId = String(active.id);
      const fromColumnId = String(active.data.current?.columnId ?? "");
      if (!fromColumnId) return;

      // drop target can be another task OR column container
      let toColumnId = fromColumnId;
      let overTaskId: string | null = null;

      if (overType === "task") {
        toColumnId = String(over.data.current?.columnId ?? fromColumnId);
        overTaskId = String(over.id);
      } else if (overType === "column") {
        toColumnId = String(over.data.current?.columnId ?? fromColumnId);
      }

      const fromTasks = tasks
        .filter((t) => t.columnId === fromColumnId)
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      const toTasks =
        toColumnId === fromColumnId
          ? fromTasks
          : tasks
              .filter((t) => t.columnId === toColumnId)
              .slice()
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      const activeTask = fromTasks.find((t) => t.id === activeTaskId);
      if (!activeTask) return;

      const fromWithout = fromTasks.filter((t) => t.id !== activeTaskId);
      const overIndex = overTaskId ? toTasks.findIndex((t) => t.id === overTaskId) : toTasks.length;
      const insertIndex = Math.max(0, overIndex === -1 ? toTasks.length : overIndex);

      const nextTo =
        toColumnId === fromColumnId
          ? (() => {
              const idxFrom = fromTasks.findIndex((t) => t.id === activeTaskId);
              if (idxFrom === -1) return fromTasks;
              const idxTo = insertIndex;
              return arrayMove(fromTasks, idxFrom, idxTo);
            })()
          : (() => {
              const next = toTasks.slice();
              next.splice(insertIndex, 0, { ...activeTask, columnId: toColumnId });
              return next;
            })();

      // persist orders in "to" column
      nextTo.forEach((t, idx) => {
        const patch: Partial<{ title: string; columnId: string; order: number }> = {};
        if (t.order !== idx) patch.order = idx;
        if (t.id === activeTaskId && fromColumnId !== toColumnId) patch.columnId = toColumnId;
        if (Object.keys(patch).length) dispatch(updateTask({ id: t.id, patch }));
      });

      // if moved across columns, persist orders in "from" column too
      if (fromColumnId !== toColumnId) {
        fromWithout.forEach((t, idx) => {
          if (t.order !== idx) dispatch(updateTask({ id: t.id, patch: { order: idx } }));
        });
      }
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={columns.map((c) => c.id)} strategy={horizontalListSortingStrategy}>
        <div className="flex items-start gap-4">
          {columns.map((column) => (
            <SortableColumn key={column.id} columnId={column.id} />
          ))}

          <div className="bg-gray-300/90 px-2 w-64 rounded shrink-0">
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
      </SortableContext>
    </DndContext>
  );
}

export default ColumnsList;