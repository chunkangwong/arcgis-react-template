import { Search } from "lucide-react";
import { useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { Tab, useSearchDialogStore } from "@/store/useSearchDialogStore";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PlaceList } from "./PlaceList";
import { PortalItemList } from "./PortalItemList";
import { WidgetList } from "./WidgetList";

const placeholders: Record<Tab, string> = {
  places: "Search for places",
  portalItems: "Search for portal items",
  widgets: "Search for widgets",
};

export const SearchDialog = () => {
  const [searchTerms, setSearchTerms] = useState<Record<Tab, string>>({
    places: "",
    portalItems: "",
    widgets: "",
  });
  const debouncedSearchTerms = useDebounce(searchTerms, 500);

  const open = useSearchDialogStore((state) => state.open);
  const tab = useSearchDialogStore((state) => state.tab);
  const setSearchDialog = useSearchDialogStore(
    (state) => state.setSearchDialog,
  );

  const handleOpenChange = (open: boolean) => {
    setSearchDialog({ open });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms({
      ...searchTerms,
      [tab]: e.target.value,
    });
  };

  const handleTabChange = (tab: string) => {
    setSearchDialog({ tab: tab as Tab });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder={placeholders[tab]}
            value={searchTerms[tab]}
            onChange={handleChange}
            className="border-0"
          />
        </div>
        <Tabs value={tab} onValueChange={handleTabChange}>
          <TabsList className="w-full">
            <TabsTrigger value="places">Places</TabsTrigger>
            <TabsTrigger value="portalItems">Portal Items</TabsTrigger>
            <TabsTrigger value="widgets">Widgets</TabsTrigger>
          </TabsList>
          <TabsContent value="places">
            <PlaceList searchTerm={debouncedSearchTerms["places"]} />
          </TabsContent>
          <TabsContent value="portalItems">
            <PortalItemList searchTerm={debouncedSearchTerms["portalItems"]} />
          </TabsContent>
          <TabsContent value="widgets">
            <WidgetList searchTerm={debouncedSearchTerms["widgets"]} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
