import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function TextInput({
  value,
  onChange,
  placeholder,
  defaultValue,
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
  type = 'text',
}) {
  const getClasses = () => {
    if (disabled) {
      return 'bg-primary-light opacity-60 border-secondary-light dark:border-secondary-dark dark:bg-primary-dark rounded-md px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark';
    } else if (error) {
      return 'block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';
    } else {
      return 'bg-primary-light dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark ';
    }
  };

  return (
    <div>
      {label && (
        <label
          className="block text-sm font-medium text-primary-light dark:text-primary-dark"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          form={form}
          onSubmit={onSubmit}
          readOnly={readonly}
          hidden={hidden}
          defaultValue={defaultValue}
          required={required}
          autoFocus={focus}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          onKeyDown={onKeyDown}
          className={
            getClasses() +
            ' invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light ' +
            width
          }
          type={type}
        />

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
