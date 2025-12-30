import { Sun, Moon } from 'lucide-react';

import { useTheme } from '../../context/useTheme';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        p-4 rounded-2xl
        bg-white/40 dark:bg-slate-900/40
        backdrop-blur-xl
        border border-slate-200 dark:border-white/10
        text-slate-900 dark:text-white
        hover:bg-white/60 dark:hover:bg-slate-800/60
        transition-all duration-300
        shadow-xl
        group
        focus:outline-none focus:ring-2
        focus:ring-slate-400 dark:focus:ring-slate-600
      "
    >
      {isDarkMode ? (
        <Sun
          size={24}
          className="
            transition-transform duration-300
            group-hover:rotate-45
          "
        />
      ) : (
        <Moon
          size={24}
          className="
            transition-transform duration-300
            group-hover:-rotate-12
          "
        />
      )}
    </button>
  );
};

export default ThemeToggle;
