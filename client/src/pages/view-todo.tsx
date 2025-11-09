import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ITodo } from "@/types/todo.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CalendarDays, ChevronLeft } from "lucide-react";
import { useTodoContext } from "@/context/todo-state";
import TodoForm from "@/components/todo/todo-form";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import NotFound from "./not-found";
import Loading from "./loading";

export default function ViewTodo() {
  const { id } = useParams<{ id: string }>();
  const { getTodoById } = useTodoContext();
  const [todo, setTodo] = useState<ITodo | null>(null);
  const [todoError, setTodoError] = useState("");
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  const getTodo = async () => {
    setTodoError("");
    setTodo(null);
    if (!id) {
      setTodoError("Error");
      return;
    }
    setLoading(true);
    const res = await getTodoById(id);
    if (res.success) {
      setTodo(res.data);
    }
    setLoading(false);
  };

  function onCancel() {
    setEdit(false);
  }

  useEffect(() => {
    getTodo();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!todo || todoError) {
    return <NotFound />;
  }

  if (edit) {
    return <TodoForm cancelEdit={onCancel} todo={todo} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50  sapce-y-6 py-10">
      <div className="max-w-5xl mx-auto">
        <a
          href="/"
          className="flex cursor-pointer gap-2 items-center mb-6 font-semibold text-gray-700"
        >
          {" "}
          <ChevronLeft /> All Tasks
        </a>
        <Card className=" py-0  rounded-xl  overflow-hidden w-full auto ">
          <CardHeader
            className={`py-10 ${
              todo.done
                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                : "bg-gradient-to-r from-blue-600 to-indigo-600"
            }`}
          >
            {todo.done ? (
              <Badge className="bg-white/20">Completed</Badge>
            ) : (
              <Badge className="bg-white/20">Active</Badge>
            )}
            <h2 className="text-white text-3xl font-semibold">{todo.title}</h2>
            <p className={`text-sm/6 flex gap-2 items-center text-white`}>
              <CalendarDays className="size-4" />{" "}
              {todo.createdAt.toString().slice(0, 10)}
            </p>
          </CardHeader>
          <CardContent>
            <h3 className="text-gray-800 font-bold mb-6">Description</h3>
            {todo.description && (
              <p className="text-gray-700 mb-4">{todo.description}</p>
            )}
          </CardContent>
          <Separator />
          <CardFooter className="bg-gray-50 mb-6">
            <p className="text-sm text-gray-500 ">
              Status:{" "}
              <span
                className={
                  todo.done ? "text-green-600" : "text-red-600" + " font-bold"
                }
              >
                {todo.done ? "Completed" : "Pending"}
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
