export default function ServerForm({ children, action, content, alternativeAction }) {
  return (
    <div className="space-y-8  ">
      <div className="flex justify-between pt-8">
        <h3 className="text-3xl pb-2 font-medium  text-secondary-light dark:text-secondary-dark">
          {content.title}
        </h3>
      </div>
      <form
        action={action}
        className="space-y-8 divide-y divide-primary-light  dark:divide-primary-dark"
      >
        <div className="space-y-8 divide-y py-8">
          <div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {children}
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-center">
            <button
              type="submit"
              className="m-4 w-full transition-colors shadow-sm  inline-flex justify-center rounded-md border border-transparent bg-primary-light dark:bg-primary-dark py-2 px-4 text-sm font-medium text-primary-light dark:text-primary-dark shadow-sm hover:bg-color-light dark:hover:bg-color-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <form type="hidden" className="hidden absolute" id="ghostForm" />
      <form
        type="hidden"
        className="hidden absolute"
        id="alternativeForm"
        action={alternativeAction}
      />
    </div>
  );
}
