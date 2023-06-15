'use client';
import React, { useState, useEffect, useRef } from 'react';
import TextInput from '@/components/ui/inputs/TextInput';
import SelectInput from '@/components/ui/inputs/SelectInput';
import { PlusIcon } from '@heroicons/react/20/solid';
import { Transition } from '@headlessui/react';

export default function AddEditProductVariation({ variations }) {
  const initial = {
    variationId: '',
    attributeId: '',
    data: {
      name: '',
      price: '',
      quantity: '',
      sku: '',
      barcode: '',
    },
  };
  const [newVariations, setNewVariations] = useState();
  // const [variation, setVariation] = useState();
  // const [attribute, setAttribute] = useState();
  const [values, setValues] = useState([initial]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('values', values);
  }, [values]);

  return (
    <div className="dark:divide-secondary-dark bg-primary-light dark:bg-primary-dark overflow-hidden rounded-lg  shadow mt-6` divide-y  divide-secondary-light">
      <div className="px-4 py-5 sm:px-6 sm:col-span-6">
        <h2 className="text-center">Product Variations</h2>
      </div>
      <input type="hidden" name="variationValues" value={JSON.stringify(values)} />

      {/* {renderComponentCountTimes()}*/}

      {values.map((value, index) => {
        return (
          <div key={index}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 ">
              <div className="sm:col-span-3 px-4 py-5 sm:p-6">
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
                      console.log('newValues', newValues);
                      return newValues;
                    });
                  }}
                  value={values[index].variationId}
                />
              </div>
              <div className="sm:col-span-3 px-4 py-5 sm:p-6">
                {values[index].variationId !== '' && (
                  <SelectInput
                    form="ghostForm"
                    label="Attribute"
                    className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                    name="attribute"
                    options={
                      variations.find((v) => v.id === values[index].variationId)
                        ?.variationOptions
                    }
                    width="w-full "
                    value={values[index].attributeId}
                    onChange={(e) => {
                      setValues((prev) => {
                        const newValues = [...prev];
                        newValues[index].attributeId = e.target.value;
                        console.log('newValues', newValues);
                        return newValues;
                      });
                    }}
                  />
                )}
              </div>
            </div>
            <Transition
              show={values[index].attributeId && values[index].variationId ? true : false}
              className="overflow-hidden "
              enter="transition transition-[height] duration-400 ease-in"
              enterFrom="transform h-0"
              enterTo={`transform lg:h-[300px] h-[600px] `}
              leave="transition transition-[height] duration-400 ease-out"
              leaveFrom={`transform h-[300px] `}
              leaveTo="transform h-0"
            >
              {values[index].attributeId && values[index].variationId && (
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 px-4 py-5 sm:p-6">
                  {/* <div className="  mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 px-4 py-5 sm:p-6"> */}
                  <div className="sm:col-span-2">
                    <TextInput
                      form="ghostForm"
                      label="Name"
                      className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                      name="variationName"
                      width="w-full "
                      onChange={(e) => {
                        setValues((prev) => {
                          const newValues = [...prev];
                          newValues[index].data.name = e.target.value;
                          return newValues;
                        });
                      }}
                      value={values[index].data.name}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <TextInput
                      form="ghostForm"
                      label="Price"
                      className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                      name="variationPrice"
                      width="w-full "
                      onChange={(e) => {
                        setValues((prev) => {
                          const newValues = [...prev];
                          newValues[index].data.price = e.target.value;
                          return newValues;
                        });
                      }}
                      value={values[index].data.price}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <TextInput
                      form="ghostForm"
                      label="Quantity"
                      className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                      name="variationQuantity"
                      width="w-full "
                      value={values[index].data.quantity}
                      onChange={(e) => {
                        setValues((prev) => {
                          const newValues = [...prev];
                          newValues[index].data.quantity = e.target.value;
                          return newValues;
                        });
                      }}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <TextInput
                      form="ghostForm"
                      label="Barcode"
                      className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                      name="variationBarcode"
                      onChange={(e) => {
                        setValues((prev) => {
                          const newValues = [...prev];
                          newValues[index].data.barcode = e.target.value;
                          return newValues;
                        });
                      }}
                      width="w-full "
                      value={values[index].data.barcode}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <TextInput
                      form="ghostForm"
                      label="SKU"
                      className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                      name="variationSku"
                      width="w-full "
                      onChange={(e) => {
                        setValues((prev) => {
                          const newValues = [...prev];
                          newValues[index].data.sku = e.target.value;
                          return newValues;
                        });
                      }}
                      value={values[index].data.sku}
                    />
                  </div>
                </div>
              )}
            </Transition>
          </div>
        );
      })}

      <div className="px-4 py-5 sm:px-6 sm:col-span-6 ">
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            {values.length > 0 ? (
              <>
                <button
                  type="button"
                  onClick={() => setValues([...values, initial])}
                  className="bg-secondary-light mx-2 dark:bg-secondary-dark text-primary-light dark:text-primary-dark inline-flex items-center rounded-full border border-primary-light dark:border-primary-dark px-4 py-1.5 text-sm font-medium leading-5 shadow-sm hover:bg-primary-light dark:hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2"
                >
                  <PlusIcon
                    className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Add new</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setValues(values.filter((_, i) => i !== values.length - 1))
                  }
                  className="bg-secondary-light mx-2 dark:bg-secondary-dark text-primary-light dark:text-primary-dark inline-flex items-center rounded-full border border-primary-light dark:border-primary-dark px-4 py-1.5 text-sm font-medium leading-5 shadow-sm hover:bg-primary-light dark:hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2"
                >
                  <PlusIcon
                    className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Remove</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setValues([...values, initial])}
                className="bg-secondary-light dark:bg-secondary-dark text-primary-light dark:text-primary-dark inline-flex items-center rounded-full border border-primary-light dark:border-primary-dark px-4 py-1.5 text-sm font-medium leading-5 shadow-sm hover:bg-primary-light dark:hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2"
              >
                <PlusIcon
                  className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Add new</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
