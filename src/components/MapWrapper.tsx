import { useLayoutStore } from "@/store/useLayoutStore";
import { Map } from "./Map";
import { cn } from "@/lib/utils";

interface MapWrapperProps {
  children: React.ReactNode;
}

const MapWrapperInner = ({ children }: MapWrapperProps) => {
  const sidebarOpen = useLayoutStore((state) => state.sidebarOpen);

  return (
    <div
      className={cn(
        "h-full w-full transform transition-all duration-500",
        !sidebarOpen && "-ml-[31rem]",
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
