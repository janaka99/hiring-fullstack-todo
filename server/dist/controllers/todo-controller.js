import { Todo } from "../models/todo.js";
import { TodoSchema } from "../schema/todo.js";
/**
 * Add new todo
 */
export const createTodo = async (req, res) => {
    try {
        const unSafeData = req.body;
        // validate form
        const { success, data } = TodoSchema.safeParse(unSafeData);
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
            });
            return;
        }
        // add new todo
        const todo = new Todo(data);
        await todo.save();
        return res.status(201).json({
            success: true,
            message: "Successfully created new Todo",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to create new Todo",
        });
    }
};
/**
 * get all todos
 */
export const getTodos = async (req, res) => {
    try {
        // get all todos
        const todos = await Todo.find();
        return res.status(201).json({
            success: true,
            message: "Successfully fetched all todos",
            data: todos,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to fetch todos!",
            data: null,
        });
    }
};
/**
 * get todo by id
 */
export const getTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Todo not found!",
                data: null,
            });
        }
        // get todo by id
        const todo = await Todo.findById(id);
        return res.status(201).json({
            success: true,
            message: "Todo found",
            data: todo,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Todo not found!",
            data: null,
        });
    }
};
/**
 * update existing todo
 */
export const updateTodo = async (req, res) => {
    try {
        const unSafeData = req.body;
        const id = req.params.id;
        // validate form
        const { success, data } = TodoSchema.safeParse(unSafeData);
        if (!success || !id) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
            });
        }
        // add new todo
        const todo = await Todo.findByIdAndUpdate(id, data);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }
        return res.status(201).json({
            success: true,
            message: "Successfully updated the Todo",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to update the Todo",
        });
    }
};
/**
 * delete todo by id
 */
export const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Todo not found!",
                data: null,
            });
        }
        // get todo by id
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Failed to delete Todo",
            });
        }
        return res.status(201).json({
            success: true,
            message: "Todo  Deleted Successfully",
            data: todo,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Todo not found!",
            data: null,
        });
    }
};
// toggle todo
export const markDone = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(404).json({
            success: false,
            message: "Todo not found!",
            data: null,
        });
    }
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found!",
                data: null,
            });
        }
        // add new todo
        const updated = await Todo.findByIdAndUpdate(id, {
            done: !todo.done,
        });
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }
        return res.status(201).json({
            success: true,
            message: "Todo marked as complete",
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: "Something went worong",
        });
    }
};
//# sourceMappingURL=todo-controller.js.map