import React from "react";

export default function MainPageLayout({ children }) {
  return (
    <main className=" rounded-lg px-4 py-5 sm:p-6 bg-primary-light dark:bg-primary-dark shadow">
      {children}
    </main>
  );
}
