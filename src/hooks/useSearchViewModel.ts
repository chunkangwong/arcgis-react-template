import { view } from "@/arcgis";
import SearchVM from "@arcgis/core/widgets/Search/SearchViewModel";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export const useSearchViewModel = (searchTerm: string) => {
  const searchVM = useRef(
    new SearchVM({
      suggestionsEnabled: false,
      view: view,
      sources: [
        {
          url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer",
          singleLineFieldName: "SingleLine",
          outFields: ["Addr_type"],
          placeholder: "Adresse",
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
      console.log("🚀 ~ queryFn: ~ searchResponse:", searchResponse);
      if (searchResponse.errors.length > 0) {
        throw new Error(searchResponse.errors[0].message);
      }
      if (searchResponse.results.length === 0) {
        throw new Error("No results found");
      }
      return searchResponse.results[0];
    },
    enabled: searchTerm.length > 0,
    select: (data) =>
      data.results.map((result) => ({
        label: result.name,
        value: result.feature.getObjectId().toString(),
        description: "",
      })),
  });
};
