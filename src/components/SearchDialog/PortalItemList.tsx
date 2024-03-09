import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import { Layers } from "lucide-react";
import { toast } from "sonner";

import { map } from "@/arcgis";
import { useQueryPortalItems } from "@/hooks/useQueryPortalItems";
import { useLayoutStore } from "@/store/useLayoutStore";
import { Button } from "../ui/button";
import { SearchList } from "./SearchList";

interface PortalItemListProps {
  searchTerm: string;
}

export const PortalItemList = ({ searchTerm }: PortalItemListProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } =
    useQueryPortalItems({
      searchTerm,
    });
  const setSearchDialogOpen = useLayoutStore(
    (state) => state.setSearchDialogOpen,
  );

  const handleClick = () => {
    fetchNextPage();
  };

  const getEmptyText = () => {
    if (isFetching) {
      return "Searching portal items...";
    }

    if (searchTerm) {
      return `No portal items found for "${searchTerm}"`;
    }

    return "Type to search for portal items";
  };

  const handleSelect = (value: string) => {
    try {
      toast.info("Adding layer...");
      const layer = new MapImageLayer({
        portalItem: {
          id: value,
        },
      });
      map.add(layer);
      toast.success("Layer added");
    } catch (error) {
      console.error(error);
      toast.error("Error adding layer");
    } finally {
      setSearchDialogOpen(false);
    }
  };

  return (
    <SearchList
      emptyText={getEmptyText()}
      icon={Layers}
      searchList={data ?? []}
      onSelect={handleSelect}
      moreButton={
        data?.length && hasNextPage ? (
          <Button
            onClick={handleClick}
            disabled={isFetchingNextPage}
            variant="link"
            className="w-full"
          >
            More
          </Button>
        ) : null
      }
    />
  );
};