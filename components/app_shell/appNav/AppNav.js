'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// import cicrle plus logo
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function AppNav({ tabs }) {
  const params = usePathname();

  return (
    <div className="relative border-b border-primary-light dark:border-primary-dark pb-5 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between"></div>
      <div className="mt-4">
        <div className=" sm:block">
          <nav className="-mb-px flex md:space-x-8 md:py-2 items-center md:flex-row flex-col">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.href === params
                    ? ' border-secondary-light border:text-secondary-dark text-secondary-light dark:text-secondary-dark'
                    : 'border-transparent  text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark hover:border-secondary-light dark:hover:border-secondary-dark',
                  'whitespace-nowrap w-full justify-center text-center py-3 px-1 border-b-2 items-center font-medium text-sm'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
