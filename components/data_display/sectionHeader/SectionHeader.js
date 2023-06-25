import {
  BarsArrowUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
export default function SectionHeader() {
  return (
    <div className="border-b p-8 border-primary-light dark:border-primary-dark pb-5 sm:flex sm:items-center sm:justify-between bg-primary-light dark:bg-primary-dark">
      <h3 className="text-lg font-medium leading-6 text-primary-light dark:text-primary-dark">
        Job Postings
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
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="mobile-search-candidate"
              id="mobile-search-candidate"
              className="block w-full rounded-none rounded-l-md border-primary-light dark:border-primary-dark pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:hidden"
              placeholder="Search"
            />
            <input
              type="text"
              name="desktop-search-candidate"
              id="desktop-search-candidate"
              className="hidden w-full rounded-none rounded-l-md border-primary-light dark:border-primary-dark pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:block sm:text-sm"
              placeholder="Search candidates"
            />
          </div>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center rounded-r-md border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark px-4 py-2 text-sm font-medium text-primary-light dark:text-primary-light hover:bg-secondary-light dark:hover:bg-secondary-dark focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <BarsArrowUpIcon
              className="h-5 w-5 text-primary-light dark:text-primary-dark"
              aria-hidden="true"
            />
            <span className="ml-2">Sort</span>
            <ChevronDownIcon
              className="ml-2.5 -mr-1.5 h-5 w-5 text-primary-light dark:text-primary-dark"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
