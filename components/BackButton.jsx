"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ href, text = "Go Back" }) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium mb-4 cursor-pointer hover:underline"
    >
      <ArrowLeft className="w-4 h-4" />
      {text}
    </button>
  );
};

export default BackButton;
