import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

import { view } from "@/arcgis";
import { cn } from "@/lib/utils";
import { useLayoutStore } from "@/store/useLayoutStore";
import { HotkeyChip } from "./HotkeyChip";
import { Button } from "./ui/button";

interface SearchButtonProps {
  asMapWidget?: boolean;
  fullWidth?: boolean;
}

export const SearchButton = ({ asMapWidget, fullWidth }: SearchButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const setSearchDialogOpen = useLayoutStore(
    (state) => state.setSearchDialogOpen,
  );
  const sidebarOpen = useLayoutStore((state) => state.sidebarOpen);

  useEffect(() => {
    if (ref.current && asMapWidget && !sidebarOpen) {
      view.ui.add(ref.current, { position: "top-left", index: 0 });
    } else {
      view.ui.remove(ref.current!);
    }
  }, [asMapWidget, sidebarOpen]);

  return (
    <Button
      variant="outline"
      ref={ref}
      className={cn(
        "flex  justify-start text-muted-foreground",
        fullWidth ? "w-full" : "w-[16rem]",
      )}
      onClick={() => setSearchDialogOpen(true)}
    >
      <Search className="mr-4 h-4 w-4 opacity-50" />
      Search ...
      <HotkeyChip>⌘ k</HotkeyChip>
    </Button>
  );
};
