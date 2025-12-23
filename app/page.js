import APICard from "@/components/APICard";
import { getTopApis } from "@/utils/apiConfig"; // Use new function
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Main = async () => {
  const apis = await getTopApis(6); // Get top 6 APIs by score

  return (
    <>
      <HeroSection />
      <div
        id="api-grid"
        className="px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto bg-gray-50 dark:bg-gray-900"
      >
        {apis.map((api) => (
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
            accessType={api.accessType}
          />
        ))}
      </div>

      {/* Explore All button */}
      <div className="flex justify-center mt-8 mb-12">
        <Link href="/library">
          <button className="flex items-center space-x-3 bg-indigo-500 dark:bg-indigo-800 text-white px-10 py-3 rounded-lg font-semibold transition duration-200 hover:bg-indigo-600 dark:hover:bg-indigo-900 hover:shadow-lg active:scale-95 active:bg-indigo-800 cursor-pointer">
            <span>Explore All APIs</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </>
  );
};
export const revalidate = 10800; // 3 hours in seconds (3 * 60 * 60)

export default Main;
