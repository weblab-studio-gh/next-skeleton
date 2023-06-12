import {
  BarsArrowUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

export default function SectionHeader({ setSearch, setFilter, content }) {
  const sortMenu = [
    { name: "Newest", href: "#" },
    { name: "Oldest", href: "#" },
    { name: "ASC", href: "#" },
    { name: "DSC", href: "#" },
  ];

  return (
    <div className="border-b p-8 border-primary-light dark:border-primary-dark pb-5 sm:flex sm:items-center sm:justify-between bg-primary-light dark:bg-primary-dark">
      <h3 className="text-lg font-medium leading-6 text-primary-light dark:text-primary-dark">
        {content.title}
      </h3>
      <div className="mt-3 sm:mt-0 sm:ml-4">
        <label htmlFor="mobile-search-candidate" className="sr-only">
          Search
        </label>
        <label htmlFor="desktop-search-candidate" className="sr-only">
          Search
        </label>
        <div className="flex rounded-md shadow-sm">
          <div className="relative flex-grow focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-primary-light dark:text-primary-dark"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="mobile-search-candidate"
              id="mobile-search-candidate"
              className="block w-full rounded-none rounded-l-md bg-primary-light dark:bg-primary-dark border-primary-light dark:border-primary-dark pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:hidden"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              type="text"
              name="desktop-search-candidate"
              id="desktop-search-candidate"
              className="hidden w-full rounded-none rounded-l-md bg-primary-light dark:bg-primary-dark border-primary-light dark:border-primary-dark pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:block sm:text-sm"
              placeholder="Search candidates"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Menu as="div" className="relative inline-block text-left ">
            <div>
              <Menu.Button className="relative -ml-px inline-flex items-center rounded-r-md border border-primary-light dark:border-primary-dark bg-secondary-light dark:bg-secondary-dark px-4 py-2 text-sm font-medium text-primary-light dark:text-primary-light hover:bg-secondary-light dark:hover:bg-secondary-dark focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <BarsArrowUpIcon
                  className="h-5 w-5 text-primary-light dark:text-primary-dark"
                  aria-hidden="true"
                />
                <span className="ml-2 text-primary-light dark:text-primary-dark">
                  Sort
                </span>
                <ChevronDownIcon
                  className="ml-2.5 -mr-1.5 h-5 w-5 text-primary-light dark:text-primary-dark"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-36  z-10 origin-top-right divide-y divide-gray-100 rounded-md bg-secondary-light dark:bg-secondary-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {sortMenu.map((item, key) => (
                    <Menu.Item key={key}>
                      {({ active }) => (
                        <button
                          onClick={() => setFilter(item.name)}
                          className={`${
                            active
                              ? "bg-color-light dark:bg-color-dark text-secondary-light dark:text-primary-dark"
                              : "text-primary-light dark:text-primary-dark  "
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm  `}
                        >
                          {item.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
