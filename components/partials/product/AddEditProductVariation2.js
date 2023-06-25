'use client';
import React, { useState, useEffect, useRef } from 'react';
import TextInput from '@/components/ui/inputs/TextInput';
import SelectInput from '@/components/ui/inputs/SelectInput';
import { PlusIcon } from '@heroicons/react/20/solid';
import { Transition } from '@headlessui/react';
import SetPrices from '@/app/dashboard/management/products/add/components/SetPrices';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import AddEditProductVariation from './AddEditProductVariation';

export default function AddEditProductVariation2({ variations, fieldValues = false }) {
  const initial = {
    variationId: '',
    productVariationOptions: [],
  };
  const [values, setValues] = useState(fieldValues === false ? [initial] : fieldValues);
  const [editItem, setEditItem] = useState({});
  const [optionsToDelete, setOptionsToDelete] = useState([]);

  const handleDelete = (variationOption) => {
    setOptionsToDelete((prev) => [...prev, variationOption.id]);
    setValues((prev) => {
      return prev.map((item) => {
        if (item.id === variationOption.variationId) {
          item.productVariationOptions = item.productVariationOptions.filter(
            (option) => option.variationOptionId !== variationOption.variationOptionId
          );
        }
        return item;
      });
    });
  };

  return (
    <div className="dark:divide-secondary-dark bg-primary-light dark:bg-primary-dark overflow-hidden rounded-lg  shadow mt-6` divide-y  divide-secondary-light">
      <div className="px-4 py-5 sm:px-6 sm:col-span-6">
        <h2 className="text-center">Product Variations</h2>
      </div>
      {/* {renderComponentCountTimes()}*/}
      <input type="hidden" name="variations" value={JSON.stringify(values)} />
      <input
        type="hidden"
        name="optionsToDelete"
        value={JSON.stringify(optionsToDelete)}
      />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-3"
      >
        {values.map((value, index) => {
          return (
            <li
              key={index}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-secondary-light dark:bg-secondary-dark shadow"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-primary-light dark:text-primary-dark">
                      {value.variation.name}
                    </h3>
                    {value.productVariationOptions.map((option) => {
                      return (
                        <span className="inline-block flex-shrink-0 rounded-full bg-teal-light dark:bg-teal-dark px-1 py-0.5 text-xs font-medium text-primary-light dark:text-primary-dark">
                          {option.variationOption.name}
                        </span>
                      );
                    })}
                  </div>
                  <p className="mt-1 truncate text-sm text-primary-light dark:text-primary-dark">
                    {value.productVariationOptions.length} products
                  </p>
                </div>
                {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={person.imageUrl} alt="" /> */}
              </div>
              <div>
                <div className="-mt-px flex divide-x">
                  <div className="flex w-0 flex-1 hover:bg-color-light dark:hover:bg-color-dark">
                    <button
                      href={`mailto:${'person.email'}`}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                      type="button"
                      onClick={() => {
                        setEditItem(value);
                      }}
                    >
                      <span className="ml-3 text-primary-light dark:text-primary-dark ">
                        Edit
                      </span>
                    </button>
                  </div>
                  <div className="flex w-0 flex-1 hover:bg-color-light dark:hover:bg-color-dark">
                    <button
                      href={`mailto:${'person.email'}`}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                      type="button"
                      onClick={() => {
                        setEditItem(value);
                      }}
                    >
                      <span className="ml-3 text-primary-light dark:text-primary-dark ">
                        Add
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="px-4 py-5 sm:px-6 sm:col-span-6 ">
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-secondary-light dark:bg-secondary-dark text-primary-light dark:text-primary-dark inline-flex items-center rounded-full border border-primary-light dark:border-primary-dark px-4 py-1.5 text-sm font-medium leading-5 shadow-sm hover:bg-primary-light dark:hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2">
              <PlusIcon
                className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Add Variation</span>
            </div>
          </div>
        </div>
        <AddEditProductVariation variations={variations} />
      </div>
      <EditVariation
        value={editItem}
        variations={variations}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export function EditVariation({ value, variations, handleDelete }) {
  return (
    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 divide-y divide-secondary-light dark:divide-secondary-dark">
      {value.productVariationOptions?.map((option, index) => {
        return (
          <div className="col-span-6 px-4 py-5 grid grid-cols-1 ">
            <div className="col-span-2 px-4 py-5">
              <SelectInput
                form="ghostForm"
                label="Variation"
                className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                name="variation"
                options={variations}
                onChange={(e) => {
                  setValues((prev) => {
                    const newValues = [...prev];
                    newValues[index].variationId = e.target.value;
                    return newValues;
                  });
                }}
                value={value.variation.name}
                data={[value.variation]}
              />
            </div>
            <div className="col-span-2 px-4 py-5">
              <SelectInput
                form="ghostForm"
                label="Attribute"
                className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                name="attribute"
                width="w-full "
                options={value.productVariationOptions}
                onChange={(e) => {
                  setValues((prev) => {
                    const newValues = [...prev];
                    newValues[index].attribute = e.target.value;
                    return newValues;
                  });
                }}
                value={value.variation.name}
                data={[option.variationOption]}
              />
            </div>
            <div className="sm:col-span-6 px-4">
              <div className=" grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <TextInput
                    form="ghostForm"
                    className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                    label="Name"
                    name="name"
                    width="w-full "
                    onChange={(e) => {
                      setValues((prev) => {
                        const newValues = [...prev];
                        newValues[index].name = e.target.value;
                        return newValues;
                      });
                    }}
                    value={option.variationOption.name}
                  />
                </div>

                <div className="sm:col-span-3">
                  <TextInput
                    form="ghostForm"
                    label="Quantity"
                    className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                    name="quantity"
                    width="w-full "
                    onChange={(e) => {
                      setValues((prev) => {
                        const newValues = [...prev];
                        newValues[index].quantity = e.target.value;
                        return newValues;
                      });
                    }}
                    value={option.quantity}
                  />
                </div>
                <div className="sm:col-span-3">
                  <TextInput
                    form="ghostForm"
                    label="Barcode"
                    className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                    width="w-full "
                    name="barcode"
                    onChange={(e) => {
                      setValues((prev) => {
                        const newValues = [...prev];
                        newValues[index].variationBarcode = e.target.value;
                        return newValues;
                      });
                    }}
                    value={option.variationBarcode}
                  />
                </div>
                <div className="sm:col-span-3">
                  <TextInput
                    form="ghostForm"
                    label="SKU"
                    className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                    name="sku"
                    width="w-full "
                    onChange={(e) => {
                      setValues((prev) => {
                        const newValues = [...prev];
                        newValues[index].variationSku = e.target.value;
                        return newValues;
                      });
                    }}
                    value={option.variationSku}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextInput
                    form="ghostForm"
                    label="Cost Price"
                    className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                    name="costPrice"
                    width="w-full "
                    onChange={(e) => {
                      setValues((prev) => {
                        const newValues = [...prev];
                        newValues[index].costPrice = e.target.value;
                        return newValues;
                      });
                    }}
                    value={option.costPrice}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextInput
                    form="ghostForm"
                    label="Store Price"
                    className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                    name="storePrice"
                    width="w-full "
                    onChange={(e) => {
                      setValues((prev) => {
                        const newValues = [...prev];
                        newValues[index].storePrice = e.target.value;
                        return newValues;
                      });
                    }}
                    value={option.storePrice}
                  />
                </div>

                <div className="sm:col-span-2">
                  <TextInput
                    form="ghostForm"
                    label="Web Price"
                    className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                    name="webPrice"
                    width="w-full "
                    onChange={(e) => {
                      setValues((prev) => {
                        const newValues = [...prev];
                        newValues[index].webPrice = e.target.value;
                        return newValues;
                      });
                    }}
                    value={option.webPrice}
                  />
                </div>
                <button
                  href={`mailto:${'person.email'}`}
                  className="relative rounded-lg border border-transparent py-4 text-sm font-medium text-primary-light dark:text-primary-dark hover:text-primary-light dark:hover:text-primary-dark hover:bg-color-light dark:hover:bg-color-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-secondary-light dark:bg-secondary-dark"
                  type="button"
                  onClick={() => {
                    handleDelete(option);
                  }}
                >
                  <span
                    type="button"
                    className=" text-primary-light dark:text-primary-dark "
                  >
                    Delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
