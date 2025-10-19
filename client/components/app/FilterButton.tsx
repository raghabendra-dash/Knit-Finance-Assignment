import { ReactNode } from "react";
import { FILTER_TYPES } from "../../lib/constants";

interface FilterButtonProps {
  filterKey: (typeof FILTER_TYPES)[keyof typeof FILTER_TYPES];
  icon: ReactNode;
  label: string;
  count: number;
  currentFilter: (typeof FILTER_TYPES)[keyof typeof FILTER_TYPES];
  onClick: (fk: (typeof FILTER_TYPES)[keyof typeof FILTER_TYPES]) => void;
}

export const FilterButton = ({ filterKey, icon, label, count, currentFilter, onClick }: FilterButtonProps) => {
  const isActive = currentFilter === filterKey;
  return (
    <button
      onClick={() => onClick(filterKey)}
      className={`w-full flex justify-between items-center p-3 rounded-xl transition duration-150 ${
        isActive
          ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-400/40 dark:text-cyan-400 font-semibold"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      <span className="flex items-center text-sm">
        {icon}
        <span className="ml-3">{label}</span>
      </span>
      <span
        className={`px-2 py-0.5 text-xs rounded-full ${
          isActive ? "bg-cyan-500 text-white" : "bg-gray-400 text-white/95 dark:bg-gray-500 dark:text-white"
        }`}
      >
        {count}
      </span>
    </button>
  );
};

export default FilterButton;
