import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBoard as createBoardApi, getBoards } from '../db/dbTable'
import { addColumn } from '../column/columnSlice'

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
  },
})

export default boardSlice.reducer