"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import APICard from "@/components/APICard";
import { Heart, ArrowLeft } from "lucide-react";

const FavoritesPage = () => {
  const [favoriteAPIs, setFavoriteAPIs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteAPIs(stored);
    setLoading(false);
  }, []);

  useEffect(() => {
    const refresh = () => {
      const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavoriteAPIs(stored);
    };

    window.addEventListener("favorites-updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("favorites-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const clearAllFavorites = () => {
    if (confirm("Are you sure you want to remove all favourites?")) {
      localStorage.setItem("favorites", "[]");
      setFavoriteAPIs([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">
            Loading your favourites…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium mb-4 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100  rounded-full">
                <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400 fill-current" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Your Favourites
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {favoriteAPIs.length} API
                  {favoriteAPIs.length !== 1 ? "s" : ""} saved
                </p>
              </div>
            </div>

            {favoriteAPIs.length > 0 && (
              <button
                onClick={clearAllFavorites}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 font-medium"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {favoriteAPIs.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-400 dark:text-gray-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No favourites yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Start exploring APIs and click the heart icon to save your
              favourites here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Explore APIs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteAPIs.map((api) => (
              <APICard key={api.slug} {...api} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
