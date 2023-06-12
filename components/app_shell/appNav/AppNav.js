"use client";
import { usePathname } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function AppNav({ tabs }) {
  const params = usePathname();

  return (
    <div className="pb-10">
      <div className="lg:hidden">
        <label htmlFor="selected-tab" className="sr-only">
          Select a tab
        </label>
        <select
          id="selected-tab"
          name="selected-tab"
          className="mt-1  block w-full rounded-md border-secondary-light dark:border-secondary-dark py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
          defaultValue={tabs?.find((tab) => tab.current).name}
        >
          {tabs?.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden lg:block">
        <div className="border-b border-secondary-light dark:border-secondary-dark ">
          <nav className="-mb-px flex space-x-8 ">
            {tabs?.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.href === params
                    ? "border-purple-500 text-secondary-light dark:text-secondary-dark"
                    : "border-transparent text-primary-light dark:text-primary-dark hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                )}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
