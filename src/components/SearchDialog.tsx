import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

import { PortalItemList } from "./PortalItemList";
import { WidgetList } from "./WidgetList";
import { Command, CommandDialog, CommandInput } from "./ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface SearchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SearchDialog = ({ open, setOpen }: SearchDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleChange = (newValue: string) => {
    setSearchTerm(newValue);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search"
          value={searchTerm}
          onValueChange={handleChange}
        />
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
            <PortalItemList searchTerm={debouncedSearchTerm} />
          </TabsContent>
          <TabsContent value="widgets">
            <WidgetList searchTerm={debouncedSearchTerm} />
          </TabsContent>
        </Tabs>
      </Command>
    </CommandDialog>
  );
};
