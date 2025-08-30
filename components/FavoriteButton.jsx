"use client";

import { useState, useEffect, useRef } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useReward } from "partycles";

const FavoriteButton = ({ apiData }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const ref = useRef(null);
  const { reward: burst } = useReward(ref, "hearts", {
    elementCount: 7,
    spread: 10,
    elementSize: 5,
    lifetime: 80,
    colors: ["#ef4444"],
  });

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favs.some((f) => f.slug === apiData.slug));
  }, [apiData.slug]);

  const handleToggle = () => {
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      favs = favs.filter((f) => f.slug !== apiData.slug);
      setIsFavorite(false);
    } else {
      favs.push(apiData);
      setIsFavorite(true);
      burst();
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
    window.dispatchEvent(new Event("favorites-updated"));
  };

  return (
    <button
      ref={ref}
      onClick={handleToggle}
      className="group/heart p-2 rounded-full transition-all duration-200
                 hover:bg-gray-100 dark:hover:bg-slate-700/50
                 active:scale-95"
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <HeartSolid className="w-5 h-5 text-red-500 group-hover/heart:scale-110 transition-transform" />
      ) : (
        <HeartOutline
          className="w-5 h-5 text-gray-400 dark:text-slate-500 
                                group-hover/heart:text-red-500 group-hover/heart:scale-110 
                                transition-all"
        />
      )}
    </button>
  );
};

export default FavoriteButton;
