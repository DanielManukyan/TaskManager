import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainPage from './Pages/Boards'
import UserBoardPage from './Pages/UserBoardPage'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks/redux'
import { fetchBoards } from './features/board/boardSlice'
import { fetchColumns } from './features/column/columnSlice'
import { fetchTasks } from './features/task/taskSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBoards())
    dispatch(fetchColumns())
    dispatch(fetchTasks())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/board/:id" element={<UserBoardPage />} />
    </Routes>
  )
}

export default App