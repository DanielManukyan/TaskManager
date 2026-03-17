import { createEntityAdapter, createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface Task {
  id: string;
  columnId: string;
  title: string;
  description?: string;
}

const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: false
});

const initialState = tasksAdapter.getInitialState();

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {

    setTasks: tasksAdapter.setAll,

    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        tasksAdapter.addOne(state, action.payload);
      },
      prepare(columnId: string, title: string) {
        return {
          payload: {
            id: nanoid(),
            columnId,
            title
          } as Task
        };
      }
    },

    removeTask(state, action: PayloadAction<string>) {
      tasksAdapter.removeOne(state, action.payload);
    },

    moveTask(
      state,
      action: PayloadAction<{
        taskId: string;
        toColumnId: string;
      }>
    ) {
      const { taskId, toColumnId } = action.payload;
      const task = state.entities[taskId];
      if (task) {
        task.columnId = toColumnId;
      }
    }

  }
});

export const {
  setTasks,
  addTask,
  removeTask,
  moveTask
} = taskSlice.actions;

export default taskSlice.reducer;

export const taskSelectors = tasksAdapter.getSelectors<RootState>(
  state => state.task
);

export const selectTasks = (state: RootState) =>
  taskSelectors.selectAll(state);