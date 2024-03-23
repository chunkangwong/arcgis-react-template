import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { darkGrayBasemap, map, topographicBasemap } from "@/arcgis";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toggleDarkMode = (isDarkMode: boolean) => {
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    map.basemap = darkGrayBasemap;
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    map.basemap = topographicBasemap;
  }
};
