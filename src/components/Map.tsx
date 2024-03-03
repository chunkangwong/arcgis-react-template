import { view } from "@/arcgis";
import { useEffect, useRef } from "react";

export const Map = () => {
  const viewDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewDivRef.current) {
      view.container = viewDivRef.current;
    }
  }, []);

  return <div className="h-full w-full" ref={viewDivRef}></div>;
};
