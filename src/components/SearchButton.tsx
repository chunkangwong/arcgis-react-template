import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import { view } from "@/arcgis";

const SearchButton = () => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) {
      view.ui.add(ref.current, "top-right");
    }
  }, []);

  return (
    <Button variant="outline" ref={ref} className="flex gap-4">
      <Search />
      Search ...
      <kbd className="px-2 rounded-md bg-neutral-200">⌘ K</kbd>
    </Button>
  );
};

export default SearchButton;
