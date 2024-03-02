import { LucideIcon } from "lucide-react";

import { CommandEmpty, CommandItem, CommandList } from "./ui/command";

interface SearchListProps {
  emptyText: string;
  icon: LucideIcon;
  searchList: { label: string; value: string }[];
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
          key={searchItem.value}
          onSelect={handleSelect(searchItem.value)} // Not using 'value' prop here as it does not register capital letters
        >
          <Icon className="mr-2 h-4 w-4" />
          <span>{searchItem.label}</span>
        </CommandItem>
      ))}
    </CommandList>
  );
};
