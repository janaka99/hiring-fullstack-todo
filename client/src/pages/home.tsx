import StatCard from "@/components/todo/stat-card";
import TodoForm from "@/components/todo/todo-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTodoContext } from "@/context/todo-state";
import type { ITodo } from "@/types/todo.types";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Edit,
  Eye,
  Plus,
  Trash,
} from "lucide-react";
import { useState } from "react";
import Loading from "./loading";

export default function Home() {
  const { todos, todosLoading, deleteTodo, handleToggleComplete } =
    useTodoContext();
  const [editTodo, setEditTodo] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const cancelEdit = () => {
    setEditTodo(null);
    setShowAddForm(false);
  };

  if (todosLoading) {
    return <Loading />;
  }

  const getCompletedCount = (todos: ITodo[]) => {
    return todos.filter((todo) => todo.done === true).length;
  };
  return (
    <div className="py-10 min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 ">
      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Tasks</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              {getCompletedCount(todos)} of {todos.length} completed
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard
            count={todos.length}
            label="Total Tasks"
            className="text-gray-800"
          />
          <StatCard
            count={todos.length - getCompletedCount(todos)}
            label="Active"
            className="text-blue-600"
          />
          <StatCard
            count={getCompletedCount(todos)}
            label="Completed"
            className="text-green-600"
          />
        </div>
        {showAddForm ? (
          <div className="mb-6">
            <TodoForm cancelEdit={cancelEdit} />;
          </div>
        ) : (
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full mb-6  flex items-center justify-center gap-2 "
            size="lg"
            variant="custom-gradient"
          >
            <Plus className="w-5 h-5" /> Add Task
          </Button>
        )}
        <div className="space-y-3">
          {todos.map((td, i) => {
            if (editTodo && td._id === editTodo) {
              return (
                <div key={i} className="mb-6">
                  <TodoForm todo={td} cancelEdit={cancelEdit} />;
                </div>
              );
            } else {
              return (
                <Card key={i} className="bg-white  p-6 rounded-xl space-y-2 ">
                  <div className="w-full flex  gap-2">
                    <div className="">
                      <button
                        onClick={() => handleToggleComplete(td._id)}
                        className={`border border-border w-7 aspect-square rounded-full flex justify-center items-center ${
                          td.done && "bg-green-400"
                        }`}
                      >
                        {td.done && <Check className="text-white size-6" />}
                      </button>
                    </div>

                    <div className="grow space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center justify-end w-full">
                          <button
                            className="cursor-pointer opacity-80 text-orange-500 hover:text-orange-600"
                            onClick={() => setEditTodo(td._id)}
                          >
                            <Edit />
                          </button>
                          <button
                            className="cursor-pointer opacity-80 text-red-400 hover:text-red-500"
                            onClick={() => deleteTodo(td._id)}
                          >
                            <Trash />
                          </button>
                          <a
                            href={`/${td._id}`}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <Eye />
                          </a>
                        </div>
                      </div>
                      <div className="">
                        <h3
                          className={`font-semibold text-gray-800 ${
                            td.done ? "line-through" : ""
                          }`}
                        >
                          {td.title}
                        </h3>
                        <p
                          className={`text-sm/6  ${
                            td.done ? "text-gray-400" : "text-gray-700"
                          }`}
                        >
                          {td.description}
                        </p>
                        <p
                          className={`text-sm/6 flex gap-2 items-center ${
                            td.done ? "text-gray-400" : "text-gray-700"
                          }`}
                        >
                          <CalendarDays className="size-4" />{" "}
                          {td.createdAt.toString().slice(0, 10)}
                        </p>
                      </div>
                    </div>
                  </div>
                  {!td.done && (
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white  flex items-center  gap-2 w-full"
                      onClick={() => handleToggleComplete(td._id)}
                    >
                      <Check />
                      Mark as Done
                    </Button>
                  )}
                </Card>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
