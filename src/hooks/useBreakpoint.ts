import type { Breakpoint } from "@/types/breakpoint";
import { useEffect, useState } from "react";

// TODO: Update breakpoints to match tailwindcss breakpoints
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const useBreakpoint = (breakpoint: Breakpoint) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setMatches(width > breakpoints[breakpoint]);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return matches;
};
