import { Layers, Locate, Settings } from "lucide-react";
import { useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

interface SearchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SearchDialog = ({ open, setOpen }: SearchDialogProps) => {
  const [search, setSearch] = useState("");

  const handleChange = (newValue: string) => {
    setSearch(newValue);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search"
        value={search}
        onValueChange={handleChange}
      />
      <CommandList>
        <CommandEmpty>No results</CommandEmpty>
        <CommandGroup heading="Places">
          <CommandItem>
            <Locate className="mr-2 h-4 w-4" />
            <span>Current Location</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Portal Items">
          <CommandItem>
            <Layers className="mr-2 h-4 w-4" />
            <span>Layer 1</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Widgets">
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Widget 1</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
