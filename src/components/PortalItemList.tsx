import { HelpCircle, Layers } from "lucide-react";

import { useQueryPortalItems } from "@/hooks/useQueryPortalItems";
import { HelpHoverCard } from "./HelpHoverCard";
import { CommandEmpty, CommandItem, CommandList } from "./ui/command";
import { Button } from "./ui/button";

interface PortalItemListProps {
  searchTerm: string;
}

export const PortalItemList = ({ searchTerm }: PortalItemListProps) => {
  const {
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetched,
  } = useQueryPortalItems({
    searchTerm,
  });

  const handleClick = () => {
    fetchNextPage();
  };

  return (
    <CommandList>
      <CommandEmpty>
        {isFetched
          ? "Type something to search for portal items"
          : isFetching
          ? "Searching..."
          : "No portal items found"}
      </CommandEmpty>
      {data?.map((portalItem) => (
        <CommandItem className="group cursor-pointer" key={portalItem.value}>
          <Layers className="mr-2 h-4 w-4" />
          <span className="group-hover:underline">{portalItem.label}</span>
          <HelpHoverCard text={portalItem.description}>
            <HelpCircle className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-50 cursor-help" />
          </HelpHoverCard>
        </CommandItem>
      ))}
      {hasNextPage && (
        <Button
          onClick={handleClick}
          disabled={isFetchingNextPage}
          variant="link"
          className="w-full"
        >
          More
        </Button>
      )}
    </CommandList>
  );
};
