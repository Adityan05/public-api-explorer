import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-950 border-t border-gray-300 dark:border-gray-600">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center text-sm text-gray-800 dark:text-gray-300">
          <p className="flex items-center justify-center gap-1">
            © 2025 PublicAPI Explorer • Built with
            <Heart
              className="w-4 h-4 text-red-500"
              fill="currentColor"
              strokeWidth={0}
            />
            by Adityan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
