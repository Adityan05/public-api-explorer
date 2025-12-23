import React from "react";
import BackButton from "@/components/BackButton";
import RunButtonManager from "@/components/RunButtonManager";
import { BookOpen, ExternalLink } from "lucide-react";
import { getApiBySlug } from "@/utils/apiConfig";
import ScrollToTop from "@/components/ScrollToTop";
import ApiBadge from "@/components/ApiBadge";

const APIDetailsPage = async ({ params }) => {
  const { slug } = await params;
  const api = await getApiBySlug(slug);

  if (!api) {
    return (
      <ScrollToTop>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              API Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The API you're looking for doesn't exist.
            </p>
            <BackButton href="/" text="Back to Home" />
          </div>
        </div>
      </ScrollToTop>
    );
  }

  return (
    <ScrollToTop>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Navigation */}
          <div className="mb-6 flex items-center gap-2">
            <BackButton />
          </div>

          {/* Main Section */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Left side */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                {api.name}
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-xl">
                {api.description}
              </p>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-start md:items-end gap-3 md:min-w-[240px]">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                {api.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-2 py-1 rounded text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
                <ApiBadge ok={api.cors} label="CORS" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <a
                  href={api.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded shadow transition min-w-[140px]"
                >
                  <BookOpen className="w-4 h-4" />
                  See Docs
                </a>
                <a
                  href={api.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-sm font-semibold px-4 py-2 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition min-w-[140px]"
                >
                  <ExternalLink className="w-4 h-4" />
                  Go to Site
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <RunButtonManager api={api} />
        </div>
      </div>
    </ScrollToTop>
  );
};

export default APIDetailsPage;
