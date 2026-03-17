import { useEffect, useState } from "react";
import { addBoard, fetchBoards, type Board } from "../features/board/boardSlice";
import { fetchColumns } from "../features/column/columnSlice";
import { fetchTasks } from "../features/task/taskSlice";
import { useAppDispatch } from "../hooks/redux";


export default function UserBoardPage() {
  const [board, setBoard] = useState('');
  const [column, setColumn] = useState('');
  const [task, setTask] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBoards())
    dispatch(fetchColumns())
    dispatch(fetchTasks())
  }, [])

  return (
    <div>
      <h1>Boards</h1>

      <input
        value={board}
        onChange={(e) => setBoard(e.target.value)}
        placeholder="board"
      />
      <button onClick={addBoard}>add</button>

      {boards.map((b) => (
        <div key={b.id}>
          <h2>{b.title}</h2>

          <input
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            placeholder="column"
          />
          <button onClick={() => addColumn(b.id)}>add column</button>

          {columns
            .filter((c) => c.boardId === b.id)
            .map((c) => (
              <div key={c.id} style={{ marginLeft: 20 }}>
                <h3>{c.title}</h3>

                <input
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="task"
                />
                <button onClick={() => addTask(c.id)}>add task</button>

                {tasks
                  .filter((t) => t.columnId === c.id)
                  .map((t) => (
                    <p key={t.id}>- {t.title}</p>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
