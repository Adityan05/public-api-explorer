"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { PlusCircle, Home, Menu, X, BookOpen, Heart } from "lucide-react";
import GitHubButton from "react-github-btn";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header className="relative overflow-hidden w-full bg-indigo-600 text-white dark:bg-indigo-700">
      {/* Animated gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <div
          className="absolute inset-[-40%] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.4),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.28),transparent_35%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.2),transparent_35%)]"
        />
      </div>

      <nav className="relative mx-auto max-w-6xl px-4 md:px-8 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/publicapilogo-light.png"
            alt="Public API Explorer"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4 md:gap-6 text-base md:text-lg font-medium">
          <Link
            href="/add-api"
            className="inline-flex items-center gap-2 text-lg text-white hover:underline transition"
          >
            <span>Add your API</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-indigo-200 transition"
          >
            <span>Home</span>
          </Link>

          <Link
            href="/favorites"
            className="inline-flex items-center gap-1 hover:text-indigo-200 transition"
          >
            <span>Favorites</span>
          </Link>

          <Link
            href="/library"
            className="inline-flex items-center gap-1 hover:text-indigo-200 transition"
          >
            <span>Library</span>
          </Link>

          <div className="flex items-center">
            <div className="scale-110 transform translate-y-[2px]">
              <GitHubButton
                href="https://github.com/Adityan05/public-api-explorer"
                data-color-scheme="no-preference: light; light: light; dark: dark;"
                data-show-count="true"
                data-size="large"
                aria-label="Star your-repo-name on GitHub"
              >
                Star on GitHub
              </GitHubButton>
            </div>
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="focus:outline-none hover:text-indigo-200 transition-all duration-200 hover:scale-105 z-50 relative"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`w-6 h-6 absolute transition-all duration-300 ease-in-out ${isOpen
                    ? "opacity-0 rotate-90 scale-75"
                    : "opacity-100 rotate-0 scale-100"
                  }`}
              />
              <X
                className={`w-6 h-6 absolute transition-all duration-300 ease-in-out ${isOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-75"
                  }`}
              />
            </div>
          </button>
        </div>

        {/* Full-screen blur backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-md z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Side sliding menu */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-indigo-500/95 dark:bg-indigo-600/95 backdrop-blur-xl border-l border-indigo-400/30 dark:border-indigo-700/30 shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-indigo-400/30 dark:border-indigo-700/30">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-indigo-600/50 dark:hover:bg-indigo-700/50 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Menu items */}
          <div className="px-6 py-8 space-y-1">
            <Link
              href="/add-api"
              className="flex items-center px-4 py-4 text-white rounded-xl hover:bg-indigo-600/50 dark:hover:bg-indigo-700/50 transition-all duration-200 group"
              onClick={() => setIsOpen(false)}
            >
              <PlusCircle className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-lg">Add your API</span>
            </Link>

            <Link
              href="/"
              className="flex items-center px-4 py-4 text-white rounded-xl hover:bg-indigo-600/50 dark:hover:bg-indigo-700/50 transition-all duration-200 group"
              onClick={() => setIsOpen(false)}
            >
              <Home className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-lg">Home</span>
            </Link>

            <Link
              href="/favorites"
              className="flex items-center px-4 py-4 text-white rounded-xl hover:bg-indigo-600/50 dark:hover:bg-indigo-700/50 transition-all duration-200 group"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-lg">Favorites</span>
            </Link>

            <Link
              href="/library"
              className="flex items-center px-4 py-4 text-white rounded-xl hover:bg-indigo-600/50 dark:hover:bg-indigo-700/50 transition-all duration-200 group"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-lg">Library</span>
            </Link>

            {/* GitHub Star Button in Mobile Menu */}
            <div className="px-4 py-4">
              <div className="transform scale-125 origin-left">
                <GitHubButton
                  href="https://github.com/Adityan05/public-api-explorer"
                  data-color-scheme="no-preference: light; light: light; dark: dark;"
                  data-show-count="true"
                  data-size="large"
                  aria-label="Star your-repo-name on GitHub"
                >
                  Star on GitHub
                </GitHubButton>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-indigo-400/30 dark:border-indigo-700/30">
            <div className="text-center text-indigo-200 text-sm">
              PublicAPI Explorer
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
