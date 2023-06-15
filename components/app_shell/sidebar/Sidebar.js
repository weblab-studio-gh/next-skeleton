'use client';
import { Fragment } from 'react';

import { XMarkIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/outline';

import { Dialog, Transition } from '@headlessui/react';
import { Disclosure } from '@headlessui/react';

import useThemeContext from '../../../context/theme/useContext';
import { navigation } from '../../../constants/navigation';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function NavItem({ item }) {
  const pathName = usePathname();

  return (
    <div>
      <a
        href={item.href}
        className={classNames(
          item.current(pathName)
            ? 'border-l-2 border-primary-light dark:border-secondary-dark '
            : 'text-primary-light dark:text-primary-dark hover:border-l-2   ',
          'transition transform w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium '
        )}
      >
        <item.icon
          className="mr-3 h-6 w-6 flex-shrink-0 text-primary-light dark:text-primary-dark"
          aria-hidden="true"
        />
        {item.name}
      </a>
    </div>
  );
}

function NavItemWithDropDownMenu({ item }) {
  const pathName = usePathname();
  return (
    <Disclosure defaultOpen={item.current(pathName)} as="div" className="space-y-1">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              item.current(pathName) || open
                ? 'border-l-2 border-primary-light dark:border-secondary-dark '
                : 'text-primary-light dark:text-primary-dark hover:border-l-2   ',
              'transition transform w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium '
            )}
          >
            <item.icon
              className="mr-3 h-6 w-6 flex-shrink-0 text-primary-light dark:text-primary-dark"
              aria-hidden="true"
            />
            <span className="mr-auto">{item.name}</span>
            <svg
              className={classNames(
                open ? ' rotate-90' : '',
                'mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out '
              )}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
            </svg>
          </Disclosure.Button>
          <Transition
            show={open}
            className="overflow-hidden "
            enter="transition transition-[max-height] duration-200 ease-in"
            enterFrom="transform max-h-0"
            enterTo="transform max-h-screen"
            leave="transition transition-[max-height] duration-400 ease-out"
            leaveFrom="transform max-h-screen"
            leaveTo="transform max-h-0"
          >
            <Disclosure.Panel className="space-y-1 bg-primary-light dark:bg-primary-dark">
              {item.children.map((subItem, key) => (
                <DropDownMenuItem pathName={pathName} key={key} subItem={subItem} />
              ))}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

function DropDownMenuItem({ subItem, pathName }) {
  const router = useRouter();
  return (
    <Disclosure.Button
      as="a"
      onClick={(e) => {
        e.preventDefault();
        router.push(subItem.href);
      }}
      href={subItem.href}
      className={classNames(
        subItem.current(pathName)
          ? 'border-l-4 border-primary-light dark:border-secondary-dark '
          : 'text-primary-light dark:text-primary-dark hover:border-l-4   ',
        'transition transform w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium '
        //   ? "dark:bg-primary-dark bg-color-light text-primary-light dark:text-primary-dark"
        //   : "text-primary-light dark:text-primary-dark hover:bg-color-light dark:hover:bg-primary-dark",
        // "group transition ease-in-out duration-300 transform w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md"
      )}
    >
      {subItem.name}
    </Disclosure.Button>
  );
}

function MobileSidebar({ setSidebarOpen }) {
  return (
    <Transition.Child
      as={Fragment}
      enter="transition-opacity ease-linear duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
    </Transition.Child>
  );
}

function MobileSidebarPanel({ setSidebarOpen }) {
  return (
    <Transition.Child
      as={Fragment}
      // slide in
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      // slide out
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-secondary-light dark:bg-secondary-dark pt-5 pb-4">
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button
            type="button"
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <XMarkIcon
              className="h-6 w-6 text-primary-light dark:text-primary-dark"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="flex flex-shrink-0 items-center px-4">
          {/* <Image
          width={32}
          height={32}
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
          alt="Your Company"
        /> */}
        </div>
        <div className="mt-5 h-0 flex-1 overflow-y-auto">
          <nav className="space-y-1 px-2">
            {navigation?.map((item, key) =>
              !item.children ? (
                <NavItem key={key} item={item} />
              ) : (
                <NavItemWithDropDownMenu key={key} item={item} />
              )
            )}
          </nav>
        </div>
      </Dialog.Panel>
    </Transition.Child>
  );
}

function DesktopSidebar({ collapse, setCollapse }) {
  return (
    <div
      className={classNames(
        collapse ? 'w-14 ' : 'w-64 ',
        'hidden md:flex transition-[width] duration-300 ease-in-out bg-secondary-light dark:bg-secondary-dark'
      )}
    >
      <div
        className={classNames(
          collapse ? 'w-[60px] ' : 'w-[221] ',
          'flex h-[100%] flex-grow flex-col overflow-y-auto shadow pt-5 bg-secondary-light dark:bg-secondary-dark'
        )}
      >
        <div className="flex flex-shrink-0 items-center px-4">
          {/* <Image
            width={32}
            height={32}
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
            alt="Your Company"
          /> */}
        </div>
        <div className="mt-5 flex flex-1 flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {navigation?.map((item, key) =>
              !item.children ? (
                <NavItem key={key} item={item} />
              ) : (
                <NavItemWithDropDownMenu key={key} item={item} />
              )
            )}
          </nav>
        </div>
        <button
          onClick={() => setCollapse(!collapse)}
          className="h-32 flex justify-around px-4 overflow-hidden"
        >
          <ChevronDoubleLeftIcon className="h-6 w-6 text-primary-light dark:text-primary-dark" />
          <span className="">Collapse sidebar</span>
        </button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { setSidebarOpen, sidebarOpen } = useThemeContext();
  const { collapse, setCollapse } = useThemeContext();

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
          <MobileSidebar setSidebarOpen={setSidebarOpen} />
          <div className="fixed inset-0 z-40 flex">
            <MobileSidebarPanel setSidebarOpen={setSidebarOpen} />
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <DesktopSidebar collapse={collapse} setCollapse={setCollapse} />
    </>
  );
}
