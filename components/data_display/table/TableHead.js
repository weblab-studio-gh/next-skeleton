import React, { useState, useRef } from 'react';

export default function TableHead({ columns, toggleAll, checked, checkbox }) {
  return (
    <thead className="bg-gray-50">
      <tr className="bg-secondary-light dark:bg-secondary-dark ">
        <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
          <input
            type="checkbox"
            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-primary-light dark:border-primary-dark text-color-light dark:text-color2-dark focus:ring-primary-light dark:focus:ring-primary-dark sm:left-6"
            ref={checkbox}
            checked={checked}
            onChange={toggleAll}
          />
        </th>
        {columns.map(
          (column, key) =>
            column.name !== 'id' && (
              <th
                key={key}
                scope="col"
                className="min-w-[8rem] py-3.5 pr-3 text-left text-sm font-semibold text-primary-light dark:text-primary-dark"
              >
                {column?.documentation}
              </th>
            )
        )}

        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
}
