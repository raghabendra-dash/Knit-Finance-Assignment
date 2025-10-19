import { Edit, Trash2 } from "lucide-react";
import type { Task } from "../../types/task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const getStatusClasses = (status: Task["status"]) => {
    switch (status) {
      case "To Do":
        return "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "In Progress":
        return "bg-yellow-300 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-200";
      case "Done":
      case "Completed":
        return "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-300";
      default:
        return "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col justify-between transition duration-300 hover:shadow-xl">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{task.title}</h3>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(task.status)}`}>
            {task.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{task.description}</p>
      </div>
      <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-cyan-600 hover:bg-cyan-100 dark:hover:bg-gray-700 rounded-full transition"
          aria-label={`Edit task ${task.title}`}
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-gray-700 rounded-full transition"
          aria-label={`Delete task ${task.title}`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
