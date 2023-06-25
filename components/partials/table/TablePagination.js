"use client";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

export default function TablePagination({
  totalPages,
  currentPage,
  paginated,
  setPage,
  setCurrentPage,
}) {
  const nextPage = () => {
    if (currentPage < paginated.length - 1) {
      setPage(paginated[currentPage + 1]);
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage >= 1) {
      setPage(paginated[currentPage - 1]);
      setCurrentPage(currentPage - 1);
    }
  };

  const jumpToPage = (pageNo) => {
    setPage(paginated[pageNo]);
    setCurrentPage(pageNo);
  };

  return (
    <nav className="flex items-center justify-between border-t border-primary-light dark:border-primary-dark px-4  ">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={previousPage}
          className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-primary-light dark:text-primary-dark hover:border-gray-300 hover:text-primary-light dark:hover-primary-dark"
        >
          <ArrowLongLeftIcon
            className="mr-3 h-5 w-5 text-primary-light dark:text-primary-dark"
            aria-hidden="true"
          />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {[...Array(totalPages)].map((_, index) => {
          if (index === currentPage) {
            return (
              <a
                href="#"
                key={index}
                className="inline-flex items-center border-t-2 border-secondary-light dark:border-secondary-dark px-4 pt-4 text-sm font-medium text-color-light dark:text-color2-dark"
                aria-current="page"
              >
                {index + 1}
              </a>
            );
          } else {
            return (
              <a
                href="#"
                key={index}
                onClick={() => jumpToPage(index)}
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-primary-light dark:text-primary-dark hover:border-primary-light hover:text-secondary-light dark:hover:border-primary-dark dark:hover:text-secondary-dark"
              >
                {index + 1}
              </a>
            );
          }
        })}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={nextPage}
          className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-primary-light dark:text-primary-dark hover:border-primary-light hover:text-secondary-light dark:hover:border-primary-dark dark:hover:text-secondary-dark"
        >
          Next
          <ArrowLongRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
}
