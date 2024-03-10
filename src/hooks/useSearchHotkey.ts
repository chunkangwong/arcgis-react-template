import { useEffect } from "react";

type UseHotKey = (key: string, ctrlKey: boolean, callback: () => void) => void;

export const useHotkey: UseHotKey = (key, ctrlKey, callback) => {
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
