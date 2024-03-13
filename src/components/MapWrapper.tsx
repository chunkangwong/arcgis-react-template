import { cn } from "@/lib/utils";
import { useLayoutStore } from "@/store/useLayoutStore";
import { Map } from "./Map";

interface MapWrapperProps {
  children: React.ReactNode;
}

const MapWrapperInner = ({ children }: MapWrapperProps) => {
  const sidebarOpen = useLayoutStore((state) => state.sidebarOpen);

  return (
    <div
      className={cn(
        "h-full w-full transform duration-300",
        sidebarOpen ? "hidden md:block ml-0" : "md:-ml-[32rem]",
      )}
    >
      {children}
    </div>
  );
};

export const MapWrapper = () => {
  return (
    <MapWrapperInner>
      <Map />
    </MapWrapperInner>
  );
};
