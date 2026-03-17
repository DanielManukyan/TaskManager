import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskField from "../Tasks/TaskField";

type Props = {
  taskId: string;
  columnId: string;
  title: string;
};

export default function SortableTask({ taskId, columnId, title }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: taskId,
    data: { type: "task", taskId, columnId },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="cursor-grab active:cursor-grabbing touch-none"
      {...attributes}
      {...listeners}
      onPointerDownCapture={(e) => {
        const el = e.target as HTMLElement | null;
        if (!el) return;
        // чтобы клики по кнопкам/инпуту не запускали drag
        if (el.closest("button, input, textarea, a, select")) e.stopPropagation();
      }}
    >
      <TaskField taskId={taskId} columnId={columnId} title={title} />
    </div>
  );
}

