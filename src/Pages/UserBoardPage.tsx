import Header from '../Components/Main/Header/Header';
import { useLocation } from 'react-router';
import type { Board } from '../features/board/boardSlice';
import ColumnList from '../Components/Columns/ColumnsList';
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useAppDispatch } from "../hooks/redux";
import { moveTask, reorderTasks } from "../features/column/columnSlice";
import { addTask } from '../features/task/taskSlice';

function UserBoardPage() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { board } = location.state as { board: Board };

  function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  if (!over) return;

  // Разбираем id формата: columnId-taskId
  const [fromColumnId, taskId] = active.id.toString().split("-");
  const [toColumnId, overTaskId] = over.id.toString().split("-");

  if (!taskId || !fromColumnId || !toColumnId) return;

  if (fromColumnId === toColumnId) {
    // Перемещение внутри колонки
    dispatch(reorderTasks({ columnId: fromColumnId, taskId, afterTaskId: overTaskId }));
  } else {
    // Перемещение в другую колонку
    dispatch(moveTask({ fromColumnId, toColumnId, taskId, afterTaskId: overTaskId }));

    // Обновляем саму задачу, чтобы columnId совпадал с новой колонкой
    dispatch(addTask(toColumnId, active.data.current?.title || "Task moved")); // <- временно создаём или обновляем
  }
}

  return (
    <div className="flex-1 h-screen" style={{ backgroundColor: board.bgColor }}>
      <Header />
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex overflow-x-auto gap-4 p-4">
          <ColumnList boardId={board.id} />
        </div>
      </DndContext>
    </div>
  );
}

export default UserBoardPage;