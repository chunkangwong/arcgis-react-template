import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

import { view } from "@/arcgis";
import { SearchDialog } from "./SearchDialog";
import { Button } from "./ui/button";

const SearchButton = () => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) {
      view.ui.add(ref.current, "top-right");
    }
  }, []);

  return (
    <SearchDialog>
      <Button variant="outline" ref={ref} className="flex gap-4">
        <Search />
        Search ...
        <kbd className="px-2 rounded-md bg-neutral-200">⌘ K</kbd>
      </Button>
    </SearchDialog>
  );
};

export default SearchButton;
