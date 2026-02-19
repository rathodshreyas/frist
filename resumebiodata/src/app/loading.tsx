export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-xl w-64 mx-auto skeleton" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto skeleton" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl skeleton" />
        ))}
      </div>
    </div>
  );
}
