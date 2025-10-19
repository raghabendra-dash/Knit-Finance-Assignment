import type { Task } from "../types/task.js";
export const initialTasks: Task[] = [
  { id: "t1", title: "Design Homepage", description: "Create a responsive layout for the main dashboard.", status: "In Progress" },
  { id: "t2", title: "Implement Auth Mock", description: "Set up local storage for JWT simulation.", status: "Done" },
  { id: "t3", title: "Write README.md", description: "Document project setup and mock API logic.", status: "To Do" },
  { id: "t4", title: "Review Code Structure", description: "Ensure components are modular and clean.", status: "To Do" },
  { id: "t5", title: "Run Unit Tests", description: "Test CRUD operations and filtering logic.", status: "Done" },
  { id: "t6", title: "Deploy to Staging", description: "Push the latest build to the staging environment.", status: "In Progress" },
  { id: "t7", title: "Fix Login Bug", description: "Resolve issue with user authentication.", status: "To Do" },
  { id: "t8", title: "Update Dependencies", description: "Upgrade all project dependencies to their latest versions.", status: "Done" },
];
