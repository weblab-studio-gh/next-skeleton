export default function CheckboxInput({
  value,
  onChange,
  disabled = false,
  checked = false,
  onClick,
}) {
  return (
    <input
      type="checkbox"
      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-primary-light dark:border-primary-dark text-color-light dark:text-color2-dark focus:ring-primary-light dark:focus:ring-primary-dark sm:left-6"
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      onClick={onClick}
    />
  );
}
