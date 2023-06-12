"use client";
import SelectInput from "@/components/ui/inputs/SelectInput";
import TextArea from "@/components/ui/inputs/TextArea";
import TextInput from "@/components/ui/inputs/TextInput";
import React, { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import useThemeContext from "@/context/theme/useContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AddCategoryForm({ handleCreate, productTypes }) {
  const [data, setData] = useState({
    name: "",
    description: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const { notification, setNotification } = useThemeContext();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.type.length === 0) {
      setError("Type field is required");
      setNotification({
        title: "Error",
        message: "Type field is required",
        type: "error",
        show: true,
      });
      return;
    } else {
      try {
        await handleCreate(data);
      } catch (error) {
        setError(error);
      }
      setNotification({
        title: "Success",
        message: "Successfully created",
        type: "success",
        show: true,
      });
      setData({
        name: "",
        description: "",
        type: "",
      });
      setLoading(false);
    }

    // validate if type field is empty
  };

  // TODO: Finish form, save images to server, page layout for sub navigation. Control fields and create a form that can take any data and create the record.
  // For later: create push notifications for created orders

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 divide-y divide-primary-light dark:divide-primary-dark"
    >
      <div className="space-y-8 divide-y divide-primary-light dark:divide-primary-dark">
        <div>
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-secondary-light dark:text-secondary-dark">
                Add product
              </h3>
              <p className="mt-1 text-sm text-primary-light dark:text-primary-dark">
                Add new product
              </p>
            </div>

            <StatusInput />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <TextInput
                name="name"
                width="w-full"
                label={"Product Name"}
                value={data.name}
                onChange={handleChange}
                required={true}
              />
              <TextArea
                name="description"
                value={data.description}
                onChange={handleChange}
                width="w-full"
                rows={5}
                label={"Description"}
                required={true}
              />
            </div>
            <div className="sm:col-span-2">
              <SelectInput
                name="type"
                value={data.type}
                onChange={handleChange}
                width="w-full"
                label={"Type"}
                options={productTypes}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark py-2 px-4 text-sm font-medium text-primary-light dark:text-primary-dark shadow-sm hover:bg-secondary-light dark:hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-color1-light dark:bg-color2-dark py-2 px-4 text-sm font-medium text-primary-light dark:text-primary-dark shadow-sm hover:bg-secondary-light dark:hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

function ImageInput({ label, multiple = false }) {
  return (
    <div className="sm:col-span-6">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium text-primary-light dark:text-primary-dark"
      >
        {label}
      </label>
      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-primary-light dark:border-primary-dark px-6 pt-5 pb-6">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-primary-light dark:text-primary-dark"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-primary-light dark:text-primary-dark">
            <label
              htmlFor="file-upload"
              className="p-2 relative cursor-pointer rounded-md  bg-primary-light dark:bg-primary-dark font-medium text-secondary-light dark:text-secondary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-light dark:focus-within:ring-primary-dark focus-within:ring-offset-2 hover:text-color-light dark:hover:text-color-dark"
            >
              <span>Upload files</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                multiple={multiple}
              />
            </label>
            <p className="pl-2 p-2">or drag and drop</p>
          </div>
          <p className="text-xs text-primary-light dark:text-primary-dark">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusInput() {
  const publishingOptions = [
    {
      title: "Published",
      description: "This job posting can be viewed by anyone who has the link.",
      current: true,
    },
    {
      title: "Draft",
      description: "This job posting will no longer be publicly accessible.",
      current: false,
    },
  ];
  const [selected, setSelected] = useState(publishingOptions[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
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
                  <p className="ml-2.5 text-sm font-medium">{selected.title}</p>
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
                    value={option}
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
                                active ? "text-white" : "text-indigo-500"
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
                          className={classNames(
                            active ? "text-indigo-200" : "text-gray-500",
                            "mt-2"
                          )}
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
