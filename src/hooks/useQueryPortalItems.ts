import { useInfiniteQuery } from "@tanstack/react-query";

import { portal } from "@/arcgis";

interface UseQueryPortalItemsProps {
  searchTerm: string;
}

export const useQueryPortalItems = ({
  searchTerm,
}: UseQueryPortalItemsProps) => {
  return useInfiniteQuery({
    queryKey: ["queryPortalItems", searchTerm],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      await portal.load();
      const result = await portal.queryItems({
        query: `type:Map Service AND title:${searchTerm}`,
        sortField: "num-views",
        sortOrder: "desc",
        num: 10,
        start: pageParam,
      });
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextQueryParams.start,
    enabled: searchTerm.length > 0,
    select: (data) =>
      data.pages.flatMap((page) =>
        page.results.map((result) => ({
          label: result.title,
          value: result.id,
          description: result.description,
        })),
      ),
  });
};
