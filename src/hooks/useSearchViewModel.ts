import { view } from "@/arcgis";
import SearchVM from "@arcgis/core/widgets/Search/SearchViewModel";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export const useSearchViewModel = (searchTerm: string) => {
  const searchVM = useRef(
    new SearchVM({
      suggestionsEnabled: false,
      view: view,
      autoSelect: false,
      sources: [
        {
          url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer",
          singleLineFieldName: "SingleLine",
          outFields: ["Addr_type"],
        },
      ],
    }),
  );

  useEffect(() => {
    return () => {
      searchVM.current.destroy();
    };
  }, []);

  return useQuery({
    queryKey: ["searchPlaces", searchTerm],
    queryFn: async () => {
      const searchResponse = await searchVM.current.search(searchTerm);
      if (searchResponse.errors.length > 0) {
        throw new Error(searchResponse.errors[0].message);
      }
      if (searchResponse.results.length === 0) {
        throw new Error("No results found");
      }
      return searchResponse.results[0].results.map((result) => ({
        label: result.name,
        value: (result.feature as any).uid, // TODO: Fix this
        description: "",
      }));
    },
    enabled: searchTerm.length > 0,
  });
};
