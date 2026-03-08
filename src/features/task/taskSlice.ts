import { createEntityAdapter, createSlice, type PayloadAction, nanoid } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export interface Task {
  id: string
  columnId: string
  title: string
  description?: string
}

const tasksAdapter = createEntityAdapter<Task>()
const initialState = tasksAdapter.getInitialState()

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // Массовая загрузка задач
    setTasks: tasksAdapter.setAll,

    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        tasksAdapter.addOne(state, action.payload)
      },
      prepare(columnId: string, title: string, description?: string) {
        return { payload: { id: nanoid(), columnId, title, description } as Task }
      },
    },

    removeTask(state, action: PayloadAction<string>) {
      tasksAdapter.removeOne(state, action.payload);
    },
  },
})

export const { setTasks, addTask, removeTask } = taskSlice.actions
export default taskSlice.reducer

export const taskSelectors = tasksAdapter.getSelectors<RootState>(state => state.task)
export const selectTasks = (state: RootState) => taskSelectors.selectAll(state)
export const selectTaskById = (state: RootState, id: string) => taskSelectors.selectById(state, id)