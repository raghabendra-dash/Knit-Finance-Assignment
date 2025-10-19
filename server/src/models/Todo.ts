import mongoose, { Document, Schema } from 'mongoose';
import { Task } from '../types/task.js';

export interface ITodo extends Omit<Task, 'id'>, Document {}

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Completed'],
      default: 'To Do',
    },
    delivery: {
      state: {
        type: String,
        enum: ['SUCCESS', 'FAILED', 'RETRY'],
        default: 'SUCCESS',
      },
      attempts: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model<ITodo>('Todo', todoSchema);
