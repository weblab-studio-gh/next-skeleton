"use client";
import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function StatusInput({ value, onChange }) {
  const publishingOptions = [
    {
      title: "Published",
      description: "This job posting can be viewed by anyone who has the link.",
      value: true,
    },
    {
      title: "Draft",
      description: "This job posting will no longer be publicly accessible.",
      value: false,
    },
  ];
  const [published, setPublished] = useState(value);

  const handleChange = (e) => {
    setPublished(e);
    onChange({ target: { name: "published", value: e } });
  };

  return (
    <Listbox value={published} onChange={handleChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">
            {" "}
            Change published status{" "}
          </Listbox.Label>
          <div className="relative">
            <div className="inline-flex divide-x divide-primary-light dark:divide-primary-dark rounded-md shadow-sm">
              <div className="inline-flex divide-x divide-primary-light dark:divide-primary-dark rounded-md shadow-sm">
                <div className="inline-flex items-center rounded-l-md border border-transparent bg-color-light dark:bg-color-dark py-2 pl-3 pr-4 text-primary-light dark:text-primary-dark shadow-sm">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  <p className="ml-2.5 text-sm font-medium">
                    {published ? "Published" : "Draft"}
                  </p>
                </div>
                <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-color-light dark:bg-color-dark p-2 text-sm font-medium text-primary-light dark:text-primary-dark hover:bg-primary-light dark:hover:bg-primary-dark  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                  <span className="sr-only">Change published status</span>
                  <ChevronDownIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-primary-light dark:divide-primary-dark overflow-hidden rounded-md bg-primary-light dark:bg-primary-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {publishingOptions.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-primary-light dark:text-primary-dark bg-color-light dark:bg-color-dark"
                          : "text-secondary-light dark:text-secondary-dark",
                        "cursor-default select-none p-4 text-sm"
                      )
                    }
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? "font-semibold" : "font-normal"
                            }
                          >
                            {option.title}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active
                                  ? "text-primary-light dark:text-primary-dark"
                                  : "text-secondary-light dark:text-secondary-dark"
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                        <p
                          className={
                            "text-primary-light dark:text-primary-dark mt-2"
                          }
                        >
                          {option.description}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
