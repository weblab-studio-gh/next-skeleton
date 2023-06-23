'use client';
import { useState, useEffect } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ComboBox({
  data,
  label,
  name,
  required,
  width,
  className,
  ...rest
}) {
  const [query, setQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredData =
    query === ''
      ? data
      : data.filter((d) => {
          return d.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" value={selectedItems} onChange={setSelectedItems} multiple>
      <>
        {selectedItems.map((item) => (
          <input
            name={name}
            className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
            type="hidden"
            options={data}
            multiple
            value={item}
          />
        ))}
      </>
      <Combobox.Label className="block text-sm font-medium text-primary-light dark:text-primary-dark">
        {label}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-1 sm:text-sm focus:border-color-primary-light dark:focus:border-color-primary-dark"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={() => {
            return selectedItems.map((item) => {
              return ` ${data.find((d) => d.id === item)?.name}`;
            });
          }}
          defaultValue={selectedItems[0]}
        />

        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>
        {filteredData.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary-light dark:bg-primary-dark py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredData.map((item) => (
              <Combobox.Option
                key={item.id}
                value={item.id}
                displayValue={item.name}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active
                      ? 'bg-secondary-light dark:bg-secondary-dark text-secondary-light dark:text-secondary-dark'
                      : 'text-primary-light dark:text-primary-dark'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected && 'font-semibold'
                      )}
                    >
                      {item.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 left-0 flex items-center pl-1.5',
                          active
                            ? 'text-primary-light dark:text-primary-dark'
                            : 'text-secondary-light dark:text-secondary-dark'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
