import { User } from "lucide-react";
import { useTranslation } from "react-i18next";

import { ProfileDialog } from "../ProfileDialog";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";

interface ProfileButtonProps {
  side: "top" | "right";
}

export const ProfileButton = ({ side }: ProfileButtonProps) => {
  const { t } = useTranslation();

  return (
    <ProfileDialog>
      <Button className="h-8 w-8 " size="icon">
        <Tooltip side={side} title={t("Profile")} sideOffset={8}>
          <User />
        </Tooltip>
      </Button>
    </ProfileDialog>
  );
};
