export default function SkeletonImage() {
  return (
    // Tailwind image skeleton
    <div className="animate-pulse">
      <div className="flex flex-col">
        <div className="h-64 bg-gray-300 rounded-md"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
}
