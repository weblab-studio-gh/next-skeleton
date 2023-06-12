import CheckboxInput from "@/components/ui/CheckboxInput";
import ListField from "@/components/ui/fields/ListField";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TableBody({
  columns,
  setNewData,
  page,
  setSelectedData,
  selectedData,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState("");
  const path = usePathname();
  console.log("path", path);
  return (
    <tbody className=" bg-white">
      {page?.map((item, key) => (
        <tr
          key={key}
          className={
            "bg-primary-light dark:bg-primary-dark even:bg-secondary-light dark:even:bg-secondary-dark" +
            selectedData.includes(item)
              ? "bg-primary-light dark:bg-primary-dark even:bg-secondary-light dark:even:bg-secondary-dark"
              : "bg-secondary-light dark:bg-secondary-dark even:bg-secondary-light dark:even:bg-secondary-dark"
          }
        >
          <td className="relative w-12 px-6 sm:w-16 sm:px-8">
            {selectedData.includes(item) && (
              <div className="absolute inset-y-0 left-0 w-0.5 bg-color-light dark:bg-color2-dark" />
            )}
            <CheckboxInput
              value={item.id}
              checked={selectedData.includes(item)}
              onChange={(e) =>
                setSelectedData(
                  e.target.checked
                    ? [...selectedData, item]
                    : selectedData.filter((p) => p !== item)
                )
              }
            />
          </td>
          {columns.map((column, key) => {
            return key === 0 ? (
              <td
                key={key}
                className={classNames(
                  "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                  selectedData.includes(item)
                    ? "text-color-light dark:text-color2-dark"
                    : "text-primary-light dark:text-primary-dark"
                )}
              >
                {String(item[column.name]).split(0, 1)}
              </td>
            ) : (
              <td
                key={key}
                className="whitespace-nowrap px-3 py-4 text-sm text-primary-light dark:text-primary-dark"
              >
                {column.isList ? (
                  <ListField values={item[column.name]} />
                ) : (
                  `${String(item[column.name]).split(0, 1)}`
                )}
              </td>
            );
          })}

          <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <Link
              href={path + "/" + item.id}
              className="text-color-light hover:text-color-light dark:hover:text-color-dark dark:text-color2-dark"
            >
              Edit<span className="sr-only">, {item.name}</span>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
