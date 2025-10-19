import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => (
  <button
    onClick={toggleTheme}
    className="p-2 mr-3 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition duration-150"
    aria-label="Toggle dark mode"
    title="Toggle dark mode"
  >
    {theme === "dark" ? (
      <Sun className="w-5 h-5 text-yellow-400" />
    ) : (
      <Moon className="w-5 h-5 text-blue-600" />
    )}
  </button>
);

export default ThemeToggle;
