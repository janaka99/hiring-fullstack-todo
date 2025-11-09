import { createContext, useContext, useEffect, useState } from "react";
import { BaseApi } from "@/utils/api";
import type { ITodo } from "@/types/todo.types";
import type { TodoSchemaType } from "@/schemas/todo-schema";
import { toast } from "sonner";

interface TodoState {
  todos: ITodo[];
  todosLoading: boolean;
  addTodo: (todo: any) => any;
  deleteTodo: (id: string) => any;
  handleToggleComplete: (id: string) => any;
  getTodoById: (id: string) => any;
  updateTodo: (todo: any, id: string) => void;
}

const TodoContext = createContext<undefined | TodoState>(undefined);

export const TodoState = (props: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todosLoading, setTodosLoading] = useState(true);

  async function addTodo(todo: TodoSchemaType) {
    const res = await BaseApi("todos", {
      method: "POST",
      body: todo,
    });
    console.log(res);
    getTodos();
    return res;
  }

  async function updateTodo(todo: TodoSchemaType, _id: string) {
    const res = await BaseApi(`todos/${_id}`, {
      method: "PUT",
      body: todo,
    });
    getTodos();
    return res;
  }

  async function deleteTodo(_id: string) {
    const res = await BaseApi(`todos/${_id}`, {
      method: "DELETE",
    });
    if (res.success) {
      toast.success("Todo successfully deleted");
    } else {
      toast.error("Failed to delete Todo");
    }
    getTodos();
    return res;
  }
  async function getTodos() {
    const res = await BaseApi("todos", {
      method: "GET",
    });
    if (res.success && res.data) {
      setTodos(res.data as ITodo[]);
    } else {
      setTodos([]);
    }
  }

  async function getTodoById(id: string) {
    const res = await BaseApi(`todos/${id}`, {
      method: "GET",
    });
    return res;
  }

  async function handleToggleComplete(_id: string) {
    const res = await BaseApi(`todos/${_id}/done`, {
      method: "PATCH",
    });
    getTodos();
    return res;
  }

  async function initialTodoLoad() {
    setTodosLoading(true);
    await getTodos();
    setTodosLoading(false);
  }

  useEffect(() => {
    initialTodoLoad();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        todosLoading,
        addTodo,
        deleteTodo,
        updateTodo,
        handleToggleComplete,
        getTodoById,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Todo context failed");
  }
  return context;
};
