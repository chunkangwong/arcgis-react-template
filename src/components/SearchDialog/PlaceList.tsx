import { Pin } from "lucide-react";

import { SearchList } from "./SearchList";

export const PlaceList = () => {
  return (
    <SearchList
      emptyText="Type to search for places"
      icon={Pin}
      onSelect={() => null}
      searchList={[]}
    />
  );
};
