import { User } from "lucide-react";

import { ProfileDialog } from "../ProfileDialog";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";

export const ProfileButton = () => {
  return (
    <ProfileDialog>
      <Button className="h-8 w-8 ml-auto md:mt-auto" size="icon">
        <Tooltip side="left" title="Profile" sideOffset={8}>
          <User />
        </Tooltip>
      </Button>
    </ProfileDialog>
  );
};
