import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { map, view } from "@/arcgis";
import { useQueryPortalItems } from "@/hooks/useQueryPortalItems";
import { useRecentStore } from "@/store/useRecentStore";
import { useSearchDialogStore } from "@/store/useSearchDialogStore";
import { Button } from "../ui/button";
import { SearchList } from "./SearchList";

interface PortalItemListProps {
  searchTerm: string;
}

export const PortalItemList = ({ searchTerm }: PortalItemListProps) => {
  const { t } = useTranslation();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } =
    useQueryPortalItems({
      searchTerm,
    });
  const setSearchDialogOpen = useSearchDialogStore(
    (state) => state.setSearchDialogOpen,
  );
  const addRecentItem = useRecentStore((state) => state.addRecentItem);

  const handleClick = () => {
    fetchNextPage();
  };

  const getEmptyText = () => {
    if (isFetching) {
      return t("Searching portal items...");
    }

    if (searchTerm) {
      return t("No portal items found", { searchTerm });
    }

    return t("Type to search for portal items");
  };

  const handleSelect = async (value: string) => {
    for (const layer of map.layers) {
      if ((layer as __esri.FeatureLayer)?.portalItem?.id === value) {
        layer.visible = true;
        await view.goTo(layer.fullExtent);
        setSearchDialogOpen(false);
        return;
      }
    }
    try {
      toast.info(t("Adding layer..."));
      const layer = new FeatureLayer({
        portalItem: {
          id: value,
        },
      });
      map.add(layer);
      await layer.load();
      addRecentItem({
        id: value,
        title: layer.title,
        type: "portalItems",
      });
      await view.goTo(layer.fullExtent);
      toast.success(t("Layer added"));
    } catch (error) {
      console.error(error);
      toast.error(t("Error adding layer"));
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
            {t("More")}
          </Button>
        ) : null
      }
    />
  );
};
