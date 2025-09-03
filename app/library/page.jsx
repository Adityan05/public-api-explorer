"use client";

import { useState, useEffect } from "react";
import APICard from "@/components/APICard";
import BackButton from "@/components/BackButton";
import { Search, BookOpen } from "lucide-react";
import { getAllApis } from "@/utils/apiConfig";

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [allApis, setAllApis] = useState([]);
  const [filteredAPIs, setFilteredAPIs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);

  // Fetch all APIs once
  useEffect(() => {
    const fetchApis = async () => {
      try {
        const apis = await getAllApis();
        setAllApis(apis);
        setFilteredAPIs(apis);
      } catch (error) {
        console.error("Error fetching APIs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApis();
  }, []);

  // Debounce search input - 300ms delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setVisibleCount(9); // Reset visible count on new search
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Filter APIs based on debounced search term
  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredAPIs(allApis);
    } else {
      const lowerTerm = debouncedSearchTerm.toLowerCase();
      setFilteredAPIs(
        allApis.filter(
          (api) =>
            api.name.toLowerCase().includes(lowerTerm) ||
            api.description.toLowerCase().includes(lowerTerm) ||
            api.tags?.some((tag) => tag.toLowerCase().includes(lowerTerm))
        )
      );
    }
  }, [debouncedSearchTerm, allApis]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 1000 &&
        visibleCount < filteredAPIs.length
      ) {
        setVisibleCount((prev) => Math.min(prev + 9, filteredAPIs.length));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleCount, filteredAPIs.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">
          Loading API library...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        {/* Back to Home button */}
        <div className="mt-6 mb-6">
          <BackButton text="Back to Home" href="/" />
        </div>

        {/* Sticky header with API Library and search */}
        <div className="sticky top-0 bg-gray-50 dark:bg-gray-900 z-20 py-4 border-b border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            <div className="flex items-center space-x-2 order-1 w-full md:w-auto justify-center md:justify-start">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl md:text-2xl font-semibold">API Library</h1>
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 ml-2">
                ({filteredAPIs.length} API{filteredAPIs.length !== 1 ? "s" : ""}
                )
              </span>
            </div>

            <div className="relative order-2 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search APIs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg pl-9 md:pl-10 pr-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent w-full md:w-80 text-sm md:text-base"
              />
            </div>
          </div>
        </div>

        {/* Results section */}
        {filteredAPIs.length === 0 && debouncedSearchTerm ? (
          <div className="text-center py-12 mb-10">
            <div className="text-gray-500 dark:text-gray-400 mb-4 text-sm md:text-base">
              No APIs found matching "{debouncedSearchTerm}"
            </div>
            <button
              onClick={() => setSearchTerm("")}
              className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm md:text-base"
            >
              Clear search
            </button>
          </div>
        ) : (
          /* API Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 sm:gap-6 mb-12 px-3 sm:px-0">
            {filteredAPIs.slice(0, visibleCount).map((api) => (
              <APICard
                key={api.slug}
                image={api.image}
                name={api.name}
                description={api.description}
                bgGradient={api.bgGradient}
                isLogo={api.isLogo}
                slug={api.slug}
                https={api.https}
                cors={api.cors}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
