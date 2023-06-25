'use client';
import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function AutoComplete({ label, values, name }) {
  const [selected, setSelected] = useState(values[0]);
  const [query, setQuery] = useState('');

  const filteredValues =
    query === ''
      ? values
      : values.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <Combobox value={selected} onChange={setSelected}>
      {label && (
        <label
          className="block text-sm font-medium text-primary-light dark:text-primary-dark"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-primary-light dark:bg-primary-dark text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus:dark:ring-primary-dark focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full h-12 bg-primary-light dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
            displayValue={(person) => person.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex bg-primary-light dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark ">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary-light dark:bg-primary-dark py-1 text-base shadow-lg ring-1 ring-primary-light dark:ring-primary-dark ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredValues.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredValues.map((item) => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active
                        ? 'bg-teal-light dark:bg-teal-dark text-white'
                        : 'text-primary-light dark:text-primary-dark'
                    }`
                  }
                  value={item.name}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`flex truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        <span className="text-xs px-2 mr-auto ">
                          <p className="  ">{item.name}</p>
                        </span>
                        <span className="text-xs px-2  ml-auto">
                          <p className=" flex px-2 py-1 rounded-md ">
                            <p className="text-[10px] pr-2 text-primary-light dark:text-primary-dark">
                              {String(item.barcode)?.split(0, 8)}...
                            </p>
                          </p>
                        </span>
                        <span className="text-xs px-2   ml-auto">
                          <p className=" bg-teal-light dark:bg-teal-dark flex px-2 py-1 rounded-md ">
                            <p className="text-[10px] pr-2 text-primary-light dark:text-primary-dark">
                              price
                            </p>{' '}
                            {item.price}
                          </p>
                        </span>

                        <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                          {item.barcode}
                        </span>
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active
                              ? 'text-primary-light dark:text-primary-dark'
                              : 'text-teal-light dark:text-teal-dark'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
