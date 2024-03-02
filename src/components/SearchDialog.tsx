import { useState } from "react";

import { CommandDialog, CommandInput } from "./ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { WidgetList } from "./WidgetList";

interface SearchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SearchDialog = ({ open, setOpen }: SearchDialogProps) => {
  const [search, setSearch] = useState("");

  const handleChange = (newValue: string) => {
    setSearch(newValue);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search"
        value={search}
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
          Change your password here.
        </TabsContent>
        <TabsContent value="widgets">
          <WidgetList />
        </TabsContent>
      </Tabs>
    </CommandDialog>
  );
};
