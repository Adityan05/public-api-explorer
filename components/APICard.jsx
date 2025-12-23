import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import ApiBadge from "./ApiBadge";

const APICard = ({
  image,
  name,
  description,
  bgGradient,
  isLogo = false,
  slug,
  https,
  cors,
  accessType,
}) => {
  const displayImage = image || "/publicapibanner.png";

  return (
    <div
      className="
      group bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden flex flex-col
      transition-all duration-300 ease-out
      hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-indigo-500/10
      will-change-transform relative border border-gray-300/50 dark:border-slate-700/50
    "
    >
      {/* Make the card clickable with an overlay Link */}
      <Link
        href={`/explore/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Explore ${name} API`}
      />

      <div
        className="relative w-full h-44 overflow-hidden"
        style={bgGradient ? { background: bgGradient } : undefined}
      >
        <Image
          src={displayImage}
          alt={`${name} ${isLogo ? "Logo" : ""}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`${
            isLogo ? "object-contain p-2" : "object-cover"
          } rounded-none
            transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]
            transform-gpu scale-105  
            group-hover:grayscale-0 group-hover:brightness-110
          `}
        />

        {/* Subtle dark overlay for images in dark mode */}
        <div className="absolute inset-0 bg-black/0 dark:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-4 flex flex-col flex-1 bg-white dark:bg-slate-800 relative">
        <h2
          className="
          text-lg font-semibold mb-1
          transition-colors duration-300
          group-hover:text-indigo-700 dark:group-hover:text-indigo-400
          text-gray-900 dark:text-slate-100
        "
        >
          {name}
        </h2>

        <p className="text-gray-600 dark:text-slate-300 text-sm leading-5 line-clamp-2 mb-4">
          {description}
        </p>

        <div className="mt-auto pt-1 flex items-center justify-between">
          {/* Left: Favorite button */}
          <div className="relative z-20">
            <FavoriteButton
              apiData={{
                image: displayImage,
                name,
                description,
                slug,
                bgGradient,
                isLogo,
                https,
                cors,
                accessType,
              }}
            />
          </div>

          {/* Right: Badges */}
          <div className="flex gap-2">
            {accessType === "blocked" && <ApiBadge ok={false} label="Issues" />}
            <ApiBadge ok={cors} label="CORS" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default APICard;
