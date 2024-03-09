import { useEffect } from "react";

import { useLayoutStore } from "@/store/useLayoutStore";

export const useSearchHotkey = () => {
  const setSearchDialogOpen = useLayoutStore(
    (state) => state.setSearchDialogOpen,
  );

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchDialogOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);
};
