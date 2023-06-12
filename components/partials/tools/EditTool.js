"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EditTool = ({ data, columns, updateData }) => {
  const [tool, setTool] = useState(data);
  const router = useRouter();

  const handleChange = (e) => {
    setTool({ ...tool, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(tool);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6 w-full ">
          {/* input text fields and text areas in 2 column from md to lg, one column in sm */}
          <div className="flex flex-wrap -mx-3 mb-6">
            {columns?.map((column, key) => {
              return (
                <div key={key} className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    htmlFor={key}
                    className="block uppercase tracking-wide text-primary-light dark:text-primary-dark text-xs font-bold mb-2"
                  >
                    {column.name}
                  </label>
                  {column.type === "CharField" ? (
                    <input
                      type="text"
                      name={column.name}
                      id={column.name}
                      value={tool[column.name]}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark border border-primary-light dark:border-primary-dark rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-secondary-light"
                    />
                  ) : (
                    <textarea
                      onChange={handleChange}
                      value={tool[column.name]}
                      name={column.name}
                      className="appearance-none block w-full bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark border border-primary-light dark:border-primary-dark rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-secondary-light"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-primary-light bg-success-light border border-transparent rounded-md shadow-sm hover:bg-warning-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:bg-success-dark dark:text-primary-dark dark:hover:bg-success-dark dark:hover:text-primary-light"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditTool;
