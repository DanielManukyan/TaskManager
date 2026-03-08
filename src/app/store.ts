import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../features/board/boardSlice'
import columnReducer from '../features/column/columnSlice'
import taskReducer from '../features/task/taskSlice'

export const store = configureStore({
  reducer: {
    board: boardReducer,
    column: columnReducer,
    task: taskReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch