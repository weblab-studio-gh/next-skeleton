'use client';

import { Fragment, useState } from 'react';
import { Dialog, Switch, Transition } from '@headlessui/react';
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
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import AppNav from '@/components/app_shell/appNav/AppNav';
import { userTabs } from '@/constants/navigation';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function UserDetails({ data, saveUser }) {
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false);

  const [values, setValues] = useState({
    id: data?.id || '',
    name: data?.name || '',
    email: data?.email || '',
    image: data?.image || '',
    type: data?.type || '',
    createdAt: data?.createdAt || '',
    updatedAt: data?.updatedAt || '',
  });

  const handleDelete = async (id) => {
    console.log('values', values);
    const url = '/api/users/delete';

    // confirm action before proceeding
    const confirmation = confirm('Are you sure you want to delete this user?');

    if (confirmation) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(id),
        });
        console.log('response', response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log('values', values);
    const url = '/api/users/update';

    const formData = new FormData();
    formData.append('id', values.id);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('image', values.image);
    formData.append('type', values.type);
    formData.append('createdAt', values.createdAt);
    formData.append('updatedAt', values.updatedAt);
    formData.append('new_password', values.newPassword);

    try {
      const response = await fetch(url, {
        method: 'POST',

        body: formData,
      });

      if (response.ok) {
        console.log('response', response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log('data', data);
  return (
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-full bg-primary-light dark:bg-primary-dark">
        <body class="h-full">
        ```
      */}
      <form onSubmit={handleSave}>
        {/* Content area */}
        <div className="">
          <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
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
                      {/* Description list with inline editing */}
                      <div className="mt-10 divide-y divide-neutral-light dark:divide-neutral-dark">
                        <div className="space-y-1 flex items-center justify-between">
                          <div className="">
                            <h3 className="text-lg font-medium leading-6 text-primary-light dark:text-primary-dark">
                              Profile
                            </h3>
                            <p className="max-w-2xl text-sm text-neutral-light dark:text-neutral-dark">
                              General information about the user.
                            </p>
                          </div>
                          <button
                            type="submit"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent  font-medium rounded text-primary-light dark:text-primary-dark bg-secondary-light dark:bg-secondary-dark hover:bg-primary-light dark:hover:bg-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(values.id)}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent  font-medium rounded text-primary-light dark:text-primary-dark bg-secondary-light dark:bg-secondary-dark hover:bg-primary-light dark:hover:bg-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                          >
                            Delete
                          </button>
                        </div>

                        <div className="mt-6">
                          <dl className="divide-y divide-neutral-light dark:divide-neutral-dark">
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-neutral-light dark:text-neutral-dark">
                                <label
                                  htmlFor="name"
                                  className="text-sm font-medium text-neutral-light dark:text-neutral-dark"
                                >
                                  Name
                                </label>
                              </dt>
                              <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                                <div className="flex-grow">
                                  <div className="mt-1  border-primary-light dark:border-primary-dark focus-within:border-secondary-light dark:focus-within:border-secondary-dark">
                                    <input
                                      type="text"
                                      name="name"
                                      id="name"
                                      onChange={(e) =>
                                        setValues({
                                          ...values,
                                          name: e.target.value,
                                        })
                                      }
                                      value={values.name || ''}
                                      className="block border-0 border-b border-transparent focus:ring-0 sm:text-sm bg-secondary-light dark:bg-secondary-dark focus:border-primary-light dark:focus:border-primary-dark text-primary-light dark:text-primary-dark placeholder-primary-light dark:placeholder-primary-dark"
                                    />
                                  </div>
                                </div>
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                              <dt className="text-sm font-medium text-neutral-light dark:text-neutral-dark">
                                Photo
                              </dt>
                              <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                                <span className="flex-grow">
                                  <Image
                                    src={data?.image || '/images/placeholder.png'}
                                    alt="profile"
                                    className="h-8 w-8 rounded-full"
                                    width={32}
                                    height={32}
                                  />{' '}
                                </span>
                                <input
                                  type="file"
                                  name="image"
                                  id="image"
                                  onChange={(e) => {
                                    const file = [...e.target.files][0];
                                    setValues({
                                      ...values,
                                      image: file,
                                    });
                                  }}
                                  className="block border-0 border-b border-transparent focus:ring-0 sm:text-sm bg-primary-light dark:bg-primary-dark focus:border-primary-light dark:focus:border-primary-dark text-primary-light dark:text-primary-dark placeholder-primary-light dark:placeholder-primary-dark"
                                />
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                              <dt className="text-sm font-medium text-neutral-light dark:text-neutral-dark">
                                <label
                                  htmlFor="email"
                                  className="text-sm font-medium text-neutral-light dark:text-neutral-dark"
                                >
                                  email
                                </label>
                              </dt>
                              <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                                <span className="flex-grow">
                                  <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={(e) =>
                                      setValues({
                                        ...values,
                                        email: e.target.value,
                                      })
                                    }
                                    value={values.email}
                                    className="block border-0 border-b border-transparent focus:ring-0 sm:text-sm bg-secondary-light dark:bg-secondary-dark focus:border-primary-light dark:focus:border-primary-dark text-primary-light dark:text-primary-dark placeholder-primary-light dark:placeholder-primary-dark"
                                  />
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-neutral-light dark:text-neutral-dark">
                                <label
                                  htmlFor="type"
                                  className="text-sm font-medium text-neutral-light dark:text-neutral-dark"
                                >
                                  Type
                                </label>
                              </dt>
                              <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                                <div className="flex-grow">
                                  <div className="mt-1  border-primary-light dark:border-primary-dark focus-within:border-secondary-light dark:focus-within:border-secondary-dark">
                                    <input
                                      type="text"
                                      name="type"
                                      id="type"
                                      onChange={(e) =>
                                        setValues({
                                          ...values,
                                          type: e.target.value,
                                        })
                                      }
                                      value={values.type}
                                      className="block border-0 border-b border-transparent focus:ring-0 sm:text-sm bg-secondary-light dark:bg-secondary-dark focus:border-primary-light dark:focus:border-primary-dark text-primary-light dark:text-primary-dark placeholder-primary-light dark:placeholder-primary-dark"
                                    />
                                  </div>
                                </div>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div className="mt-10 divide-y divide-neutral-light dark:divide-neutral-dark">
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium leading-6 text-primary-light dark:text-primary-dark">
                            Password
                          </h3>
                          <p className="max-w-2xl text-sm text-neutral-light dark:text-neutral-dark">
                            Manage password of the account.
                          </p>
                        </div>
                        <div className="mt-6">
                          <dl className="divide-y divide-neutral-light dark:divide-neutral-dark">
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-neutral-light dark:text-neutral-dark">
                                <label
                                  htmlFor="new_password"
                                  className="text-sm font-medium text-neutral-light dark:text-neutral-dark"
                                >
                                  Password
                                </label>
                              </dt>
                              <dd className="mt-1 flex text-sm text-primary-light dark:text-primary-dark sm:col-span-2 sm:mt-0">
                                <div className="flex-grow">
                                  <div className="mt-1  border-primary-light dark:border-primary-dark focus-within:border-secondary-light dark:focus-within:border-secondary-dark">
                                    <input
                                      type="password"
                                      name="newPassword"
                                      id="newPassword"
                                      onChange={(e) =>
                                        setValues({
                                          ...values,
                                          newPassword: e.target.value,
                                        })
                                      }
                                      value={values.newPassword || ''}
                                      className="block border-0 border-b border-transparent focus:ring-0 sm:text-sm bg-secondary-light dark:bg-secondary-dark focus:border-primary-light dark:focus:border-primary-dark text-primary-light dark:text-primary-dark placeholder-primary-light dark:placeholder-primary-dark"
                                    />
                                  </div>
                                </div>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div className="mt-10 divide-y divide-neutral-light dark:divide-neutral-dark">
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium leading-6 text-primary-light dark:text-primary-dark">
                            Permissions
                          </h3>
                          <p className="max-w-2xl text-sm text-neutral-light dark:text-neutral-dark">
                            Manage permissions and roles for this user.
                          </p>
                        </div>
                        <div className="mt-6">
                          <dl className="divide-y divide-neutral-light dark:divide-neutral-dark">
                            <Switch.Group
                              as="div"
                              className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5"
                            >
                              <Switch.Label
                                as="dt"
                                className="text-sm font-medium text-neutral-light dark:text-neutral-dark"
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
                                      ? 'bg-teal-primary dark:bg-teal-dark'
                                      : 'bg-color-light dark:bg-color-dark',
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary-light dark:focus:ring-secondary-dark focus:ring-offset-2 sm:ml-auto'
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      automaticTimezoneEnabled
                                        ? 'translate-x-5'
                                        : 'translate-x-0',
                                      'inline-block h-5 w-5 transform rounded-full bg-primary-light dark:bg-primary-dark shadow ring-0 transition duration-200 ease-in-out'
                                    )}
                                  />
                                </Switch>
                              </dd>
                            </Switch.Group>
                            <Switch.Group
                              as="div"
                              className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5"
                            >
                              <Switch.Label
                                as="dt"
                                className="text-sm font-medium text-neutral-light dark:text-neutral-dark"
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
                                      ? 'bg-teal-primary dark:bg-teal-dark'
                                      : 'bg-color-light dark:bg-color-dark',
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary-light dark:focus:ring-secondary-dark focus:ring-offset-2 sm:ml-auto'
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      autoUpdateApplicantDataEnabled
                                        ? 'translate-x-5'
                                        : 'translate-x-0',
                                      'inline-block h-5 w-5 transform rounded-full bg-primary-light dark:bg-primary-dark shadow ring-0 transition duration-200 ease-in-out'
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
        </div>
      </form>
    </>
  );
}
