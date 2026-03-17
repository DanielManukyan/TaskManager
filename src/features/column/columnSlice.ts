import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createColumn as createColumnApi, deleteColumn as deleteColumnApi, getColumns, updateColumn as updateColumnApi } from '../db/dbTable'
import type { RootState } from '../../app/store'

export interface Column {
  id: string
  title: string
  boardId: string
  order: number
}

interface ColumnState {
  columns: Column[]
}

const initialState: ColumnState = {
  columns: [],
}

export const fetchColumns = createAsyncThunk('columns/fetch', async () => {
  return await getColumns()
})

export const addColumn = createAsyncThunk(
  'columns/add',
  async (
    { title, boardId }: { title: string; boardId: string },
    { getState }
  ) => {
    const state = getState() as RootState
    const maxOrder = state.column.columns
      .filter(c => c.boardId === boardId)
      .reduce((max, c) => Math.max(max, c.order ?? 0), 0)

    return await createColumnApi({ title, boardId, order: maxOrder + 1 })
  }
)

export const updateColumn = createAsyncThunk(
  'columns/update',
  async ({ id, patch }: { id: string; patch: Partial<Omit<Column, 'id'>> }) => {
    return await updateColumnApi(id, patch)
  }
)

export const deleteColumn = createAsyncThunk('columns/delete', async (id: string) => {
  await deleteColumnApi(id)
  return id
})

const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchColumns.fulfilled, (state, action) => {
      state.columns = action.payload
    })

    builder.addCase(addColumn.fulfilled, (state, action) => {
      state.columns.push(action.payload)
    })

    builder.addCase(updateColumn.fulfilled, (state, action) => {
      const idx = state.columns.findIndex(c => c.id === action.payload.id)
      if (idx !== -1) state.columns[idx] = action.payload
    })

    builder.addCase(deleteColumn.fulfilled, (state, action) => {
      state.columns = state.columns.filter(c => c.id !== action.payload)
    })
  },
})

export const selectColumns = (state: RootState) => state.column.columns

export const selectColumnById = (state: RootState, id: string) =>
  selectColumns(state).find(col => col.id === id)

export default columnSlice.reducer