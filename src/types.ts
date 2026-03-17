export interface Board {
  id: number;
  title: string;
}

export interface Column {
  id: number;
  title: string;
  boardId: number;
}

export interface Task {
  id: number;
  title: string;
  columnId: number;
}