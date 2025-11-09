export interface ITodo {
  _id: string;
  title: string;
  description?: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ITodoState {
  todos: ITodo[];
  isLoading: boolean;
  addTodo: () => void;
  deleteTodo: () => void;
  updateTodo: () => void;
}

interface ITodoAction {
  type: string;
  payload: any;
}
