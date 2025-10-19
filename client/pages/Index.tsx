import { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import Login from "./Login";
import Dashboard from "./Dashboard";
import { AUTH_STORAGE_KEY, MOCK_AUTH_TOKEN } from "../lib/constants";
import { fetchTasks } from '../store/taskSlice';
import type { AppDispatch } from '../store';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (token === MOCK_AUTH_TOKEN) {
      setIsAuthenticated(true);
      // Fetch tasks from server when authenticated
      dispatch(fetchTasks());
    } else {
      setIsAuthenticated(false);
    }
    setAuthChecked(true);
  }, [dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
    // Fetch tasks from server on login
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="p-8 rounded-xl shadow-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-violet-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading Application...
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased min-h-screen dark:bg-gray-900">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
