"use client";
import TextInput from "@/components/ui/inputs/TextInput";

export default function TableBody({
  children,
  isOpen,
  newData,
  setNewData,
  handleCreate,
  columns,
}) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <tbody className="bg-primary-light dark:bg-primary-dark ">
      {isOpen ? (
        <tr
          className={
            "bg-primary-light dark:bg-primary-dark even:bg-secondary-light dark:even:bg-secondary-dark"
          }
        >
          <td className="relative w-12 px-6 sm:w-16 sm:px-8"> </td>
          {columns.map((column, key) =>
            key === 0 ? (
              <td
                key={key}
                className={classNames(
                  "whitespace-nowrap py-4 pr-3 text-sm font-medium"
                )}
              ></td>
            ) : (
              <td
                key={key}
                className="whitespace-nowrap px-3 py-4 text-sm text-primary-light dark:text-primary-dark "
              >
                {column.name === "id" ||
                column.name === "createdAt" ||
                column.name === "updatedAt" ||
                column.name === "authorId" ? (
                  <TextInput
                    disabled={true}
                    value={newData[column.name]}
                    onChange={(e) => {
                      setNewData({
                        ...newData,
                        [column.name]: e.target.value,
                      });
                    }}
                  />
                ) : (
                  <TextInput
                    value={newData[column.name]}
                    onChange={(e) => {
                      setNewData({
                        ...newData,
                        [column.name]: e.target.value,
                      });
                    }}
                  />
                )}
              </td>
            )
          )}

          <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <button
              onClick={handleCreate}
              className="text-color-light hover:text-color-light dark:hover:text-color-dark dark:text-color2-dark"
            >
              save<span className="sr-only">, </span>
            </button>
          </td>
        </tr>
      ) : null}
      {children}
    </tbody>
  );
}
