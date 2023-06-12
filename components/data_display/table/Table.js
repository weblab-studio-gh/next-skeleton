"use client";
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import Pagination from "./Pagination";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";

export default function Table({
  data,
  columns,
  deleteData,
  bulkDeleteData,
  content,
}) {
  const [indeterminate, setIndeterminate] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const checkbox = useRef();

  const [page, setPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [paginated, setPaginated] = useState([]);
  const [filtered, setFiltered] = useState(data);
  // set filtered state to query data if is loaded

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Newest");

  const path = usePathname();

  // one page has max 25 rows
  const initPage = () => {
    const pages = Math.ceil(filtered.length / 15);
    setTotalPages(pages);
    // prepare the data into an array where each element is an array containing 25 elements
    const paginated = [];
    for (let i = 0; i < pages; i++) {
      paginated.push(filtered.slice(i * 15, (i + 1) * 15));
    }
    setPaginated(paginated);
    setPage(paginated[0]);
  };
  useEffect(() => {
    console.log("filtered", filtered);
    initPage();
  }, [filtered]);

  useEffect(() => {
    const searchData = data.filter((item) => {
      return columns.some((col) => {
        if (
          col.kind === "scalar" &&
          item[col.name] !== null &&
          col.name !== "id"
        ) {
          return item[col.name]
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase());
        }
      });
    });

    setFiltered(searchData);
  }, [search]);

  useEffect(() => {
    if (filter === "ASC") {
      const data = [
        ...filtered?.sort((a, b) => {
          const col = a.name ? "name" : "title";

          return a[col].localeCompare(b[col]);
        }),
      ];
      initPage();
      setFiltered(data);
    } else if (filter === "DSC") {
      const data = [
        ...filtered?.sort((a, b) => {
          const col = a.name ? "name" : "title";
          return b[col].localeCompare(a[col]);
        }),
      ];
      setFiltered(data);
    } else if (filter === "Newest") {
      const data = [
        ...filtered?.sort((a, b) => {
          return b.createdAt - a.createdAt;
        }),
      ];
      initPage();
      setFiltered(data);
    } else if (filter === "Oldest") {
      const data = [
        ...filtered?.sort((a, b) => {
          return a.createdAt - b.createdAt;
        }),
      ];
      initPage();
      setFiltered(data);
    } else {
      initPage();
      setFiltered(filtered);
    }
  }, [filter]);

  function toggleAll() {
    setSelectedData(checked || indeterminate ? [] : data);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedData.length > 0 && selectedData.length < data.length;
    setChecked(selectedData.length === data.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedData]);

  async function deleteSelected() {
    if (selectedData.length === 1) {
      const res = await deleteData(selectedData[0].id);
      setChecked(false);
      setIndeterminate(false);
      setSelectedData([]);
      setFiltered(res);
      // revalidatePath(path);
    }
    if (selectedData.length > 1) {
      const ids = selectedData.map((item) => item.id);
      const res = await bulkDeleteData(ids);
      setChecked(false);
      setIndeterminate(false);
      setSelectedData([]);
      setFiltered(res);
      // revalidatePath(path);
    }
  }

  async function handleCreate() {
    const res = await createData(newData);
    setNewData({});
    setFiltered(res);
    setIsOpen(false);
  }

  async function handleUpdate(id, data) {
    const res = await updateData(id, data);
    setNewData({});
    setFiltered(res);
  }

  return (
    <>
      <SectionHeader
        content={content}
        setFiltered={setFiltered}
        setFilter={setFilter}
        filter={filter}
        setSearch={setSearch}
        search={search}
      />
      <div className="px-4 sm:px-6 lg:px-8 bg-primary-light dark:bg-primary-dark py-8 ">
        <Toolbar content={content} path={path} />
        <Container>
          {selectedData.length > 0 && (
            <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-primary-light dark:bg-primary-dark sm:left-16 rounded-md px-4">
              <button
                type="button"
                onClick={deleteSelected}
                className="inline-flex items-center rounded border border-primary-light dark:border-primary-dark bg-secondary-light dark:bg-secondary-dark px-2.5 py-1.5 text-xs font-medium text-primary-light dark:text-primary-dark shadow-sm hover:bg-primary-light dark:hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Delete
              </button>
            </div>
          )}
          <table className="min-w-full table-fixed ">
            <TableHead
              columns={columns}
              checkbox={checkbox}
              setChecked={setChecked}
              checked={checked}
              toggleAll={toggleAll}
            />
            <TableBody
              columns={columns}
              page={page}
              setSelectedData={setSelectedData}
              selectedData={selectedData}
            />
          </table>
        </Container>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginated={paginated}
        page={page}
        setCurrentPage={setCurrentPage}
        setPage={setPage}
      />
    </>
  );
}

function Container({ children }) {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
function Toolbar({ path, content }) {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold text-primary-light dark:text-primary-dark">
          {content.subtitle}
        </h1>
        <p className="mt-2 text-sm text-primary-light dark:text-primary-dark">
          {content.description}
        </p>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <Link
          href={`${path}/add`}
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Add
        </Link>
      </div>
    </div>
  );
}
