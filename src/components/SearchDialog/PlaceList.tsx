import { Pin } from "lucide-react";
import { useTranslation } from "react-i18next";

import { view } from "@/arcgis";
import { useSearchViewModel } from "@/hooks/useSearchViewModel";
import { useRecentStore } from "@/store/useRecentStore";
import { useSearchDialogStore } from "@/store/useSearchDialogStore";
import { SearchList } from "./SearchList";

interface PlaceListProps {
  searchTerm: string;
}

export const PlaceList = ({ searchTerm }: PlaceListProps) => {
  const { t } = useTranslation();

  const { data, isFetching } = useSearchViewModel(searchTerm);
  const setSearchDialogOpen = useSearchDialogStore(
    (state) => state.setSearchDialogOpen,
  );
  const addRecentItem = useRecentStore((state) => state.addRecentItem);

  const getEmptyText = () => {
    if (isFetching) {
      return t("Searching places...");
    }

    if (searchTerm) {
      return t("No places found", { searchTerm });
    }

    return t("Type to search for places");
  };

  const handleSelect = (_: string, index: number) => {
    const place = data?.[index];
    if (place) {
      addRecentItem({
        id: place.value,
        title: place.label,
        type: "places",
        geometry: place.geometry.toJSON(),
      });
      setSearchDialogOpen(false);
      view.goTo({ target: place.geometry, zoom: 15 });
    }
  };

  return (
    <SearchList
      emptyText={getEmptyText()}
      icon={Pin}
      onSelect={handleSelect}
      searchList={data ?? []}
    />
  );
};
