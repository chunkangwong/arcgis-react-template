import { HelpCircle, LucideIcon } from "lucide-react";

import { HelpHoverCard } from "./HelpHoverCard";

interface SearchListProps {
  icon: LucideIcon;
  emptyText: string;
  searchList: { label: string; value: string; description?: string }[];
  moreButton?: React.ReactNode;
  onSelect: (value: string, index: number) => void;
}

export const SearchList = ({
  icon: Icon,
  emptyText,
  searchList,
  moreButton,
  onSelect,
}: SearchListProps) => {
  const handleSelect = (value: string, index: number) => () => {
    onSelect(value, index);
  };

  const handleKeyDown =
    (value: string, index: number) => (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        onSelect(value, index);
      } else if (e.key === "ArrowDown") {
        e.currentTarget.nextSibling &&
          (e.currentTarget.nextSibling as HTMLLIElement).focus();
      } else if (e.key === "ArrowUp") {
        e.currentTarget.previousSibling &&
          (e.currentTarget.previousSibling as HTMLLIElement).focus();
      }
    };

  return (
    <ul className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1">
      {searchList.length === 0 ? (
        <p className="py-6 text-center text-sm">{emptyText}</p>
      ) : (
        searchList.map((searchItem, index) => (
          <li
            className="group cursor-pointer flex items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
            tabIndex={0}
            key={searchItem.value}
            onClick={handleSelect(searchItem.value, index)}
            onKeyDown={handleKeyDown(searchItem.value, index)}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span className="group-hover:underline">{searchItem.label}</span>
            {searchItem.description && (
              <HelpHoverCard text={searchItem.description}>
                <HelpCircle className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-50 cursor-help" />
              </HelpHoverCard>
            )}
          </li>
        ))
      )}
      {moreButton}
    </ul>
  );
};
