import React from "react";

export default function TextInput({
  placeholder,
  name,
  label,
  rows = 3,
  disabled = false,
  width = "",
  required = false,
  defaultValue,
}) {
  return (
    <>
      <label className="block text-sm font-medium text-primary-light dark:text-primary-dark">
        {label}
      </label>
      <textarea
        className="bg-primary-light w-full dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
        type="text"
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        width={width}
        required={required}
      />
    </>
  );
}
