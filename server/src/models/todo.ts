import { Schema, model, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description?: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
  {
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
  },
  {
    timestamps: true,
  }
);

export const Todo = model<ITodo>("todo", todoSchema);
