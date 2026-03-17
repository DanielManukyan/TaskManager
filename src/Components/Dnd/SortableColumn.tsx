import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Column from "../Columns/Column";

export default function SortableColumn({ columnId }: { columnId: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: columnId,
    data: { type: "column", columnId },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="shrink-0">
      <div className="flex items-center justify-between px-1 pb-1">
        <button
          type="button"
          className="text-xs text-gray-500 hover:text-gray-700 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          Drag
        </button>
      </div>
      <Column columnId={columnId} />
    </div>
  );
}

