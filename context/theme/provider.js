'use client';
import { useState, useEffect } from 'react';
import ThemeContext from './context';
import { ThemeProvider } from 'next-themes';
import SimpleNotification from '@/components/partials/notifications/SimpleNotification';
import { SessionProvider } from 'next-auth/react';

const ThemeContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: '',
    show: false,
  });
  const [collapse, setCollapse] = useState(false);
  // TODO: Initialize and save collapse state from local storage

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 1280) {
        setSidebarOpen(false);
      }
    }
  }, []);

  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('/service-worker.js')
  //       .then((registration) => console.log('scope is: ', registration.scope));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!session.data?.user?.id) return;

  //   const socket = new WebSocket(
  //     `wss://ccb1-87-97-7-48.ngrok-free.app?userID=${session.data?.user?.id}`
  //   );
  //   // const socket = new WebSocket(`ws://localhost:3000?userID=${session.data?.user?.id}`);

  //   socket.onopen = () => {
  //     socket.send(
  //       JSON.stringify({
  //         hello: 'world',
  //       })
  //     );
  //   };

  //   socket.onmessage = (event) => {
  //     let message = JSON.parse(event.data);

  //     if (message.type === 'add_product') {
  //       findFirst({
  //         where: {
  //           barcode: {
  //             equals: message.message,
  //           },
  //         },
  //       }).then((res) => {
  //         setGlobalTransaction(res);
  //         setNotification({
  //           title: 'Product Added',
  //           message: 'Product added to cart',
  //         });
  //       });
  //     } else {
  //       setNotification({
  //         title: message.type,
  //         message: message.message,
  //         type: message.type,
  //         show: true,
  //       });
  //     }
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, [session]);

  return (
    <ThemeContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        darkMode,
        setDarkMode,
        notification,
        setNotification,

        search,
        setSearch,
        collapse,
        setCollapse,
      }}
    >
      <SimpleNotification notification={notification} setNotification={setNotification} />

      {children}
    </ThemeContext.Provider>
  );
};
export default function ThemeProviders({ children }) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={children.props?.session}>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
