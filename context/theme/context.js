'use client';
import { createContext } from 'react';

const ThemeContext = createContext({
  sidebarOpen: false,
  setSidebarOpen: () => {},
  darkMode: false,
  setDarkMode: () => {},
  notification: {
    title: '',
    message: '',
    type: '',
    show: false,
  },
  setNotification: () => {},
  collapse: false,
  setCollapse: () => {},
  search: '',
  setSearch: () => {},
});

export default ThemeContext;
