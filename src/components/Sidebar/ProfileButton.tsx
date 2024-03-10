import { User } from "lucide-react";

import { useLayoutStore } from "@/store/useLayoutStore";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";

export const ProfileButton = () => {
  const setProfileDialogOpen = useLayoutStore(
    (state) => state.setProfileDialogOpen,
  );

  return (
    <Tooltip side="left" title="Profile">
      <Button
        className="h-8 w-8 mt-auto"
        size="icon"
        onClick={() => setProfileDialogOpen(true)}
      >
        <User />
      </Button>
    </Tooltip>
  );
};
