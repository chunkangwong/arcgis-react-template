import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

import { useSearchHotkey } from "@/hooks/useSearchHotkey";
import { Search } from "lucide-react";
import { PortalItemList } from "./PortalItemList";
import { WidgetList } from "./WidgetList";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface SearchDialogProps {
  children: React.ReactNode;
}

export const SearchDialog = ({ children }: SearchDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { open, setOpen } = useSearchHotkey();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
