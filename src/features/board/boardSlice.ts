import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import { addColumn, type Column } from '../column/columnSlice'
import type { AppDispatch } from '../../app/store'

export type BoardVisibility = 'public' | 'private' | 'shared'

export interface Board {
  BoardId: string
  title: string
  bgColor: string
  visibility: BoardVisibility
  columnIds: string[]
  columns: Column[]
}

interface BoardState {
  boards: Board[]
  selectedBoardId: string | null
}

const initialState: BoardState = {
  boards: [],
  selectedBoardId: null,
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards(state, action: PayloadAction<Board[]>) {
      state.boards = action.payload
    },
    addBoard(state, action: PayloadAction<Board>) {
      state.boards.push(action.payload)
    },
    removeBoard(state, action: PayloadAction<string>) {
      state.boards = state.boards.filter(b => b.BoardId !== action.payload)
    },
    selectBoard(state, action: PayloadAction<string | null>) {
      state.selectedBoardId = action.payload
    },
  },
})

export const createBoardWithColumns = (title: string, bgColor: string = "#ffffff", visibility: BoardVisibility = "public") => {
  return (dispatch: AppDispatch) => {

    const boardId = nanoid()

    const newBoard: Board = {
      BoardId: boardId,
      title,
      bgColor,
      visibility,
      columnIds: [],
      columns: []
    }

    dispatch(addBoard(newBoard))

    const defaultColumns = ["To Do", "Done"]

    defaultColumns.forEach(colTitle => {
      dispatch(addColumn(colTitle, boardId))
    })
  }
}

export const { setBoards, addBoard, removeBoard, selectBoard } = boardSlice.actions
export default boardSlice.reducer