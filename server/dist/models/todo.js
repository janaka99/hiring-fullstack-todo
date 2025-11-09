import { Schema, model, Document } from "mongoose";
const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 300,
    },
    description: {
        type: String,
    },
    done: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
export const Todo = model("todo", todoSchema);
//# sourceMappingURL=todo.js.map