import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl font-display font-bold gold-text mb-4">404</div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="px-6 py-3 gold-gradient text-white font-semibold rounded-xl hover:shadow-md transition-all">
            Go Home
          </Link>
          <Link href="/biodata" className="px-6 py-3 border border-border text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all">
            Create Biodata
          </Link>
        </div>
      </div>
    </div>
  );
}
