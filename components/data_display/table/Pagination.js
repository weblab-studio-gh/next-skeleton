import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

export default function Pagination({
  totalPages,
  currentPage,
  paginated,
  setPage,
  setCurrentPage,
}) {
  const lastPage = () => {
    // go to last page
    setPage(paginated[totalPages - 1]);
    setCurrentPage(totalPages - 1);
  };

  const firstPage = () => {
    setPage(paginated[0]);
    setCurrentPage(0);
  };

  const jumpToPage = (pageNo) => {
    setPage(paginated[pageNo]);
    setCurrentPage(pageNo);
  };

  const pagesToShow = 5; // Change this to control the number of pages displayed
  const startPage = Math.max(0, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow);

  return (
    <nav className="flex items-center justify-between border-t border-primary-light dark:border-primary-dark px-4  ">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={firstPage}
          className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-primary-light dark:text-primary-dark hover:border-gray-300 hover:text-primary-light dark:hover-primary-dark"
        >
          <ArrowLongLeftIcon
            className="mr-3 h-5 w-5 text-primary-light dark:text-primary-dark"
            aria-hidden="true"
          />
          First
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {[...Array(totalPages)].slice(startPage, endPage).map((_, index) => {
          const pageNo = startPage + index;
          if (pageNo === currentPage) {
            return (
              <a
                href="#"
                key={pageNo}
                className="inline-flex items-center border-t-2 border-secondary-light dark:border-secondary-dark px-4 pt-4 text-sm font-medium text-color-light dark:text-color2-dark"
                aria-current="page"
              >
                {pageNo + 1}
              </a>
            );
          } else {
            return (
              <a
                href="#"
                key={pageNo}
                onClick={() => jumpToPage(pageNo)}
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-primary-light dark:text-primary-dark hover:border-primary-light hover:text-secondary-light dark:hover:border-primary-dark dark:hover:text-secondary-dark"
              >
                {pageNo + 1}
              </a>
            );
          }
        })}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={lastPage}
          className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-primary-light dark:text-primary-dark hover:border-primary-light hover:text-secondary-light dark:hover:border-primary-dark dark:hover:text-secondary-dark"
        >
          Last
          <ArrowLongRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
}
