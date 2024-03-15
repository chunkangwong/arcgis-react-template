import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/useSidebarStore";
import { Map } from "./Map";

interface MapWrapperProps {
  children: React.ReactNode;
}

const MapWrapperInner = ({ children }: MapWrapperProps) => {
  const sidebarOpen = useSidebarStore((state) => state.sidebarOpen);

  return (
    <div
      className={cn(
        "h-full flex-1 transform duration-300",
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
