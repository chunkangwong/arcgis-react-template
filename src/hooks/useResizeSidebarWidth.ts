import { useEffect, useRef, useState } from "react";

type UseResizeSidebarWidth = (defaultWidth: number) => {
  width: number;
  enableResize: () => void;
};

export const useResizeSidebarWidth: UseResizeSidebarWidth = (defaultWidth) => {
  const isResized = useRef(false);
  const [width, setWidth] = useState(defaultWidth);

  useEffect(() => {
    const hanldeMouseMove = (e: MouseEvent) => {
      if (!isResized.current) {
        return;
      }

      setWidth((previousWidth) => previousWidth + e.movementX);
    };

    const handleMouseUp = () => {
      isResized.current = false;
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
  };

  return {
    width,
    enableResize,
  };
};
