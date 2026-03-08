
import type { Board } from '../board/boardSlice'
import type { Column } from '../column/columnSlice'
import type { Task } from '../task/taskSlice'

const API_URL = 'http://localhost:3001'

export const getBoards = async (): Promise<Board[]> => {
  const res = await fetch(`${API_URL}/boards`)
  return res.json()
}

export const getColumns = async (): Promise<Column[]> => {
  const res = await fetch(`${API_URL}/columns`)
  return res.json()
}

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${API_URL}/tasks`)
  return res.json()
}

export const createBoard = async (board: Board) => {
  await fetch(`${API_URL}/boards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(board),
  })
}

export const createColumn = async (column: Column) => {
  await fetch(`${API_URL}/columns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(column),
  })
}

export const createTask = async (task: Task) => {
  await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  })
}