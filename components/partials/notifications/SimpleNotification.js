"use client";
import { Fragment, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useThemeContext } from "@/context/theme/provider";

export default function SimpleNotification({ notification, setNotification }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  //   rerender if notification changes
  useEffect(() => {
    if (notification.show === false) {
      setShow(false);
    } else {
      setShow(true);
    }

    if (notification.type === "error") {
      setError(true);
    } else {
      setError(false);
    }
  }, [notification]);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}

      <div className="flex z-30 fixed top-20 right-8 w-[300px] flex-col items-center space-y-4 sm:items-end">
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-[300px] max-w-sm overflow-hidden rounded-lg bg-primary-light dark:bg-primary-dark shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {error ? (
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-danger-light dark:text-danger-dark"
                      aria-hidden="true"
                    />
                  ) : (
                    <CheckCircleIcon
                      className="h-6 w-6 text-success-light dark:text-success-dark"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-primary-light dark:text-primary-dark">
                    {notification.title}
                  </p>
                  <p className="mt-1 text-sm text-primary-light dark:text-primary-dark">
                    {notification.message}
                  </p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      setShow(false);
                      setNotification({
                        ...notification,
                        show: false,
                      });
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
}
