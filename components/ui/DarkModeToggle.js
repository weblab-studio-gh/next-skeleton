"use client";
import useThemeContext from "@/context/theme/useContext";
const DarkModeToggle = () => {
  const { darkMode, setDarkMode, setTheme, theme } = useThemeContext();
  return (
    <div className="flex items-center justify-center mr-3 ">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          id="toogle"
          type="checkbox"
          className="sr-only peer"
          checked={darkMode}
          onChange={() => {
            setDarkMode(!darkMode);
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        />
        <div className="w-11 h-6   peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light dark:peer-focus:ring-secondary-dark rounded-full peer dark:bg-neutral-dark bg-primary-light peer-checked:after:translate-x-full peer-checked:after:border-primary-light after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-primary-lite after:border-secondary-dark after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-primary-dark peer-checked:bg-primary-light  dark:after:border-l-8"></div>
      </label>
    </div>
  );
};

export default DarkModeToggle;
