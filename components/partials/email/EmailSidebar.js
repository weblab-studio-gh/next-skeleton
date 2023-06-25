"use client";
import { Fragment, useState } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ email, deleteEmail }) {
  const [selected, setSelected] = useState(email[0]);
  return (
    <div className="flex">
      <div className=" inset-0 w-[500px] py-6 px-4 sm:px-6 lg:px-8">
        <div className="h-full rounded-lg border-2 border-primary-light dark:border-primary-dark">
          <ul
            role="list"
            className="divide-y divide-primary-light dark:divide-primary-dark"
          >
            {email.map((mail, key) => (
              <li key={key} className="flex justify-between gap-x-6 px-6 py-5">
                <div
                  onClick={() => setSelected(mail)}
                  className="flex gap-x-4 cursor-pointer"
                >
                  {/* <img
                className="h-12 w-12 flex-none rounded-full bg-primary-light dark:bg-primary-dark"
                src={person.imageUrl}
                alt=""
              /> */}
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-primary-light dark:text-primary-dark">
                      {mail.subject}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-primary-light dark:text-primary-dark">
                      {mail.from?.value[0].address}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-secondary-light dark:text-secondary-dark">
                    {/* {mail.date?.toLocaleDateString()} */}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-primary-light dark:text-primary-dark">
                    <time dateTime={mail.date.toLocaleDateString()}>
                      {mail.date?.toLocaleDateString()}
                    </time>
                  </p>

                  <button className="mt-2 flex items-center text-sm text-primary-light dark:text-primary-dark">
                    <TrashIcon
                      onClick={() => deleteEmail(mail.messageId)}
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-primary-light dark:text-primary-dark"
                      aria-hidden="true"
                    />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative z-0 flex-1  border-l border-primary-light dark:border-primary-dark ">
        {/* Start secondary column (hidden on smaller screens) */}
        <div className=" inset-0 py-6 px-4 sm:px-6 lg:px-8">
          <div className="h-full rounded-lg border-2 border-primary-light dark:border-primary-dark">
            {/* set dangerously html to email.html */}
            {selected.html ? (
              <div dangerouslySetInnerHTML={{ __html: selected.html }} />
            ) : (
              selected.text
            )}
          </div>
        </div>
        {/* End secondary column */}
      </div>
    </div>
  );
}

const asd = () => {
  <div className="lg:flex lg:items-center lg:justify-between pb-12">
    <div className="min-w-0 flex-1">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div className="flex">
              <a
                href="#"
                className="text-sm font-medium text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark"
              >
                Dashboard
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-primary-light dark:text-primary-dark"
                aria-hidden="true"
              />
              <a
                href="#"
                className="ml-4 text-sm font-medium text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark"
              >
                Email
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <h2 className="mt-2 text-2xl font-bold leading-7 text-secondary-light dark:text-secondary-dark sm:truncate sm:text-3xl sm:tracking-tight">
        John Doe
      </h2>
      <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
        <div className="mt-2 flex items-center text-sm text-primary-light dark:text-primary-dark">
          <BriefcaseIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-primary-light dark:text-primary-dark"
            aria-hidden="true"
          />
          info@email.com
        </div>
        <div className="mt-2 flex items-center text-sm text-primary-light dark:text-primary-dark">
          <MapPinIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-primary-light dark:text-primary-dark"
            aria-hidden="true"
          />
          12 unread
        </div>

        <div className="mt-2 flex items-center text-sm text-primary-light dark:text-primary-dark">
          <CalendarIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-primary-light dark:text-primary-dark"
            aria-hidden="true"
          />
          2021. 09. 12.
        </div>
      </div>
    </div>
    <div className="mt-5 flex lg:mt-0 lg:ml-4">
      <span className="hidden sm:block">
        <button
          type="button"
          className="inline-flex items-center transition-colors duration-100 rounded-md border border-primary-light dark:border-primary-dark hover:border-secondary-light dark:hover:border-secondary-dark bg-primary-light dark:bg-primary-dark px-4 py-2 text-sm font-medium text-primary-light dark:text-primary-dark shadow-sm hover:bg-color2-light dark:hover:bg-color2-dark focus:outline-none focus:ring-2 focus:ring-secondary-light dark:focus:ring-secondary-dark focus:ring-offset-2"
        >
          <PencilIcon
            className="-ml-1 mr-2 h-5 w-5 text-primary-light dark:text-primary-dark"
            aria-hidden="true"
          />
          Change Email
        </button>
      </span>

      <span className="ml-3 hidden sm:block">
        <button
          type="button"
          className="inline-flex transition-colors duration-100 items-center rounded-md border border-primary-light dark:border-primary-dark hover:border-secondary-light dark:hover:border-secondary-dark bg-primary-light dark:bg-primary-dark px-4 py-2 text-sm font-medium text-primary-light dark:text-primary-dark shadow-sm hover:bg-color2-light dark:hover:bg-color2-dark focus:outline-none focus:ring-2 focus:ring-secondary-light dark:focus:ring-secondary-dark focus:ring-offset-2"
        >
          <LinkIcon
            className="-ml-1 mr-2 h-5 w-5 text-primary-light dark:text-primary-dark"
            aria-hidden="true"
          />
          Refresh
        </button>
      </span>

      <span className="sm:ml-3">
        <button
          type="button"
          className="inline-flex items-center transition-colors duration-100 rounded-md border border-primary-light dark:border-primary-dark hover:border-secondary-light dark:hover:border-secondary-dark bg-secondary-light dark:bg-secondary-dark px-4 py-2 text-sm font-medium text-primary-light dark:text-primary-dark shadow-sm hover:bg-color2-light dark:hover:bg-color2-dark focus:outline-none focus:ring-2 focus:ring-secondary-light dark:focus:ring-secondary-dark focus:ring-offset-2"
        >
          <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Send
        </button>
      </span>

      {/* Dropdown */}
      <Menu as="div" className="relative ml-3 sm:hidden">
        <Menu.Button className="inline-flex items-center rounded-md border border-primary-light dark:border-primary-dark hover:border-secondary-light dark:hover:border-secondary-dark bg-primary-light dark:bg-primary-dark px-4 py-2 text-sm font-medium text-primary-light dark:text-primary-dark shadow-sm hover:bg-primary-light dark:hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-secondary-light dark:focus:ring-secondary-dark focus:ring-offset-2">
          More
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 text-primary-light dark:text-primary-dark"
            aria-hidden="true"
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-primary-light dark:bg-primary-dark py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-primary-light dark:bg-primary-dark" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Edit
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-primary-light dark:bg-primary-dark" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  View
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  </div>;
};
