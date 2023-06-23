'use client';
import React, { useState, useEffect } from 'react';
import TextInput from '@/components/ui/inputs/TextInput';
import ImageInput from '@/components/ui/inputs/ImageInput';
import MultipleImageInput from '@/components/ui/inputs/MultipleImageInput';
import SelectInput from '@/components/ui/inputs/SelectInput';
import TextArea from '@/components/ui/inputs/TextArea';
import ServerForm from '@/components/ui/forms/ServerForm';
import AddEditProductVariation from '@/components/partials/product/AddEditProductVariation';

import { vat } from '@/constants/setting';
import Badge from '@/components/ui/Badge';

export default function SetPrices({ tax = false, form }) {
  const [costPrice, setCostPrice] = useState(0);
  const [storeMargin, setStoreMargin] = useState(0);
  const [storePrice, setStorePrice] = useState(0);
  const [webMargin, setWebMargin] = useState(0);
  const [webPrice, setWebPrice] = useState(0);
  const [saleTax, setSaleTax] = useState(0);

  const calcPrices = () => {
    const webMultiplier = 1 + webMargin / 100;
    const storeMultiplier = 1 + storeMargin / 100;
    setStorePrice(costPrice * storeMultiplier * (1 + saleTax / 100));
    setWebPrice(costPrice * webMultiplier * (1 + saleTax / 100));
  };
  useEffect(() => {
    if (tax) {
      const taxNumber = vat[tax];
      setSaleTax(vat[tax]);
    } else {
      setSaleTax(vat.VAT_27);
    }
  }, [tax]);

  const roundPrices = () => {
    // Define margin
    const margin = 20;

    // Calculate rounded Store Price
    let roundedStorePrice = Math.floor(storePrice / 10) * 10;
    if (roundedStorePrice % 100 < 70) {
      roundedStorePrice = roundedStorePrice - (roundedStorePrice % 100) + 90;
    } else if (roundedStorePrice % 100 >= 70 && roundedStorePrice % 100 < 90) {
      roundedStorePrice = roundedStorePrice - (roundedStorePrice % 100) + 90;
    } else {
      roundedStorePrice = roundedStorePrice - (roundedStorePrice % 100) + 190;
    }

    // Calculate rounded Web Price
    let roundedWebPrice = Math.floor(webPrice / 10) * 10;
    if (roundedWebPrice % 100 < 70) {
      roundedWebPrice = roundedWebPrice - (roundedWebPrice % 100) + 90;
    } else if (roundedWebPrice % 100 >= 70 && roundedWebPrice % 100 < 90) {
      roundedWebPrice = roundedWebPrice - (roundedWebPrice % 100) + 90;
    } else {
      roundedWebPrice = roundedWebPrice - (roundedWebPrice % 100) + 190;
    }

    // Set the new rounded Store and Web Prices
    setStorePrice(roundedStorePrice);
    setWebPrice(roundedWebPrice);
  };
  function calcGross(price, vat) {
    return price * (1 + vat / 100);
  }
  function calcNetPrice(price, vat) {
    return price / (1 + vat / 100);
  }
  function calcIncomeFromGrossPrice(price, vat) {
    price - calcNetPrice(price, vat);
    return costPrice - price;
  }

  return (
    <div className=" grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 rounded-md bg-primary-light dark:bg-primary-dark p-4">
      <div className="sm:col-span-3">
        <div className="flex pt-1 ">
          <div>
            <label
              htmlFor="storeMargin"
              className="block text-sm font-medium text-primary-light dark:text-primary-dark"
            >
              Cost Price + margins
            </label>
            <input
              form={form}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-primary-light h-10 dark:bg-primary-dark rounded-l-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark"
              type="number"
              name="costPrice"
              width="w-full "
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="storeMargin"
              className="block text-sm font-medium text-primary-light dark:text-primary-dark"
            >
              Store
            </label>
            <input
              form="ghostForm"
              name="storeMargin"
              //   remove html number input arrows
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-14 h-10 bg-primary-light dark:bg-primary-dark  border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark"
              type="text"
              value={storeMargin}
              onChange={(e) => setStoreMargin(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="webMargin"
              className="block text-sm font-medium text-primary-light dark:text-primary-dark"
            >
              Web
            </label>
            <input
              form="ghostForm"
              name="webMargin"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-14 h-10 bg-primary-light dark:bg-primary-dark  border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark"
              type="text"
              value={webMargin}
              onChange={(e) => setWebMargin(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="sm:col-span-1">
        <TextInput
          form={form}
          label="Store Price"
          type="number"
          name="storePrice"
          width="w-full"
          value={storePrice}
          onChange={(e) => setStorePrice(e.target.value)}
        />
        <div className="">
          <span>
            <span className="inline-flex items-center rounded-full py-0.5 px-2  text-xs font-medium bg-color-light dark:bg-color-dark text-primary-light dark:text-primary-dark">
              {`Net.: ${storePrice - Math.round(calcNetPrice(storePrice, saleTax))}`}
            </span>
          </span>
          <span>
            <span className="inline-flex items-center rounded-full py-0.5 px-2  text-xs font-medium bg-color-light dark:bg-color-dark text-primary-light dark:text-primary-dark">
              {`Rev.: ${Math.round(
                Math.round(calcNetPrice(storePrice, saleTax) - costPrice)
              )}`}
            </span>
          </span>
        </div>
      </div>

      <div className="sm:col-span-1">
        <TextInput
          form={form}
          label="Web Price"
          type="number"
          name="webPrice"
          width="w-full"
          value={webPrice}
          onChange={(e) => setWebPrice(e.target.value)}
        />
        <div className="">
          <span>
            <span className="inline-flex items-center rounded-full py-0.5 px-2  text-xs font-medium bg-color-light dark:bg-color-dark text-primary-light dark:text-primary-dark">
              {`Net.: ${webPrice - Math.round(calcNetPrice(webPrice, saleTax))}`}
            </span>
          </span>
          <span>
            <span className="inline-flex items-center rounded-full py-0.5 px-2  text-xs font-medium bg-color-light dark:bg-color-dark text-primary-light dark:text-primary-dark">
              {`Rev.: ${Math.round(
                Math.round(calcNetPrice(webPrice, saleTax) - costPrice)
              )}`}
            </span>
          </span>
        </div>
      </div>

      <div className="sm:col-span-1">
        <div className="relative flex items-start  pt-6">
          <button
            type="button"
            onClick={calcPrices}
            className="bg-teal-light dark:bg-teal-dark text-primary-light dark:text-primary-dark px-4 py-2 rounded-md focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
          >
            Calculate
          </button>
        </div>
        <div className="relative flex items-start pt-6">
          <button
            onClick={roundPrices}
            type="button"
            className="bg-teal-light dark:bg-teal-dark text-primary-light dark:text-primary-dark px-4 py-2 rounded-md focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
          >
            Round up
          </button>
        </div>
      </div>
    </div>
  );
}
