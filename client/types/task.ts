export type TaskStatus = "To Do" | "In Progress" | "Done" | "Completed";

export type DeliveryState = "SUCCESS" | "FAILED" | "RETRY";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  delivery?: {
    state: DeliveryState;
    attempts: number;
  };
}

export const STATUSES: TaskStatus[] = ["To Do", "In Progress", "Done", "Completed"];