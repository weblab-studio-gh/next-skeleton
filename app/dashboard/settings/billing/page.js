"use client";
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  BellIcon,
  BriefcaseIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CogIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import AppNav from "@/components/app_shell/appNav/AppNav";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false);

  return (
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-full bg-primary-light dark:bg-primary-dark">
        <body class="h-full">
        ```
      */}
      <div>
        {/* Content area */}

        <main className="flex-1">
          <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
            <div className="pt-10 pb-16">
              <div className="px-4 sm:px-6 md:px-0">
                <h1 className="text-3xl font-bold tracking-tight text-primary-light dark:text-primary-dark">
                  Settings
                </h1>
              </div>
              <div className="px-4 sm:px-6 md:px-0">
                <div className="py-6">
                  {/* Tabs */}

                  {/* Description list with inline editing */}
                  <div className="mt-10 divide-y divide-gray-200">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium leading-6 text-primary-light dark:text-primary-dark">
                        Profile
                      </h3>
                      <p className="max-w-2xl text-sm text-secondary-light dark:text-secondary-dark">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>
                    <div className="mt-6">
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                          <dt className="text-sm font-medium text-secondary-light dark:text-secondary-dark">
                            Name
                          </dt>
                          <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">Chelsea Hagon</span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                          <dt className="text-sm font-medium text-secondary-light dark:text-secondary-dark">
                            Photo
                          </dt>
                          <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </span>
                            <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                              <button
                                type="button"
                                className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                Update
                              </button>
                              <span
                                className="text-secondary-light dark:text-secondary-dark"
                                aria-hidden="true"
                              >
                                |
                              </span>
                              <button
                                type="button"
                                className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                Remove
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                          <dt className="text-sm font-medium text-secondary-light dark:text-secondary-dark">
                            Email
                          </dt>
                          <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">
                              chelsea.hagon@example.com
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-secondary-light dark:border-secondary-dark sm:py-5">
                          <dt className="text-sm font-medium text-secondary-light dark:text-secondary-dark">
                            Job title
                          </dt>
                          <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">
                              Human Resources Manager
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="mt-10 divide-y divide-gray-200">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium leading-6 text-primary-light dark:text-primary-dark">
                        Account
                      </h3>
                      <p className="max-w-2xl text-sm text-secondary-light dark:text-secondary-dark">
                        Manage how information is displayed on your account.
                      </p>
                    </div>
                    <div className="mt-6">
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                          <dt className="text-sm font-medium text-secondary-light dark:text-secondary-dark">
                            Language
                          </dt>
                          <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">English</span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                          <dt className="text-sm font-medium text-secondary-light dark:text-secondary-dark">
                            Date format
                          </dt>
                          <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">DD-MM-YYYY</span>
                            <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                              <button
                                type="button"
                                className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                Update
                              </button>
                              <span
                                className="text-secondary-light dark:text-secondary-dark"
                                aria-hidden="true"
                              >
                                |
                              </span>
                              <button
                                type="button"
                                className="rounded-md bg-primary-light dark:bg-primary-dark font-medium text-primary-light dark:text-primary-dark hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                              >
                                Remove
                              </button>
                            </span>
                          </dd>
                        </div>
                        <Switch.Group
                          as="div"
                          className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5"
                        >
                          <Switch.Label
                            as="dt"
                            className="text-sm font-medium text-secondary-light dark:text-secondary-dark"
                            passive
                          >
                            Automatic timezone
                          </Switch.Label>
                          <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                            <Switch
                              checked={automaticTimezoneEnabled}
                              onChange={setAutomaticTimezoneEnabled}
                              className={classNames(
                                automaticTimezoneEnabled
                                  ? "bg-purple-600"
                                  : "bg-gray-200",
                                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-auto"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  automaticTimezoneEnabled
                                    ? "translate-x-5"
                                    : "translate-x-0",
                                  "inline-block h-5 w-5 transform rounded-full bg-primary-light dark:bg-primary-dark shadow ring-0 transition duration-200 ease-in-out"
                                )}
                              />
                            </Switch>
                          </dd>
                        </Switch.Group>
                        <Switch.Group
                          as="div"
                          className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-secondary-light dark:border-secondary-dark sm:py-5"
                        >
                          <Switch.Label
                            as="dt"
                            className="text-sm font-medium text-secondary-light dark:text-secondary-dark"
                            passive
                          >
                            Auto-update applicant data
                          </Switch.Label>
                          <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                            <Switch
                              checked={autoUpdateApplicantDataEnabled}
                              onChange={setAutoUpdateApplicantDataEnabled}
                              className={classNames(
                                autoUpdateApplicantDataEnabled
                                  ? "bg-purple-600"
                                  : "bg-gray-200",
                                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-auto"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  autoUpdateApplicantDataEnabled
                                    ? "translate-x-5"
                                    : "translate-x-0",
                                  "inline-block h-5 w-5 transform rounded-full bg-primary-light dark:bg-primary-dark shadow ring-0 transition duration-200 ease-in-out"
                                )}
                              />
                            </Switch>
                          </dd>
                        </Switch.Group>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
