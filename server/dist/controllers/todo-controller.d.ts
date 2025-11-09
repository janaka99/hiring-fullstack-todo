import type { Request, Response } from "express";
/**
 * Add new todo
 */
export declare const createTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * get all todos
 */
export declare const getTodos: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * get todo by id
 */
export declare const getTodoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * update existing todo
 */
export declare const updateTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * delete todo by id
 */
export declare const deleteTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const markDone: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=todo-controller.d.ts.map