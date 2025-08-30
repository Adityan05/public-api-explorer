"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/LoadingSpinner";

// Import themes
import { githubDarkTheme } from "@uiw/react-json-view/githubDark";

import { githubLightTheme } from "@uiw/react-json-view/githubLight";

/* lazy-load JSON viewer */
const JsonView = dynamic(() => import("@uiw/react-json-view"), { ssr: false });

export default function ApiTester({ runUrl = "" }) {
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
    if (runUrl) {
      setUrl(runUrl);
      fetchUrl(runUrl);
    }
  }, [runUrl, fetchUrl]);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchUrl(url);
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 rounded-lg border bg-white dark:bg-gray-800 p-6 shadow-sm">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="flex-1 rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700"
        />
        <button
          type="submit"
          disabled={loading || !url}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {loading ? "Loading…" : "Send"}
        </button>
      </form>

      <div className="relative h-72 overflow-auto rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-xs text-gray-900 dark:text-gray-100">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50/80 dark:bg-gray-900/80">
            <LoadingSpinner src="/loader.png" size={42} />
          </div>
        )}

        {error && !loading && (
          <span className="text-red-600 dark:text-red-400">Error: {error}</span>
        )}

        {response && !loading && (
          <JsonView
            value={response}
            collapsed={2}
            displayDataTypes={false}
            keyName={false}
            style={isDarkMode ? githubDarkTheme : githubLightTheme}
          />
        )}

        {!error && !response && !loading && (
          <span className="text-gray-400 dark:text-gray-500">
            No response yet
          </span>
        )}
      </div>
    </div>
  );
}
