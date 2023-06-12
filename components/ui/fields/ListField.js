export default function ListField({ values }) {
  if (values?.length === 0) {
    return <div>N/A</div>;
  } else {
    return (
      <select className="bg-primary-light w-full dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark ">
        {values?.map((value, key) => (
          <option key={key} value={value}>
            {value.name}
          </option>
        ))}
      </select>
    );
  }
}
