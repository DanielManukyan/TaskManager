import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getBoards, createBoard as createBoardApi } from '../db/dbTable'

export interface Board {
  id: number
  title: string
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
    const newBoard = { ...board, id: Date.now() }
    await createBoardApi(newBoard)
    return newBoard
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
  },
})

export default boardSlice.reducer