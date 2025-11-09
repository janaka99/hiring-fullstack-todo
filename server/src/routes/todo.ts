import { Router } from "express";

import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  markDone,
} from "../controllers/todo-controller.js";

const todoRouter = Router();

// create new todo
todoRouter.post("/", createTodo);

// get all todos
todoRouter.get("/", getTodos);

// update todo
todoRouter.put("/:id", updateTodo);

// get todo by id
todoRouter.get("/:id", getTodoById);

// delete todo by id
todoRouter.delete("/:id", deleteTodo);

// Mark as done
todoRouter.patch("/:id/done", markDone);

export default todoRouter;
