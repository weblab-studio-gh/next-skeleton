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
    globalTransaction,
    setGlobalTransaction,
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
    globalTransaction,
    setGlobalTransaction,
  };
};

export default useThemeContext;
