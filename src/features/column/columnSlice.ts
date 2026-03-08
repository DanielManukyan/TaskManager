import { createEntityAdapter, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface Column {
  id: string;
  boardId: string;
  title: string;
  taskIds: string[];
}

interface TaskMovePayload {
  fromColumnId: string;
  toColumnId: string;
  taskId: string;
  afterTaskId?: string;
}

interface TaskReorderPayload {
  columnId: string;
  taskId: string;
  afterTaskId?: string;
}

const columnsAdapter = createEntityAdapter<Column>();

const columnSlice = createSlice({
  name: "column",
  initialState: columnsAdapter.getInitialState(),
  reducers: {
    addColumn: {
      reducer(state, action: PayloadAction<Column>) {
        columnsAdapter.addOne(state, action.payload);
      },
      prepare(title: string, boardId: string) {
        return { payload: { id: crypto.randomUUID(), title, boardId, taskIds: [] } };
      },
    },
    insertTaskIntoColumn(state, action: PayloadAction<{ columnId: string; taskId: string }>) {
      const col = state.entities[action.payload.columnId];
      if (!col) return;
      col.taskIds.push(action.payload.taskId);
    },
    reorderTasks(state, action: PayloadAction<TaskReorderPayload>) {
      const { columnId, taskId, afterTaskId } = action.payload;
      const column = state.entities[columnId];
      if (!column) return;

      const oldIndex = column.taskIds.indexOf(taskId);
      if (oldIndex === -1) return;

      column.taskIds.splice(oldIndex, 1);
      if (afterTaskId) {
        const newIndex = column.taskIds.indexOf(afterTaskId) + 1;
        column.taskIds.splice(newIndex, 0, taskId);
      } else {
        column.taskIds.unshift(taskId);
      }
    },
    moveTask(state, action: PayloadAction<TaskMovePayload>) {
      const { fromColumnId, toColumnId, taskId, afterTaskId } = action.payload;
      const fromCol = state.entities[fromColumnId];
      const toCol = state.entities[toColumnId];
      if (!fromCol || !toCol) return;

      const index = fromCol.taskIds.indexOf(taskId);
      if (index !== -1) fromCol.taskIds.splice(index, 1);

      if (afterTaskId) {
        const newIndex = toCol.taskIds.indexOf(afterTaskId) + 1;
        toCol.taskIds.splice(newIndex, 0, taskId);
      } else {
        toCol.taskIds.push(taskId);
      }
    },
  },
});

export const { addColumn, insertTaskIntoColumn, reorderTasks, moveTask } = columnSlice.actions;
export default columnSlice.reducer;

export const columnSelectors = columnsAdapter.getSelectors<RootState>(state => state.column);
export const selectColumns = (state: RootState) => columnSelectors.selectAll(state) ?? [];
export const selectColumnById = (state: RootState, id: string) => columnSelectors.selectById(state, id);