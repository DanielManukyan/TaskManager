import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTasks, createTask as createTaskApi } from '../db/dbTable'

export interface Task {
  id: number
  title: string
  columnId: number
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
    const newTask = { ...task, id: Date.now() }
    await createTaskApi(newTask)
    return newTask
  }
)

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
  },
})

export default taskSlice.reducer