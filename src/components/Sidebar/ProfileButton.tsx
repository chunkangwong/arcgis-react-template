import { User } from "lucide-react";

import { ProfileDialog } from "../ProfileDialog";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";

interface ProfileButtonProps {
  side: "top" | "right";
}

export const ProfileButton = ({ side }: ProfileButtonProps) => {
  return (
    <ProfileDialog>
      <Button className="h-8 w-8 ml-auto md:mt-auto" size="icon">
        <Tooltip side={side} title="Profile" sideOffset={8}>
          <User />
        </Tooltip>
      </Button>
    </ProfileDialog>
  );
};
