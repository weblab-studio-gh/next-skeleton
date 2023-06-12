"use client";
export default function TableToolbar({
  setIsOpen,
  isOpen = false,
  title,
  subTitle,
}) {
  return (
    <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8 bg-primary-light dark:bg-primary-dark py-8 ">
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold text-primary-light dark:text-primary-dark">
          {title}
        </h1>
        <p className="mt-2 text-sm text-primary-light dark:text-primary-dark">
          {subTitle}
        </p>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          {isOpen ? "Cancel" : "Add"}
        </button>
      </div>
    </div>
  );
}
