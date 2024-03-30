import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { Tab, useSearchDialogStore } from "@/store/useSearchDialogStore";
import { HotkeyChip } from "./HotkeyChip";
import { Button } from "./ui/button";

interface SearchButtonProps {
  fullWidth?: boolean;
  label?: string;
  tabToOpen?: Tab;
}

export const SearchButton = ({
  fullWidth,
  label,
  tabToOpen,
}: SearchButtonProps) => {
  const { t } = useTranslation();

  const setSearchDialog = useSearchDialogStore(
    (state) => state.setSearchDialog,
  );

  const handleClick = () => {
    setSearchDialog({ open: true, tab: tabToOpen });
  };

  return (
    <Button
      variant="outline"
      className={cn(
        "flex  justify-start text-muted-foreground",
        fullWidth ? "w-full" : "w-[16rem]",
      )}
      onClick={handleClick}
    >
      <Search className="mr-4 h-4 w-4 opacity-50" />
      {label ?? t("Search...")}
      <HotkeyChip>⌘ k</HotkeyChip>
    </Button>
  );
};
