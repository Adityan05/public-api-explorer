// app/not-found.jsx
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="text-8xl md:text-9xl font-bold text-gray-400 dark:text-gray-400 mb-8">
          404
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Page not found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you were searching for does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Home className="w-4 h-4" />
          Go to home
        </Link>
      </div>
    </div>
  );
}
