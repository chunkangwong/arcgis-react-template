import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import { useState } from "react";

import { useSearchHotkey } from "@/hooks/useSearchHotkey";
import { useLayoutStore } from "@/store/useLayoutStore";
import { PortalItemList } from "./PortalItemList";
import { WidgetList } from "./WidgetList";
import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export const SearchDialog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchDialogOpen = useLayoutStore((state) => state.searchDialogOpen);
  const setSearchDialogOpen = useLayoutStore(
    (state) => state.setSearchDialogOpen,
  );

  useSearchHotkey();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClose = () => setSearchDialogOpen(false);

  return (
    <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
      <DialogContent className="p-0">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
            className="border-0"
          />
        </div>
        <Tabs defaultValue="places">
          <TabsList className="w-full">
            <TabsTrigger value="places">Places</TabsTrigger>
            <TabsTrigger value="portalItems">Portal Items</TabsTrigger>
            <TabsTrigger value="widgets">Widgets</TabsTrigger>
          </TabsList>
          <TabsContent value="places">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="portalItems">
            <PortalItemList
              searchTerm={debouncedSearchTerm}
              onClose={handleClose}
            />
          </TabsContent>
          <TabsContent value="widgets">
            <WidgetList
              searchTerm={debouncedSearchTerm}
              onClose={handleClose}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
