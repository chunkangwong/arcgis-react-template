import { User } from "lucide-react";

import { useSidebarStore } from "@/store/useSidebarStore";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";

export const ProfileButton = () => {
  const setProfileDialogOpen = useSidebarStore(
    (state) => state.setProfileDialogOpen,
  );

  return (
    <Tooltip side="left" title="Profile">
      <Button
        className="h-8 w-8 ml-auto md:mt-auto"
        size="icon"
        onClick={() => setProfileDialogOpen(true)}
      >
        <User />
      </Button>
    </Tooltip>
  );
};
