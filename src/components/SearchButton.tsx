import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

import { view } from "@/arcgis";
import { SearchDialog } from "./SearchDialog";
import { Button } from "./ui/button";

export const SearchButton = () => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) {
      view.ui.add(ref.current, { position: "top-left", index: 0 });
    }
  }, []);

  return (
    <SearchDialog>
      <Button
        variant="outline"
        ref={ref}
        className="flex gap-4 text-muted-foreground"
      >
        <Search className="h-4 w-4 opacity-50" />
        Search ...
        <kbd className="px-2 rounded-md bg-neutral-200">⌘ K</kbd>
      </Button>
    </SearchDialog>
  );
};
