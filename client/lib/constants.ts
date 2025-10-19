import type { TaskStatus } from "../types/task";

export const TASK_STORAGE_KEY = "tasks";
export const AUTH_STORAGE_KEY = "authToken";

export const MOCK_USER = { email: "test@example.com", password: "test123" } as const;
export const MOCK_AUTH_TOKEN = "fake-jwt-token-12345";

export const FILTER_TYPES = {
  ALL: "All Tasks",
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
} as const;

export type FilterKey = keyof typeof FILTER_TYPES;

export const filterMap: Record<(typeof FILTER_TYPES)[FilterKey], TaskStatus[]> = {
  [FILTER_TYPES.ALL]: ["To Do", "In Progress", "Done"],
  [FILTER_TYPES.PENDING]: ["To Do", "In Progress"],
  [FILTER_TYPES.IN_PROGRESS]: ["In Progress"],
  [FILTER_TYPES.COMPLETED]: ["Done"],
};
