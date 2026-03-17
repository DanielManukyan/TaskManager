import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import { useAppDispatch } from "../hooks/redux";
import { moveTask } from "../features/task/taskSlice";
import ColumnsList from "../Components/Columns/ColumnsList";
import { useLocation } from "react-router-dom";
import Header from "../Components/Main/Header/Header";

export default function UserBoardPage() {

  const dispatch = useAppDispatch();
  const location = useLocation();

  const { board } = location.state;

  function handleDragEnd(event: DragEndEvent) {

    const { active, over } = event;

    if (!over) return;

    const taskId = active.id.toString();

    const toColumnId =
      over.data.current?.columnId || over.id.toString();

    dispatch(
      moveTask({
        taskId,
        toColumnId
      })
    );
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Header />
      <ColumnsList boardId={board.id} />
    </DndContext>
  );
}