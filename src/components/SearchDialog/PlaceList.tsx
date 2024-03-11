import { Pin } from "lucide-react";

import { useSearchViewModel } from "@/hooks/useSearchViewModel";
import { SearchList } from "./SearchList";

interface PlaceListProps {
  searchTerm: string;
}

export const PlaceList = ({ searchTerm }: PlaceListProps) => {
  const { data, isFetching } = useSearchViewModel(searchTerm);

  const getEmptyText = () => {
    if (isFetching) {
      return "Searching places...";
    }

    if (searchTerm) {
      return `No places found for "${searchTerm}"`;
    }

    return "Type to search for places";
  };

  return (
    <SearchList
      emptyText={getEmptyText()}
      icon={Pin}
      onSelect={() => null}
      searchList={data ?? []}
    />
  );
};
