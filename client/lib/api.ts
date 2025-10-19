import axios from 'axios';
import { Task } from '../types/task';

const API_BASE_URL = 'http://localhost:4000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get('/todo');
    return response.data.todos;
  },

  // Create a new task
  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await api.post('/todo', task);
    return response.data.todo;
  },

  // Update a task
  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/todo/${id}`, task);
    return response.data.todo;
  },

  // Delete a task
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/todo/${id}`);
  },
};
