import { Layers } from "lucide-react";

import { useQueryPortalItems } from "@/hooks/useQueryPortalItems";
import { SearchList } from "./SearchList";
import { Button } from "./ui/button";

interface PortalItemListProps {
  searchTerm: string;
}

export const PortalItemList = ({ searchTerm }: PortalItemListProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useQueryPortalItems({
      searchTerm,
    });

  const handleClick = () => {
    fetchNextPage();
  };

  return (
    <SearchList
      emptyText="No portal items found"
      icon={Layers}
      searchList={data ?? []}
      onSelect={() => {}}
      moreButton={
        hasNextPage && (
          <Button
            onClick={handleClick}
            disabled={isFetchingNextPage}
            variant="link"
            className="w-full"
          >
            More
          </Button>
        )
      }
    />
  );
};
