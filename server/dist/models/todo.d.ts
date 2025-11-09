import { Document } from "mongoose";
export interface ITodo extends Document {
    title: string;
    description?: string;
    done: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Todo: import("mongoose").Model<ITodo, {}, {}, {}, Document<unknown, {}, ITodo, {}, {}> & ITodo & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=todo.d.ts.map