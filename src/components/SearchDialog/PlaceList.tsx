import { Pin } from "lucide-react";

import { view } from "@/arcgis";
import { useSearchViewModel } from "@/hooks/useSearchViewModel";
import { useSearchDialogStore } from "@/store/useSearchDialogStore";
import { SearchList } from "./SearchList";

interface PlaceListProps {
  searchTerm: string;
}

export const PlaceList = ({ searchTerm }: PlaceListProps) => {
  const { data, isFetching } = useSearchViewModel(searchTerm);
  const setSearchDialogOpen = useSearchDialogStore(
    (state) => state.setSearchDialogOpen,
  );

  const getEmptyText = () => {
    if (isFetching) {
      return "Searching places...";
    }

    if (searchTerm) {
      return `No places found for "${searchTerm}"`;
    }

    return "Type to search for places";
  };

  const handleSelect = (_: string, index: number) => {
    const geometry = data?.[index]?.geometry;
    if (geometry) {
      setSearchDialogOpen(false);
      view.goTo({ target: geometry, zoom: 15 });
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
