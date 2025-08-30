"use client";
import Image from "next/image";

const LoadingSpinner = ({ src = "/loader.png", size = 48, speed = 1.2 }) => (
  <div
    className="flex items-center justify-center"
    style={{ width: size, height: size, animationDuration: `${speed}s` }}
  >
    <Image
      src={src}
      alt="Loading…"
      width={size}
      height={size}
      priority
      className="animate-spin object-contain dark:invert"
    />
  </div>
);

export default LoadingSpinner;
