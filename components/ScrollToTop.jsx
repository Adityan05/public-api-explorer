"use client";

import { useEffect } from "react";

const ScrollToTop = ({ children }) => {
  useEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0);

    // Disable scroll restoration
    if (
      typeof window !== "undefined" &&
      "scrollRestoration" in window.history
    ) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return <>{children}</>;
};

export default ScrollToTop;
