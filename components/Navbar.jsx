"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { PlusCircle, Home, Star, Menu, X, BookOpen } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full bg-indigo-500 text-white dark:bg-indigo-600">
      <nav className="mx-auto max-w-6xl px-4 md:px-8 py-5 flex flex-wrap items-center justify-between relative">
        {/* logo */}
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

          <ThemeToggle />
        </div>

        {/* Mobile menu button and theme toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="focus:outline-none hover:text-indigo-200 transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown - NOW POSITIONED CORRECTLY */}
        {isOpen && (
          <div className="absolute md:hidden top-full left-0 right-0 bg-indigo-500 dark:bg-indigo-600 border-t border-indigo-400 dark:border-indigo-700 z-50">
            <Link
              href="/add-api"
              className="flex items-center px-4 py-3 border-b border-indigo-400 dark:border-indigo-700 hover:bg-indigo-600 dark:hover:bg-indigo-700 transition"
              onClick={() => setIsOpen(false)}
            >
              <PlusCircle className="w-5 h-5 mr-3" />
              <span>Add your API</span>
            </Link>

            <Link
              href="/"
              className="flex items-center px-4 py-3 border-b border-indigo-400 dark:border-indigo-700 hover:bg-indigo-600 dark:hover:bg-indigo-700 transition"
              onClick={() => setIsOpen(false)}
            >
              <Home className="w-5 h-5 mr-3" />
              <span>Home</span>
            </Link>

            <Link
              href="/favorites"
              className="flex items-center px-4 py-3 border-b border-indigo-400 dark:border-indigo-700 hover:bg-indigo-600 dark:hover:bg-indigo-700 transition"
              onClick={() => setIsOpen(false)}
            >
              <Star className="w-5 h-5 mr-3" />
              <span>Favorites</span>
            </Link>

            <Link
              href="/library"
              className="flex items-center px-4 py-3 hover:bg-indigo-600 dark:hover:bg-indigo-700 transition"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="w-5 h-5 mr-3" />
              <span>Library</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
