import { HelpCircle, LucideIcon } from "lucide-react";

import { HelpHoverCard } from "./HelpHoverCard";

interface SearchListProps {
  icon: LucideIcon;
  emptyText: string;
  searchList: { label: string; value: string; description?: string }[];
  moreButton?: React.ReactNode;
  onSelect: (value: string) => void;
}

export const SearchList = ({
  icon: Icon,
  emptyText,
  searchList,
  moreButton,
  onSelect,
}: SearchListProps) => {
  const handleSelect = (value: string) => () => {
    onSelect(value);
  };

  return (
    <ul className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1">
      {searchList.map((searchItem) => (
        <li
          className="group cursor-pointer flex items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
          key={searchItem.value}
          onClick={handleSelect(searchItem.value)}
        >
          <Icon className="mr-2 h-4 w-4" />
          <span className="group-hover:underline">{searchItem.label}</span>
          {searchItem.description && (
            <HelpHoverCard text={searchItem.description}>
              <HelpCircle className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-50 cursor-help" />
            </HelpHoverCard>
          )}
        </li>
      ))}
      {searchList.length === 0 && (
        <p className="py-6 text-center text-sm">{emptyText}</p>
      )}
      {moreButton}
    </ul>
  );
};
