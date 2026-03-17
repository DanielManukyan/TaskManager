import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import UserBoardPage from './Pages/UserBoardPage'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks/redux'
import { setBoards } from './features/board/boardSlice'
import { setTasks } from './features/task/taskSlice'
import { addColumn, insertTaskIntoColumn } from './features/column/columnSlice'
import { getBoards, getColumns, getTasks } from './features/db/dbTable'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const loadData = async () => {

      const [boards, columns, tasks] = await Promise.all([
        getBoards(),
        getColumns(),
        getTasks()
      ])


      dispatch(setBoards(boards))

      dispatch(setTasks(tasks))

      columns.forEach(col => {
        dispatch(addColumn(col.title, col.boardId))
        if (col.taskIds?.length) {
          col.taskIds.forEach(taskId => {
            dispatch(insertTaskIntoColumn({ columnId: col.id, taskId }))
          })
        }
      })
    }

    loadData()
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/board/:id" element={<UserBoardPage />} />
    </Routes>
  )
}

export default App