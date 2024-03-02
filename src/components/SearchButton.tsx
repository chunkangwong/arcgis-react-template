import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

import { view } from "@/arcgis";
import { useSearchHotkey } from "@/hooks/useSearchHotkey";
import { SearchDialog } from "./SearchDialog";
import { Button } from "./ui/button";

export const SearchButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const { open, setOpen } = useSearchHotkey();

  useEffect(() => {
    if (ref.current) {
      view.ui.add(ref.current, { position: "top-left", index: 0 });
    }
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="outline"
        ref={ref}
        className="flex gap-4 text-muted-foreground"
        onClick={handleClick}
      >
        <Search className="h-4 w-4 opacity-50" />
        Search ...
        <kbd className="px-2 rounded-md bg-neutral-200">⌘ K</kbd>
      </Button>
      <SearchDialog open={open} setOpen={setOpen} />
    </>
  );
};
