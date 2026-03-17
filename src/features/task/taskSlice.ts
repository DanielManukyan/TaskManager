import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  createTask as createTaskApi,
  deleteTask as deleteTaskApi,
  getTasks,
  updateTask as updateTaskApi,
} from '../db/dbTable'
import type { RootState } from '../../app/store'

export interface Task {
  id: string
  title: string
  columnId: string
}

interface TaskState {
  tasks: Task[]
}

const initialState: TaskState = {
  tasks: [],
}

// 🔽 загрузка
export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  return await getTasks()
})

// 🔽 создание
export const addTask = createAsyncThunk(
  'tasks/add',
  async (task: Omit<Task, 'id'>) => {
    return await createTaskApi(task)
  }
)

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, patch }: { id: string; patch: Partial<Omit<Task, 'id'>> }) => {
    return await updateTaskApi(id, patch)
  }
)

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
  await deleteTaskApi(id)
  return id
})

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload
    })

    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload)
    })

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const idx = state.tasks.findIndex(t => t.id === action.payload.id)
      if (idx !== -1) state.tasks[idx] = action.payload
    })

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload)
    })
  },
})

export const selectTasks = (state: RootState) => state.task.tasks

export default taskSlice.reducer