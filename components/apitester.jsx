"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { AlertCircle } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

// Import themes
import { githubDarkTheme } from "@uiw/react-json-view/githubDark";
import { githubLightTheme } from "@uiw/react-json-view/githubLight";

/* lazy-load JSON viewer */
const JsonView = dynamic(() => import("@uiw/react-json-view"), { ssr: false });

export default function ApiTester({ runUrl = "", corsSupported = true }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () =>
      document.documentElement.classList.contains("dark");

    setIsDarkMode(checkDarkMode());

    const observer = new MutationObserver(() => {
      setIsDarkMode(checkDarkMode());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const fetchUrl = useCallback(async (target) => {
    if (!target) return;
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(target);
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (runUrl && corsSupported) {
      setUrl(runUrl);
      fetchUrl(runUrl);
    } else if (runUrl && !corsSupported) {
      setUrl(runUrl);
    }
  }, [runUrl, fetchUrl, corsSupported]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!corsSupported) return;
    fetchUrl(url);
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 rounded-lg border bg-white dark:bg-gray-800 p-6 shadow-sm">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className={`flex-1 rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 transition-opacity ${
            !corsSupported ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!corsSupported}
        />
        <button
          type="submit"
          disabled={loading || !url || !corsSupported}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-indigo-300 dark:disabled:bg-indigo-600/50"
        >
          {loading ? "Loading…" : "Send"}
        </button>
      </form>

      <div className="relative h-72 overflow-auto rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-xs text-gray-900 dark:text-gray-100">
        {/* CORS Not Supported Overlay - Enhanced */}
        {!corsSupported && (
          <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-md bg-white/10 dark:bg-gray-900/10 rounded-md">
            <div className="relative">
              {/* Background blur effect */}
              <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl"></div>

              {/* Content */}
              <div className="relative flex flex-col items-center p-6 space-y-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                  <AlertCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>

                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-base text-indigo-600 dark:text-indigo-400">
                    CORS Not Supported
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
                    This API cannot be tested directly in the browser due to
                    CORS restrictions.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Try using a tool like Postman or curl instead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Spinner Overlay */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <LoadingSpinner src="/loader.png" size={42} />
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-4 h-4" />
            <span>Error: {error}</span>
          </div>
        )}

        {/* JSON Response Viewer */}
        {response && !loading && (
          <JsonView
            value={response}
            collapsed={2}
            displayDataTypes={false}
            keyName={false}
            style={isDarkMode ? githubDarkTheme : githubLightTheme}
          />
        )}

        {/* No Response Yet Message */}
        {!error && !response && !loading && (
          <span className="text-gray-400 dark:text-gray-500">
            No response yet
          </span>
        )}
      </div>
    </div>
  );
}
