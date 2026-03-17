import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBoard as createBoardApi, deleteBoard as deleteBoardApi, getBoards } from '../db/dbTable'
import { addColumn, deleteColumn } from '../column/columnSlice'
import { deleteTask } from '../task/taskSlice'
import type { RootState } from '../../app/store'

export interface Board {
  id: string
  title: string
  bgColor: string
  visibility: 'private' | 'workspace' | 'public'
}

interface BoardState {
  boards: Board[]
}

const initialState: BoardState = {
  boards: [],
}

export const fetchBoards = createAsyncThunk('boards/fetch', async () => {
  return await getBoards()
})

export const setBoards = createAsyncThunk(
  'boards/set',
  async (boards: Board[]) => {
    return boards
  }
)

export const addBoard = createAsyncThunk(
  'boards/add',
  async (board: Omit<Board, 'id'>) => {
    return await createBoardApi(board)
  }
)

export const createBoardWithColumns = createAsyncThunk(
  'boards/createWithColumns',
  async (
    {
      title,
      bgColor,
      visibility,
    }: { title: string; bgColor: string; visibility: Board['visibility'] },
    { dispatch }
  ) => {
    const board = await createBoardApi({ title, bgColor, visibility })

    await dispatch(addColumn({ title: 'Todo', boardId: board.id }))
    await dispatch(addColumn({ title: 'Doing', boardId: board.id }))
    await dispatch(addColumn({ title: 'Done', boardId: board.id }))

    return board
  }
)

export const deleteBoard = createAsyncThunk(
  'boards/delete',
  async (boardId: string, { dispatch, getState }) => {
    const state = getState() as RootState

    const columns = state.column.columns.filter(c => c.boardId === boardId)
    const columnIds = new Set(columns.map(c => c.id))
    const tasks = state.task.tasks.filter(t => columnIds.has(t.columnId))

    for (const t of tasks) {
      await dispatch(deleteTask(t.id))
    }

    for (const c of columns) {
      await dispatch(deleteColumn(c.id))
    }

    await deleteBoardApi(boardId)
    return boardId
  }
)


const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.boards = action.payload
    })

    builder.addCase(addBoard.fulfilled, (state, action) => {
      state.boards.push(action.payload)
    })

    builder.addCase(createBoardWithColumns.fulfilled, (state, action) => {
      state.boards.push(action.payload)
    })

    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      state.boards = state.boards.filter(b => b.id !== action.payload)
    })
  },
})

export default boardSlice.reducer