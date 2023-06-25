import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default async function Grid({ items }) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((user, key) => (
        <li
          key={key}
          className="col-span-1 divide-y rounded-lg shadow divide-primary-light dark:divide-primary-dark bg-secondary-light dark:bg-secondary-dark"
        >
          <Link href={`/dashboard/users/${user.id}`}>
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-primary-light dark:text-primary-dark">
                    {user.name || user.email}
                  </h3>
                  <span className="inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium text-primary-light dark:text-primary-dark bg-teal-light dark:bg-teal-dark">
                    {user.type}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">{user.email}</p>
              </div>
              <img
                className="h-10 w-10 flex-shrink-0 rounded-full bg-primary-light dark:bg-primary-dark"
                src={user.image || '/images/placeholder.png'}
                alt=""
              />
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-primary-light dark:divide-primary-dark">
                <div className="flex w-0 flex-1">
                  <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark">
                    <EnvelopeIcon
                      className="h-5 w-5 text-primary-light dark:text-primary-dark"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Email</span>
                  </div>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <div className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark">
                    <PhoneIcon
                      className="h-5 w-5 text-primary-light dark:text-primary-dark"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Call</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
