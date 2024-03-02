import { Search, X } from "lucide-react";
import { useState } from "react";

import { useSearchHotkey } from "@/hooks/useSearchHotkey";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface SearchDialogProps {
  children: React.ReactNode;
}

export const SearchDialog = ({ children }: SearchDialogProps) => {
  const [search, setSearch] = useState("");
  const { open, setOpen } = useSearchHotkey();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClear = () => {
    setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader>
          <div className="flex items-center px-2">
            <Search />
            <Input
              className="border-0 "
              value={search}
              onChange={handleChange}
              placeholder="Search..."
            />
            <Button variant="ghost" size="icon" onClick={handleClear}>
              <X />
            </Button>
          </div>
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
};
