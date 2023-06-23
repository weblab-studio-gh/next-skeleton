'use client';
import { Fragment, useState } from 'react';
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import {
  Bars3Icon,
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { navigation } from '../../../constants/navigation';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

const user = {
  name: 'Debbie Lewis',
  handle: 'deblewis',
  email: 'debbielewis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80',
};
// const navigation = [
//   { name: "Dashboard", href: "#", current: true },
//   { name: "Jobs", href: "#", current: false },
//   { name: "Applicants", href: "#", current: false },
//   { name: "Company", href: "#", current: false },
// ];
const subNavigation = [
  { name: 'Profile', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Account', href: '#', icon: CogIcon, current: false },
  { name: 'Password', href: '#', icon: KeyIcon, current: false },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Integrations', href: '#', icon: SquaresPlusIcon, current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const user = useSession();

  return (
    <Disclosure
      as="div"
      className="relative overflow-hidden bg-secondary-light dark:bg-secondary-dark w-full"
    >
      {({ open }) => (
        <>
          <nav
            className={classNames(
              open ? 'bg-sky-900' : 'bg-transparent',
              'relative z-10 border-b border-teal-500 border-opacity-25 lg:border-none lg:bg-transparent'
            )}
          >
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 bg-secondary-light dark:bg-secondary-dark">
              <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-primary-light dark:lg:border-primary-dark">
                <div className="flex items-center px-2 lg:px-0">
                  <div className="flex-shrink-0">
                    {/* <Image
                      className="h-8 w-8 rounded-full"
                      width={32}
                      height={32}
                      src={
                        "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                      }
                      alt=""
                    /> */}
                  </div>
                  <div className="hidden lg:ml-6 lg:block lg:space-x-4">
                    <div className="flex">
                      {navigation?.map((item) =>
                        !item.children ? (
                          <div key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'dark:bg-color2-dark bg-color-light text-primary-light dark:text-primary-dark'
                                  : 'text-primary-light dark:text-primary-dark hover:bg-color-light dark:hover:bg-color2-dark',
                                'group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md'
                              )}
                            >
                              <item.icon
                                className="mr-3 h-6 w-6 flex-shrink-0 text-primary-light dark:text-primary-dark"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </div>
                        ) : (
                          <Disclosure as="div" key={item.name} className="space-y-1">
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={classNames(
                                    item.current || open
                                      ? 'dark:bg-color2-dark bg-color-light text-primary-light dark:text-primary-dark'
                                      : 'text-primary-light dark:text-primary-dark hover:bg-color-light dark:hover:bg-color2-dark',
                                    'group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md'
                                  )}
                                >
                                  <svg
                                    className={classNames(
                                      open
                                        ? 'dark:bg-color2-dark bg-color-light text-primary-light dark:text-primary-dark'
                                        : 'text-primary-light dark:text-primary-dark hover:bg-color-light dark:hover:bg-color2-dark',
                                      'mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400'
                                    )}
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                  >
                                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                  </svg>
                                  {item.name}
                                </Disclosure.Button>
                                <Disclosure.Panel className="space-y-1">
                                  {item.children.map((subItem) => (
                                    <Disclosure.Button
                                      key={subItem.name}
                                      as="a"
                                      href={subItem.href}
                                      className="group flex w-full items-center rounded-md py-2 pl-10 pr-2 text-sm font-medium text-primary-light dark:text-primary-dark hover:bg-color-light dark:hover:bg-color2-dark hover:text-gray-900"
                                    >
                                      {subItem.name}
                                    </Disclosure.Button>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative text-primary-light dark:text-primary-dark focus-within:text-gray-400">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-transparent bg-primary-light dark:bg-primary-dark bg-opacity-50 py-2 pl-10 pr-3 leading-5 placeholder-secondary-light dark:placeholder-secondary-dark focus:border-secondary-light dark:border-secondary-dark focus:bg-secondary-light dark:focus:bg-secondary-dark focus:text-secondary-light dark:focus:text-secondary-dark focus:placeholder-primary-light dark:placeholder-primary-dark focus:outline-none focus:ring-primary-light dark:ring-primary-dark sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-primary-light dark:text-primary-dark hover:bg-primary-light dark:hover:bg-primary-dark hover:text-primary-light dark:hover-primary-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-light dark:focus:ring-primary-dark">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className="block h-6 w-6 flex-shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon
                        className="block h-6 w-6 flex-shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:ml-4 lg:block">
                  <div className="flex items-center">
                    <DarkModeToggle />
                    <button
                      type="button"
                      className="flex-shrink-0 rounded-full p-1 text-primary-light dark:text-primary-dark hover:bg-primary-light dark:hover-primary-dark hover:text-primary-light dark:hover-primary-dark focus:bg-primary-light dark:focus:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2 focus:ring-offset-sky-900"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      <div>
                        <Menu.Button className="flex rounded-full text-sm text-primary-light dark:text-primary-light focus:bg-primary-light dark:focus:bg-primary-dark ocus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2 focus:ring-offset-sky-900">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            className="h-8 w-8 rounded-full"
                            width={32}
                            height={32}
                            src={user.data?.user.image || '/images/avatar.png'}
                            alt=""
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-primary-light dark:bg-primary-dark py-1 shadow-lg ring-1 ring-primary-light dark:ring-primary-dark ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block py-2 px-4 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="bg-secondary-light dark:bg-secondary-dark lg:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation?.map((item) =>
                  !item.children ? (
                    <div key={item.name}>
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md py-2 px-3 text-base font-medium text-primary-light dark:text-primary-dark hover:bg-secondary-light hover:text-secondary-light dark:hover:bg-primary-dark dark:hover:text-primary-dark"
                      >
                        {item.name}
                      </Disclosure.Button>
                    </div>
                  ) : (
                    <Disclosure as="div" key={item.name} className="space-y-1">
                      {({ open }) => (
                        <div key={item.name}>
                          <Disclosure.Button
                            as="a"
                            className={classNames(
                              item.current || open ? '' : '',
                              'block rounded-md py-2 px-3 text-base font-medium text-primary-light dark:text-primary-dark hover:bg-secondary-light hover:text-secondary-light dark:hover:bg-primary-dark dark:hover:text-primary-dark'
                            )}
                          >
                            <div className="flex items-center justify-between w-[100%]">
                              {item.name}
                              <svg
                                className={classNames(
                                  open ? '' : '',
                                  'mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400'
                                )}
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                              </svg>
                            </div>
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1 bg-primary-light dark:bg-primary-dark">
                            {item.children.map((subItem) => (
                              <Disclosure.Button
                                key={subItem.name}
                                as="a"
                                href={subItem.href}
                                className="block rounded-md py-2 px-3 text-base font-medium text-primary-light dark:text-primary-dark hover:bg-secondary-light hover:text-secondary-light dark:hover:bg-primary-dark dark:hover:text-primary-dark"
                              >
                                {subItem.name}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </div>
                      )}
                    </Disclosure>
                  )
                )}
              </div>
              <div className="border-t border-primary-light dark:border-primary-dark pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-8 w-8 rounded-full"
                      width={32}
                      height={32}
                      src={user.data?.user.image || '/images/avatar.png'}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-primary-light dark:text-primary-dark">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-primary-light dark:text-primary-dark">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full p-1 text-primary-light dark:text-primary-dark hover:bg-secondary-light hover:text-secondary-light dark:hover:bg-primary-dark dark:hover:text-primary-dark focus:bg-primary-light dark:focus:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2 focus:ring-offset-sky-900"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2">
                  <DarkModeToggle />
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-primary-light dark:text-primary-dark hover:bg-secondary-light hover:text-secondary-light dark:hover:bg-primary-dark dark:hover:text-primary-dark focus:bg-primary-light dark:focus:bg-primary-dark"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </nav>
        </>
      )}
    </Disclosure>
  );
}
