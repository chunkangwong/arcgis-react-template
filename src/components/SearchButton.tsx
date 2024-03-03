import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

import { view } from "@/arcgis";
import { SearchDialog } from "./SearchDialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SearchButtonProps {
  asMapWidget?: boolean;
  fullWidth?: boolean;
}

export const SearchButton = ({ asMapWidget, fullWidth }: SearchButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current && asMapWidget) {
      view.ui.add(ref.current, { position: "top-left", index: 0 });
    }
  }, [asMapWidget]);

  return (
    <SearchDialog>
      <Button
        variant="outline"
        ref={ref}
        className={cn(
          "flex  justify-start text-muted-foreground",
          fullWidth ? "w-full" : "w-[16rem]",
        )}
      >
        <Search className="mr-4 h-4 w-4 opacity-50" />
        Search ...
        <kbd className="ml-auto rounded-md bg-neutral-200 px-2">⌘ K</kbd>
      </Button>
    </SearchDialog>
  );
};
