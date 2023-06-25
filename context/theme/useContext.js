'use client';
import ThemeContext from './context';
import { useTheme } from 'next-themes';
import { useContext } from 'react';

const useThemeContext = () => {
  const { theme, setTheme } = useTheme();
  const {
    darkMode,
    setDarkMode,
    collapse,
    setCollapse,
    sidebarOpen,
    setSidebarOpen,
    notification,
    setNotification,
    search,
    setSearch,
  } = useContext(ThemeContext);
  return {
    theme,
    collapse,
    darkMode,
    sidebarOpen,
    notification,
    setTheme,
    setCollapse,
    setDarkMode,
    setSidebarOpen,
    setNotification,
    search,
    setSearch,
  };
};

export default useThemeContext;
