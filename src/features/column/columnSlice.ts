import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getColumns, createColumn as createColumnApi } from '../db/dbTable'

export interface Column {
  id: number
  title: string
  boardId: number
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
  async (column: Omit<Column, 'id'>) => {
    const newColumn = { ...column, id: Date.now() }
    await createColumnApi(newColumn)
    return newColumn
  }
)

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
  },
})

const selectColumns = (state: { columns: ColumnState }) => state.columns.columns

export const selectColumnById = (state: { columns: ColumnState }, id: number) =>
  selectColumns(state).find(col => col.id === id)

export const insertTaskIntoColumn = createAsyncThunk(
  'columns/insertTask',
  async ({ columnId, taskId }: { columnId: number; taskId: number }) => {
    return { columnId, taskId }
  }
)
export default columnSlice.reducer