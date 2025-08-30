import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "PublicAPI Explorer",
  description: "Explore public API's from various organizations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={workSans.className}>
      <body className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="h-[10vh]">
          <Navbar />
        </div>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
