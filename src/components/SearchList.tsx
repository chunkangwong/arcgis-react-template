import { HelpCircle, LucideIcon } from "lucide-react";

import { HelpHoverCard } from "./HelpHoverCard";
import { CommandEmpty, CommandItem, CommandList } from "./ui/command";

interface SearchListProps {
  emptyText: string;
  icon: LucideIcon;
  searchList: { label: string; value: string; description: string }[];
  onSelect: (value: string) => void;
}

export const SearchList = ({
  emptyText,
  icon: Icon,
  searchList,
  onSelect,
}: SearchListProps) => {
  const handleSelect = (value: string) => () => {
    onSelect(value);
  };

  return (
    <CommandList>
      <CommandEmpty>{emptyText}</CommandEmpty>
      {searchList.map((searchItem) => (
        <CommandItem
          className="group cursor-pointer"
          key={searchItem.value}
          onSelect={handleSelect(searchItem.value)} // Not using 'value' prop here as it does not register capital letters
        >
          <Icon className="mr-2 h-4 w-4" />
          <span className="group-hover:underline">{searchItem.label}</span>
          <HelpHoverCard text={searchItem.description}>
            <HelpCircle className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-50 cursor-help" />
          </HelpHoverCard>
        </CommandItem>
      ))}
    </CommandList>
  );
};
