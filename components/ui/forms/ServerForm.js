export default function ServerForm({ children, action, content }) {
  return (
    <form
      action={action}
      className="space-y-8 divide-y divide-primary-light  dark:divide-primary-dark"
    >
      <div className="space-y-8 divide-y py-8">
        <div>
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-secondary-light dark:text-secondary-dark">
                {content.title}
              </h3>
              <p className="mt-1 text-sm text-primary-light dark:text-primary-dark">
                {content.description}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {children}
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-color-light dark:bg-color-dark py-2 px-4 text-sm font-medium text-primary-light dark:text-primary-dark shadow-sm hover:bg-secondary-light dark:hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
