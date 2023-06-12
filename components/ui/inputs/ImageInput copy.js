"use client";
export default function ImageInput({
  onChange,
  label,
  multiple = false,
  name,
}) {
  const handleChange = (e) => {
    const files = {
      files: e.target.files,
      url: URL.createObjectURL(e.target.files[0]),
    };
    onChange({ target: { name: name, value: files } });
  };
  return (
    <div className="sm:col-span-6">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium text-primary-light dark:text-primary-dark"
      >
        {label}
      </label>
      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-primary-light dark:border-primary-dark px-6 pt-5 pb-6">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-primary-light dark:text-primary-dark"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-primary-light dark:text-primary-dark">
            <label
              htmlFor="file-upload"
              className="p-2 relative cursor-pointer rounded-md  bg-primary-light dark:bg-primary-dark font-medium text-secondary-light dark:text-secondary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-light dark:focus-within:ring-primary-dark focus-within:ring-offset-2 hover:text-color-light dark:hover:text-color-dark"
            >
              <span>Upload files</span>
              <input
                id="file-upload"
                type="file"
                className="sr-only"
                onChange={handleChange}
                name="image"
                multiple={multiple}
              />
            </label>
            <p className="pl-2 p-2">or drag and drop</p>
          </div>
          <p className="text-xs text-primary-light dark:text-primary-dark">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
}
