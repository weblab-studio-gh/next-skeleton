'use client';
'use client';
import { ExclamationCircleIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function SmallNumberInput({
  value: quantity,
  onChange: setQuantity,
  placeholder,
  defaultValue = false,
  name,
  onKeyDown,
  label,
  width = '',
  autoComplete = 'off',
  focus = false,
  error = false,
  disabled = false,
  required = false,
  hidden = false,
  readonly = false,
  onSubmit,
  form,
}) {
  // const [quantity, setQuantity] = useState(value || defaultValue || 0);
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleQuantityIncrement = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleQuantityDecrement = () => {
    handleQuantityChange(quantity - 1);
  };

  const getClasses = () => {
    if (disabled) {
      return 'bg-primary-light opacity-60 border-secondary-light dark:border-secondary-dark dark:bg-primary-dark  px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark';
    } else if (error) {
      return 'block w-full  border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';
    } else {
      return 'bg-primary-light dark:bg-primary-dark  border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark ';
    }
  };

  return (
    <div className="flex items-center">
      {label && (
        <label
          className="block text-sm font-medium text-primary-light dark:text-primary-dark"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="relative  rounded-md shadow-sm flex items-center">
        <button
          type="button"
          onClick={handleQuantityDecrement}
          disabled={disabled || quantity <= 0}
          className="bg-primary-light w-12 h-12 dark:bg-primary-dark hover:bg-teal-light dark:hover:bg-teal-dark  text-primary-light dark:text-primary-dark hover:text-primary-dark hover:dark:text-primary-light transition-colors rounded-l-md px-2 py-1 focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark"
        >
          <MinusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <input
          form={form}
          onSubmit={onSubmit}
          readOnly={readonly}
          hidden={hidden}
          defaultValue={defaultValue}
          required={required}
          autoFocus={focus}
          autoComplete={autoComplete}
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          onKeyDown={onKeyDown}
          className={
            getClasses() +
            ' invalid:animate-pulse flex justify-center items-center dark:invalid:border-error-dark invalid:border-error-light w-16 h-12 text-3xl font-bold' +
            width
          }
        />
        <button
          type="button"
          onClick={handleQuantityIncrement}
          disabled={disabled}
          className="bg-primary-light w-12 h-12 dark:bg-primary-dark hover:bg-teal-light dark:hover:bg-teal-dark  text-primary-light dark:text-primary-dark hover:text-primary-dark hover:dark:text-primary-light transition-colors rounded-r-md px-2 py-1 focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      <p className="mt-2 text-sm text-red-600" id="email-error">
        {error}
      </p>
    </div>
  );
}
