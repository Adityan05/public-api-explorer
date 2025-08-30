"use client";

import React from "react";
import { Code, Zap, Globe } from "lucide-react";

const HeroSection = () => {
  const scrollToAPIs = () => {
    const element = document.getElementById("api-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          Explore Public APIs with{" "}
          <span className="text-indigo-600 dark:text-indigo-400">Ease</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Discover, test, and integrate popular public APIs in seconds. No setup
          required, no authentication headaches—just clean, working endpoints
          ready for your next project.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Instant Testing
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Click and run API endpoints directly in your browser. See real
              responses instantly.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Copy & Use
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Copy URLs and use them directly in your projects. Perfect for
              prototyping and learning.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Free & Public
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              All APIs featured are free to use and require no authentication.
              Perfect for beginners.
            </p>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={scrollToAPIs}
            className="text-gray-600 dark:text-gray-300 text-xl hover:scale-110 hover:text-gray-700 dark:hover:text-gray-100 transition-all cursor-pointer"
          >
            Start exploring APIs below ↓
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
