import { useEffect, useRef } from "react";

type UseResizeSidebarWidth = (onWidthChange: (width: number) => void) => {
  enableResize: () => void;
};

export const useResizeSidebarWidth: UseResizeSidebarWidth = (onWidthChange) => {
  const isResized = useRef(false);

  useEffect(() => {
    const hanldeMouseMove = (e: MouseEvent) => {
      if (!isResized.current) {
        return;
      }

      onWidthChange(e.clientX - 64);
    };

    const handleMouseUp = () => {
      isResized.current = false;
      document.body.style.cursor = "default";
    };

    window.addEventListener("mousemove", hanldeMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", hanldeMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const enableResize = () => {
    isResized.current = true;
    document.body.style.cursor = "ew-resize";
  };

  return {
    enableResize,
  };
};
