import { useState, type FormEvent } from "react";
import { AlertTriangle } from "lucide-react";
import { STATUSES, type Task } from "../../types/task";

interface TaskFormProps {
  task: Task | null;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

export const TaskForm = ({ task, onSave, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [status, setStatus] = useState(task ? task.status : STATUSES[0]);
  const [error, setError] = useState("");

  const isEditMode = !!task;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Title and Description are required.");
      return;
    }

    const newTask: Task = {
      id: isEditMode ? task!.id : `t${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      status,
    };

    onSave(newTask);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b pb-2">
        {isEditMode ? "Edit Task" : "Create New Task"}
      </h2>
      {error && (
        <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" /> {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Task title"
            maxLength={100}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:text-gray-100 h-24"
            placeholder="Detailed description of the task"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:text-gray-100"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition duration-150"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg shadow-md hover:bg-violet-700 transition duration-150"
          >
            {isEditMode ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
