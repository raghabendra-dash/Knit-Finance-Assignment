import { useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, CheckSquare, Plus, AlignJustify, ClipboardList, Play, ClipboardClock, Sliders } from "lucide-react";
import type { Task, TaskStatus } from "../types/task";
import { FILTER_TYPES, filterMap } from "../lib/constants";
import TaskForm from "../components/app/TaskForm";
import TaskCard from "../components/app/TaskCard";
import ThemeToggle from "../components/app/ThemeToggle";
import FilterButton from "../components/app/FilterButton";
import { RootState, AppDispatch } from '../store';
import { createTask, updateTaskAsync, deleteTaskAsync } from '../store/taskSlice';

interface DashboardProps {
  onLogout: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Dashboard = ({ onLogout, theme, toggleTheme }: DashboardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentFilter, setCurrentFilter] = useState<(typeof FILTER_TYPES)[keyof typeof FILTER_TYPES]>(
    FILTER_TYPES.ALL,
  );

  const getTaskCount = useCallback(
    (filterKey: (typeof FILTER_TYPES)[keyof typeof FILTER_TYPES]) => {
      const statuses = filterMap[filterKey];
      return tasks.filter((t) => statuses.includes(t.status)).length;
    },
    [tasks],
  );

  const filteredTasks = useMemo(() => {
    const statusesToFilter = filterMap[currentFilter];
    const filtered = tasks.filter((t) => statusesToFilter.includes(t.status));
    const statusOrder: Record<TaskStatus, number> = { "To Do": 1, "In Progress": 2, "Done": 3, "Completed": 4 };
    return filtered.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  }, [tasks, currentFilter]);

  const handleSaveTask = useCallback(
    (task: Task) => {
      if (task.id) {
        // Update existing task
        dispatch(updateTaskAsync({ id: task.id, task }));
      } else {
        // Create new task
        dispatch(createTask(task));
      }
      setEditingTask(null);
      setIsModalOpen(false);
    },
    [dispatch],
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      if (window.confirm("Are you sure you want to delete this task?")) {
        dispatch(deleteTaskAsync(taskId));
      }
    },
    [dispatch],
  );

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleCreateTask = useCallback(() => {
    setEditingTask(null);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditingTask(null);
    setIsModalOpen(false);
  }, []);

  const Sidebar = (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <h2 className="text-lg font-bold text-gray-600 dark:text-gray-200">Filters</h2>
        <Sliders size={18} aria-hidden="true" className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer" />
      </div>
      <div className="space-y-1">
        <FilterButton
          filterKey={FILTER_TYPES.ALL}
          icon={<AlignJustify className="w-5 h-5" />}
          label={FILTER_TYPES.ALL}
          count={getTaskCount(FILTER_TYPES.ALL)}
          currentFilter={currentFilter}
          onClick={setCurrentFilter}
        />
        <FilterButton
          filterKey={FILTER_TYPES.PENDING}
          icon={<ClipboardClock className="w-5 h-5" />}
          label={FILTER_TYPES.PENDING}
          count={getTaskCount(FILTER_TYPES.PENDING)}
          currentFilter={currentFilter}
          onClick={setCurrentFilter}
        />
        <FilterButton
          filterKey={FILTER_TYPES.IN_PROGRESS}
          icon={<Play className="w-5 h-5" />}
          label={FILTER_TYPES.IN_PROGRESS}
          count={getTaskCount(FILTER_TYPES.IN_PROGRESS)}
          currentFilter={currentFilter}
          onClick={setCurrentFilter}
        />
        <FilterButton
          filterKey={FILTER_TYPES.COMPLETED}
          icon={<CheckSquare className="w-5 h-5" />}
          label={FILTER_TYPES.COMPLETED}
          count={getTaskCount(FILTER_TYPES.COMPLETED)}
          currentFilter={currentFilter}
          onClick={setCurrentFilter}
        />
      </div>
    </div>
  );

  const EmptyState = (
    <div className="flex flex-col items-center justify-center p-12 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 mt-6">
      <CheckSquare className="w-16 h-16 text-violet-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">No Tasks Found</h2>
      {currentFilter === FILTER_TYPES.ALL ? (
        <>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Click the New Task button above to add your first task.</p>
          <button
            onClick={handleCreateTask}
            className="mt-6 px-4 py-3 text-sm font-medium text-white bg-violet-600 rounded-full shadow-lg hover:bg-violet-700 transition duration-150 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" /> New Task
          </button>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          No tasks match the {currentFilter} filter. Try selecting All Tasks in the sidebar.
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="bg-cyan-50/35 dark:bg-cyan-400/40 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-blue-200/80 dark:border-blue-700/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <ClipboardList size={30} strokeWidth={2.5} aria-hidden="true" className="mr-2 neon-purple" /> Task Manager
          </h1>
          <div className="flex space-x-2">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={onLogout}
              className="p-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-400 transition duration-150"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1 mb-6 lg:mb-0">{Sidebar}</div>

          <div className="lg:col-span-3">
            {tasks.length > 0 && (
              <div className="flex justify-end items-center mb-6">
                <button
                  onClick={handleCreateTask}
                  className="px-6 py-3 text-sm font-medium text-white bg-violet-600 rounded-lg shadow-md hover:bg-violet-700 transition duration-150 flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" /> New Task
                </button>
              </div>
            )}

            {filteredTasks.length === 0 ? (
              EmptyState
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="relative w-full max-w-lg">
            <TaskForm task={editingTask} onSave={handleSaveTask} onCancel={handleCloseModal} />
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
