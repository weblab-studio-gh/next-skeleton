'use client';
import TextInput from '@/components/ui/inputs/TextInput';
import ImageInput from '@/components/ui/inputs/ImageInput';
import MultipleImageInput from '@/components/ui/inputs/MultipleImageInput';
import SelectInput from '@/components/ui/inputs/SelectInput';
import TextArea from '@/components/ui/inputs/TextArea';
import ServerForm from '@/components/ui/forms/ServerForm';
import AddEditProductVariation from '@/components/partials/product/AddEditProductVariation';
import AutoComplete from '@/components/ui/inputs/AutoComplete';
import SmallNumberInput from '@/components/ui/inputs/SmallNumberInput';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { EnvelopeIcon, PhoneIcon, ShoppingCartIcon } from '@heroicons/react/20/solid';
import { Fragment, useState, useEffect } from 'react';
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  CalendarIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
  MapIcon,
  MegaphoneIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Teams', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Directory', href: '#', icon: MagnifyingGlassCircleIcon, current: false },
  { name: 'Announcements', href: '#', icon: MegaphoneIcon, current: false },
  { name: 'Office Map', href: '#', icon: MapIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AddOrder({ products, user, customer, categories, handleCreate }) {
  const [currentCategory, setCurrentCategory] = useState();
  const [billItems, setBillItems] = useState([]);

  return (
    <div className="flex h-[100vh]">
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="relative z-0 flex flex-1 overflow-hidden">
          <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
            {/* Start main area*/}
            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <div className="h-full rounded-lg  ">
                <CategoryGrid
                  categories={categories}
                  setCurrentCategory={setCurrentCategory}
                />
                <ProductGrid
                  products={products}
                  currentCategory={currentCategory}
                  handleCreate={handleCreate}
                  setBillItems={setBillItems}
                  billItems={billItems}
                />
              </div>
            </div>
            {/* End main area */}
          </main>
          <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto xl:flex xl:flex-col">
            {/* Start secondary column (hidden on smaller screens) */}
            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <div className="h-full rounded-lg  ">
                <Bill
                  customer={customer}
                  user={user}
                  billItems={billItems}
                  setBillItems={setBillItems}
                />
              </div>
            </div>
            {/* End secondary column */}
          </aside>
        </div>
      </div>
    </div>
  );
}
function CategoryGrid({ categories, currentCategory, setCurrentCategory }) {
  const randomColor = () => {
    const colors = [
      'bg-pink-600',
      'bg-purple-600',
      'bg-yellow-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-red-500',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="overflow-x-scroll overflow-y-hidden w-100%">
      <div className="grid  grid-cols-8 w-screen grid-rows-3 gap-4 relative ">
        {categories.map((category, key) => (
          <CategoryGridItem
            key={key}
            category={category}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            randomColor={randomColor}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryGridItem({
  category,
  currentCategory,
  setCurrentCategory,
  randomColor,
}) {
  const [active, setActive] = useState(false);

  const getActive = () => {
    if (currentCategory?.id === category.id) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    getActive();
  }, [currentCategory]);

  return (
    <div className="flex  rounded-md shadow-sm cursor-pointer">
      <div
        onClick={() => setCurrentCategory(category)}
        className={classNames(
          randomColor(),
          'flex-shrink-0 flex items-center justify-center w-16 text-primary.light dark:text-primary-dark text-sm font-medium rounded-l-md'
        )}
      >
        {category.name?.charAt(0)}
      </div>
      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark">
        <div
          onClick={() => setCurrentCategory(category)}
          className="flex-1 truncate px-4 py-2 text-sm"
        >
          <a
            href="#"
            className="font-medium text-primary.light hover:dark:text-primary-dark hover:text-primary-light dark:text-primary-dark"
          >
            {category.name}
          </a>
          <p className="text-primary.light dark:text-primary-dark">
            {category._count.product} Products
          </p>
        </div>
      </div>
    </div>
  );
}

function SubCategoryGrid({ categories }) {}

function ProductGrid({ products, currentCategory, setBillItems, billItems }) {
  return (
    <ul role="list" className="grid my-6 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {currentCategory?.product.map((product, key) => (
        <ProductGridItem
          key={key}
          product={product}
          setBillItems={setBillItems}
          billItems={billItems}
        />
      ))}
    </ul>
  );
}

function ProductGridItem({ product, setBillItems, billItems }) {
  const [quantity, setQuantity] = useState(0);
  const [active, setActive] = useState(false);

  const getActive = () => {
    const index = billItems.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    getActive();
  }, [billItems]);

  const handleAddBillItem = (product, quantity) => {
    if (quantity > 0) {
      // if product is already in billItems, update quantity

      setBillItems((prev) => {
        const index = prev.findIndex((item) => item.product.id === product.id);
        if (index === -1) {
          return [...prev, { product, quantity }];
        } else {
          const newBillItems = [...prev];
          newBillItems[index].quantity = quantity;
          return newBillItems;
        }
      });
    }
  };

  return (
    <li
      className={`col-span-1 transition-colors  divide-y rounded-lg shadow divide-primary-light dark:divide-primary-dark 
    ${
      active
        ? 'bg-primary-light  dark:bg-primary-dark border-2 border-success-light dark:border-success-dark'
        : 'bg-secondary-light dark:bg-secondary-dark'
    }`}
    >
      <div className="flex-shrink-0 pr-2">
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary-light dark:bg-secondary-dark bg-transparent text-primary.light hover:dark:text-primary-dark hover:text-primary-light dark:text-primary-dark "
        >
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="flex w-full items-center justify-between space-x-6 ">
        <div className="flex-1 truncate p-6">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-secondary-light dark:text-secondary-dark">
              {product.name}
            </h3>
          </div>
          <span className="inline-block flex-shrink-0 rounded-full bg-primary-light dark:bg-primary-dark px-2 py-0.5 text-xs font-medium text-primary-light dark:text-primary-dark">
            {product.price} HUF
          </span>
          <span className="inline-block flex-shrink-0 rounded-full bg-primary-light dark:bg-primary-dark px-2 py-0.5 text-xs font-medium text-primary-light dark:text-primary-dark">
            QTY: {product.quantity}
          </span>
        </div>
        <img
          className=" w-16 h-24 object-cover flex-shrink-0"
          src={product.image?.path || '#'}
          alt=""
        />
      </div>
      <div className="">
        <div className="-mt-px flex p-1 justify-between ">
          <div className="flex w-0 flex-1">
            <SmallNumberInput value={quantity} onChange={setQuantity} />
          </div>
          <div className="-ml-px flex items-center justify-end flex-1">
            <button
              onClick={() => handleAddBillItem(product, quantity)}
              className="bg-primary-light flex justify-center items-center w-12 h-12 dark:bg-primary-dark hover:bg-teal-light dark:hover:bg-teal-dark  text-primary-light dark:text-primary-dark hover:text-primary-dark hover:dark:text-primary-light transition-colors rounded-md px-2 py-1 focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark"
            >
              <ShoppingCartIcon
                onClick={() => handleAddBillItem(product, quantity)}
                className="h-5 w-5 text-primary-light dark:text-primary-dark"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function Bill({ billItems, setBillItems }) {
  const getTotal = () => {
    let total = 0;
    billItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  return (
    <div className="mt-16 rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 bg-secondary-light dark:bg-secondary-dark">
      <h2
        id="summary-heading"
        className="text-lg font-medium text-primary-light dark:text-primary-dark"
      >
        Order summary
      </h2>
      <section
        aria-labelledby="summary-heading"
        className="h-[70vh]  flex flex-col justify-between  "
      >
        <dl className="mt-6 divide-y space-y-4">
          {billItems.length > 0 &&
            billItems.map((item, key) => (
              <div key={key} className="flex items-center justify-between pt-2">
                <dt className="text-sm text-primary-light dark:text-primary-dark">
                  {item.product.name} x {item.quantity}
                </dt>
                <dd className="text-md font-medium text-primary-light dark:text-primary-dark">
                  <span className="inline-flex items-center py-0.5 pl-2 pr-0.5 text-xs font-medium rounded-full bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark">
                    ${item.product.price * item.quantity}
                    <button
                      onClick={() => {
                        setBillItems((prev) => prev.filter((_, index) => index !== key));
                      }}
                      type="button"
                      className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center  focus:outline-none rounded-full text-secondary-light dark:text-secondary-dark hover:bg-primary-light dark:hover:bg-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-colors"
                    >
                      <span className="sr-only">Remove small option</span>
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  </span>
                </dd>
              </div>
            ))}

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="flex items-center text-sm text-primary-light dark:text-primary-dark">
              <span>Shipping estimate</span>
              <a
                href="#"
                className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">
                  Learn more about how shipping is calculated
                </span>
                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </dt>
            <dd className="text-sm font-medium text-primary-light dark:text-primary-dark">
              $5.00
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="flex text-sm text-primary-light dark:text-primary-dark">
              <span>Tax estimate</span>
              <a
                href="#"
                className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Learn more about how tax is calculated</span>
                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </dt>
            <dd className="text-sm font-medium text-primary-light dark:text-primary-dark">
              $8.32
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="text-base font-medium text-primary-light dark:text-primary-dark">
              Order total
            </dt>
            <dd className="text-base font-medium text-primary-light dark:text-primary-dark">
              {billItems.length > 0 ? (
                <span className="inline-flex items-center py-0.5 pl-2 pr-0.5 text-xs font-medium rounded-full bg-primary-light dark:bg-primary-dark text-primary-light dark:text-primary-dark">
                  ${getTotal()}
                </span>
              ) : (
                '$0.00'
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Checkout
          </button>
        </div>
      </section>
    </div>
  );
}
