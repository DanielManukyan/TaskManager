
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

export const createBoard = async (board: Omit<Board, 'id'>): Promise<Board> => {
  const res = await fetch(`${API_URL}/boards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(board),
  })
  return res.json()
}

export const createColumn = async (column: Omit<Column, 'id'>): Promise<Column> => {
  const res = await fetch(`${API_URL}/columns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(column),
  })
  return res.json()
}

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  })
  return res.json()
}

export const updateBoard = async (
  id: string,
  patch: Partial<Omit<Board, 'id'>>
): Promise<Board> => {
  const res = await fetch(`${API_URL}/boards/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  })
  return res.json()
}

export const deleteBoard = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/boards/${id}`, { method: 'DELETE' })
}

export const updateColumn = async (
  id: string,
  patch: Partial<Omit<Column, 'id'>>
): Promise<Column> => {
  const res = await fetch(`${API_URL}/columns/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  })
  return res.json()
}

export const deleteColumn = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/columns/${id}`, { method: 'DELETE' })
}

export const updateTask = async (
  id: string,
  patch: Partial<Omit<Task, 'id'>>
): Promise<Task> => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  })
  return res.json()
}

export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' })
}