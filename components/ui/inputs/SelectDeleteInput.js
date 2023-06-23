export default function SelectInput({
  label,
  options,
  defaultValue,
  data,
  name,
  required = false,
  multiple = false,
  onChange,
  form,
}) {
  return (
    <>
      <label>{label}</label>
      <select
        form={form}
        name={name}
        required={required}
        className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
        type="text"
        options={options}
        defaultValue={defaultValue}
        multiple={multiple}
        onChange={onChange}
      >
        {!multiple && <option value="">{'Selected: ' + data?.[0].name}</option>}
        {options && options.length > 0
          ? options.map((cat) => (
              <option value={cat.id} key={cat.id} defaultValue={cat.id}>
                {cat.name}
              </option>
            ))
          : null}
      </select>
    </>
  );
}
