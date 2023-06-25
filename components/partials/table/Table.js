"use client";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableContainer from "./TableContainer";
import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar";
import TableRow from "./TableRow";
import TableCell from "./TableCell";
import TablePagination from "./TablePagination";
import { useState, useLayoutEffect, useRef, useEffect } from "react";

function Table({
  children,
  columns,
  selectedData,
  setSelectedData,
  items,
  isOpen,
  newData,
  setNewData,
  handleCreate,
  setIsOpen,
}) {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const checkbox = useRef();

  function toggleAll() {
    setSelectedData(checked || indeterminate ? [] : items);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedData?.length > 0 && selectedData?.length < items.length;
    setChecked(selectedData?.length === items.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedData]);
  return (
    <table className="min-w-full table-fixed bg-primary-light dark:bg-primary-dark ">
      <TableHead
        columns={columns}
        toggleAll={toggleAll}
        checked={checked}
        checkbox={checkbox}
      />
      <TableBody
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        newData={newData}
        setNewData={setNewData}
        handleCreate={handleCreate}
        columns={columns}
      >
        {children}
      </TableBody>
    </table>
  );
}

export {
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableHeader,
  TableToolbar,
  TableRow,
  TableCell,
  TablePagination,
};
