"use client";

import React from "react";
import { Code, Zap, Globe } from "lucide-react";
import LiveInsightsMarquee from "./LiveInsightsMarquee/LiveInsightsMarquee";

const HeroSection = () => {
  const scrollToAPIs = () => {
    const element = document.getElementById("api-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        {/* -------- API Philosophy Intro -------- */}
        <p className="text-sm md:text-base uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
          WHY API?
        </p>

        <h1 className="text-4xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
          The Web Runs on{" "}
          <span className="text-indigo-600 dark:text-indigo-400">APIs</span>
        </h1>

        <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-base md:text-lg mb-10 leading-relaxed">
          Every weather update, location lookup, live counter, and real-time
          insight you see on the modern web is powered by APIs.
        </p>

        {/* -------- Live API Marquee -------- */}
        <div className="mb-24">
          <LiveInsightsMarquee />
        </div>
        <p className="max-w-3xl mx-auto mt-6 text-lg md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
          PublicAPI Explorer lets you find, test, and use public APIs instantly.
          <br />
          No setup. No API keys. Just real APIs and real data.
        </p>

        {/* -------- Existing Feature Cards -------- */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Instant Testing
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Click and run API endpoints directly. See real responses
              instantly.
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
              All APIs featured are public and mostly free to use.
            </p>
          </div>
        </div>

        {/* -------- CTA -------- */}
        <button
          onClick={scrollToAPIs}
          className="text-gray-600 dark:text-gray-300 text-xl hover:scale-110 hover:text-gray-700 dark:hover:text-gray-100 transition-all cursor-pointer"
        >
          Start exploring APIs below ↓
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
