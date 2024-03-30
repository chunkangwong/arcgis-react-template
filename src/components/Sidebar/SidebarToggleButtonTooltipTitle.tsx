import { useSidebarStore } from "@/store/useSidebarStore";
import { useTranslation } from "react-i18next";

import { HotkeyChip } from "../HotkeyChip";

export const SidebarToggleButtonTooltipTitle = () => {
  const { t } = useTranslation();
  const sidebarOpen = useSidebarStore((state) => state.sidebarOpen);

  return (
    <span className="flex gap-1">
      {sidebarOpen ? t("Close") : t("Open")}
      <HotkeyChip>⌘ b</HotkeyChip>
    </span>
  );
};
