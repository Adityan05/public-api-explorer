// import Link from "next/link";
// import Image from "next/image";
// import ThemeToggle from "./ThemeToggle";
// import { PlusCircle } from "lucide-react";

// const Navbar = () => (
//   <header className="w-full bg-indigo-500 text-white dark:bg-indigo-600 ">
//     <nav className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
//       {/* logo */}
//       <Link href="/" className="flex items-center">
//         <Image
//           src="/publicapilogo-light.png"
//           alt="Public API Explorer"
//           width={120}
//           height={40}
//           className="h-10 w-auto"
//         />
//       </Link>

//       {/* links + dark-mode toggle */}
//       <div className="flex items-center gap-6 text-base md:text-lg font-medium">
//         <Link
//           href="/add-api"
//           className="inline-flex items-center gap-2 text-lg text-white hover:underline transition"
//         >
//           <PlusCircle className="w-5 h-5" />
//           Add your API
//         </Link>

//         <Link href="/" className="hover:text-indigo-200">
//           Home
//         </Link>
//         <Link href="/favorites" className="hover:text-indigo-200">
//           Favorites
//         </Link>

//         <ThemeToggle />
//       </div>
//     </nav>
//   </header>
// );

// export default Navbar;
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { PlusCircle, Home, Star } from "lucide-react";

const Navbar = () => (
  <header className="w-full bg-indigo-500 text-white dark:bg-indigo-600 ">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-8 py-5">
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

      {/* links + dark-mode toggle */}
      <div className="flex items-center gap-4 md:gap-6 text-base md:text-lg font-medium">
        <Link
          href="/add-api"
          className="inline-flex items-center gap-2 text-lg text-white hover:underline transition"
        >
          <PlusCircle
            className="w-5 h-5 md:hidden"
            aria-label="Add your API"
            title="Add your API"
          />
          <span className="hidden md:inline">Add your API</span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-indigo-200"
        >
          <Home className="w-5 h-5 md:hidden" aria-label="Home" title="Home" />
          <span className="hidden md:inline">Home</span>
        </Link>

        <Link
          href="/favorites"
          className="inline-flex items-center gap-1 hover:text-indigo-200"
        >
          <Star
            className="w-5 h-5 md:hidden"
            aria-label="Favorites"
            title="Favorites"
          />
          <span className="hidden md:inline">Favorites</span>
        </Link>

        <ThemeToggle />
      </div>
    </nav>
  </header>
);

export default Navbar;
