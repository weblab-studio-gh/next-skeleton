import React from "react";

export default function NarrowPageContainer({ children }) {
  return (
    <div className="mx-auto h-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[100vh] bg-primary-light dark:bg-secondary-dark">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-3xl">{children}</div>
    </div>
  );
}
