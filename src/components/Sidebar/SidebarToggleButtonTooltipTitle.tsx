import { useSidebarStore } from "@/store/useSidebarStore";
import { HotkeyChip } from "../HotkeyChip";

export const SidebarToggleButtonTooltipTitle = () => {
  const sidebarOpen = useSidebarStore((state) => state.sidebarOpen);

  return (
    <span className="flex gap-1">
      {sidebarOpen ? "Close" : "Open"}
      <HotkeyChip>⌘ b</HotkeyChip>
    </span>
  );
};
