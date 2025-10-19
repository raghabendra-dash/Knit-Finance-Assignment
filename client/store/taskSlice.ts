import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus, DeliveryState } from '../types/task';
import { taskApi } from '../lib/api';

interface TasksState {
  tasks: Task[];
  filteredStatus: TaskStatus | 'all';
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  filteredStatus: 'all',
  loading: false,
  error: null,
};

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const tasks = await taskApi.getAllTasks();
    return tasks;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Omit<Task, 'id'>) => {
    const newTask = await taskApi.createTask(task);
    return newTask;
  }
);

export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, task }: { id: string; task: Partial<Task> }) => {
    const updatedTask = await taskApi.updateTask(id, task);
    return updatedTask;
  }
);

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string) => {
    await taskApi.deleteTask(id);
    return id;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilteredStatus(state, action: PayloadAction<TaskStatus | 'all'>) {
      state.filteredStatus = action.payload;
    },
    retryTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.delivery = {
          state: 'RETRY' as DeliveryState,
          attempts: task.delivery ? task.delivery.attempts + 1 : 1,
        };
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch tasks
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch tasks';
    });

    // Create task
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to create task';
    });

    // Update task
    builder.addCase(updateTaskAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTaskAsync.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    });
    builder.addCase(updateTaskAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update task';
    });

    // Delete task
    builder.addCase(deleteTaskAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    });
    builder.addCase(deleteTaskAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to delete task';
    });
  },
});

export const { setFilteredStatus, retryTask } = taskSlice.actions;
export default taskSlice.reducer;