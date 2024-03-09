import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

import { view } from "@/arcgis";
import { cn } from "@/lib/utils";
import { useLayoutStore } from "@/store/useLayoutStore";
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

  useEffect(() => {
    if (ref.current && asMapWidget) {
      view.ui.add(ref.current, { position: "top-left", index: 0 });
    }
  }, [asMapWidget]);

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
      <kbd className="ml-auto rounded-md bg-neutral-200 px-2">⌘ K</kbd>
    </Button>
  );
};
