"use client";
import { useState, useEffect } from "react";
import ThemeContext from "./context";
import { ThemeProvider } from "next-themes";
import SimpleNotification from "@/components/partials/notifications/SimpleNotification";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

const ThemeContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    type: "",
    show: false,
  });
  const [collapse, setCollapse] = useState(false);
  const { data: session } = useSession();
  // TODO: Initialize and save collapse state from local storage

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 1280) {
        setSidebarOpen(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!session) return;

    const socket = new WebSocket(
      `ws://localhost:3000?userID=${session.user.id}`
    );

    socket.onopen = () => {
      socket.send("hello");
    };

    socket.onmessage = (event) => {
      console.log("event", event);
      let message = JSON.parse(event.data);
      setNotification({
        title: message.type,
        message: message.message,
        type: message.type,
        show: true,
      });
    };

    return () => {
      socket.close();
    };
  }, [session]);

  // useEffect(() => {
  //   const isWindow = typeof window !== "undefined";
  //   const ws = isWindow && new WebSocket("ws://localhost:8080");

  //   ws.onopen = () => {
  //     console.log("connected to server");
  //   };

  //   ws.onmessage = (event) => {
  //     console.log(`Received: ${event.data}`);
  //   };

  //   ws.onerror = (error) => {
  //     console.log(`WebSocket error: ${error}`);
  //   };

  //   ws.onclose = () => {
  //     console.log("ws is closed");
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  return (
    <ThemeContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        darkMode,
        setDarkMode,
        notification,
        setNotification,
        collapse,
        setCollapse,
      }}
    >
      <SimpleNotification
        notification={notification}
        setNotification={setNotification}
      />

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
