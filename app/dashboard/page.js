export default function Page() {
  return (
    <main className="p-4 flex-1 h-[100vh] overflow-x-hidden overflow-y-auto bg-primary-light dark:bg-primary-dark">
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 py-8 -lg shadow  sm:px-6 md:px-8 lg:px-10">
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary-light dark:bg-primary-dark">
            <span className="text-2xl mr-8  font-bold text-primary-light dark:bg-primary-dark">
              👋
            </span>
          </div>
          <h1 className="text-3xl text-center font-bold text-primary-light dark:text-primary-dark">
            Welcome to your Dashboard
          </h1>
        </div>
      </div>
    </main>
  );
}
