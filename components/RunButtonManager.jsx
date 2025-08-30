// components/RunButtonManager.jsx
"use client";
import React, { useState } from "react";
import ApiTester from "@/components/apitester";
import { Copy, Check, Play } from "lucide-react";

const RunButtonManager = ({ api }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [testerUrl, setTesterUrl] = useState(""); // This manages the URL for ApiTester

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const runEndpoint = (fullUrl) => {
    setTesterUrl(fullUrl); // Update the tester URL
    // Scroll to API tester
    setTimeout(() => {
      document.getElementById("api-tester")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <>
      {/* Popular Endpoints Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-indigo-600 dark:bg-indigo-400 rounded"></span>
          Popular Endpoints
        </h2>
        <div className="space-y-4">
          {api.endpoints.map((endpoint, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Endpoint Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 text-xs font-medium px-2 py-1 rounded">
                      GET
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {endpoint.description}
                    </span>
                  </div>
                  <code className="text-sm font-mono text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded block break-all">
                    {api.apiBaseUrl}
                    {endpoint.path}
                  </code>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${api.apiBaseUrl}${endpoint.path}`,
                        index
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    title="Copy URL"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      runEndpoint(`${api.apiBaseUrl}${endpoint.path}`)
                    }
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 transition"
                    title="Run endpoint"
                  >
                    <Play className="w-3 h-3" />
                    Run
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Tester Section */}
      <section className="mt-12">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
          Live Tester
        </h2>
        <div id="api-tester">
          <ApiTester runUrl={testerUrl} corsSupported={api.cors} />
        </div>
      </section>
    </>
  );
};

export default RunButtonManager;
