import { useEffect, useRef } from "react";

interface UseResizeSidebarWidthProps {
  onWidthChange: (width: number) => void;
  minWidth?: number;
}

export const useResizeSidebarWidth = ({
  onWidthChange,
  minWidth,
}: UseResizeSidebarWidthProps) => {
  const isResized = useRef(false);

  useEffect(() => {
    const hanldeMouseMove = (e: MouseEvent) => {
      if (!isResized.current) {
        return;
      }

      const newWidth = e.clientX - 64;

      onWidthChange(minWidth ? Math.max(newWidth, minWidth) : newWidth);
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
