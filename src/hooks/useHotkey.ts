import { useEffect } from "react";

export const useHotkey = (
  key: string,
  ctrlKey: boolean,
  callback: () => void,
) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === key) {
        if (ctrlKey && !e.ctrlKey && !e.metaKey) return;
        e.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);
};
