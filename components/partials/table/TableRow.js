"use client";

import { useState } from "react";

import CheckboxInput from "@/components/ui/CheckboxInput";
import { setData } from "@/app/dashboard/demo/components/getData";

import { useRouter } from "next/navigation";

export default function TableRow({
  children,
  selectedData,
  setSelectedData,
  newData,
  setNewData,
  item,
  isEdit,
  setIsEdit,
  editItem,
  setEditItem,
}) {
  const router = useRouter();
  const checkIfItemIsInSelectedData = () => {
    const found = selectedData.find((p) => p.id === item.id);

    if (found) {
      return true;
    } else {
      return false;
    }
  };

  const handleUpdate = (id, newData) => {
    setData(id, newData);

    router.refresh();
  };

  // check if iterable

  return (
    <tr
      className={
        "bg-primary-light dark:bg-primary-dark even:bg-secondary-light dark:even:bg-secondary-dark w-[100%]" +
        selectedData?.includes(item)
          ? "bg-primary-light dark:bg-primary-dark even:bg-secondary-light dark:even:bg-secondary-dark"
          : "bg-secondary-light dark:bg-secondary-dark even:bg-secondary-light dark:even:bg-secondary-dark"
      }
    >
      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
        {checkIfItemIsInSelectedData() && (
          <div className="absolute inset-y-0 left-0 w-0.5 bg-color-light dark:bg-color2-dark" />
        )}
        <CheckboxInput
          value={item?.id}
          checked={checkIfItemIsInSelectedData()}
          onChange={(e) => {
            setSelectedData(
              e.target.checked
                ? [...selectedData, item]
                : [
                    // remove the item from the array
                    ...selectedData.filter((p) => p.id !== item.id),
                  ]
            );
          }}
        />
      </td>
      {children}
      <td className="whitespace-nowrap py-4 px-4 text-right text-sm font-medium sm:pr-6">
        {isEdit && item.id === editItem ? (
          <button
            onClick={() => {
              handleUpdate(item.id, newData);
              setIsEdit(!isEdit);
            }}
            className="text-color-light hover:text-color-light dark:hover:text-color-dark dark:text-color2-dark"
          >
            Save<span className="sr-only">, {item?.name}</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setNewData(item);
              setEditItem(item.id);
              setIsEdit(!isEdit);
            }}
            className="text-color-light hover:text-color-light dark:hover:text-color-dark dark:text-color2-dark"
          >
            Edit<span className="sr-only">, {item?.name}</span>
          </button>
        )}
      </td>
    </tr>
  );
}
