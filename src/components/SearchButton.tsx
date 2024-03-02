import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

import { view } from "@/arcgis";
import { useSearchHotkey } from "@/hooks/useSearchHotkey";
import { SearchDialog } from "./SearchDialog";
import { Button } from "./ui/button";

const SearchButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const { open, setOpen } = useSearchHotkey();

  useEffect(() => {
    if (ref.current) {
      view.ui.add(ref.current, "top-left");
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
        className="flex gap-4"
        onClick={handleClick}
      >
        <Search />
        Search ...
        <kbd className="px-2 rounded-md bg-neutral-200">⌘ K</kbd>
      </Button>
      <SearchDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default SearchButton;
