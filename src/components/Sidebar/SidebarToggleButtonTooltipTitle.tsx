import { useLayoutStore } from "@/store/useLayoutStore";
import { HotkeyChip } from "../HotkeyChip";

export const SidebarToggleButtonTooltipTitle = () => {
  const sidebarOpen = useLayoutStore((state) => state.sidebarOpen);

  return (
    <span className="flex gap-1">
      {sidebarOpen ? "Close" : "Open"}
      <HotkeyChip>⌘ b</HotkeyChip>
    </span>
  );
};
