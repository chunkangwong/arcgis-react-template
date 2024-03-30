import esriId from "@arcgis/core/identity/IdentityManager";

import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface ConfirmSignOutDialogProps {
  children: React.ReactNode;
}

export const ConfirmSignOutDialog = ({
  children,
}: ConfirmSignOutDialogProps) => {
  const { t } = useTranslation();

  const handleSignOut = () => {
    esriId.destroyCredentials();
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col gap-y-4">
        <DialogHeader>
          <DialogTitle>{t("Sign Out")}</DialogTitle>
          <DialogDescription>
            {t("Are you sure you want to sign out?")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-y-4 sm:flex-row">
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              {t("Cancel")}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="sm:mr-auto"
            size="sm"
            onClick={handleSignOut}
          >
            {t("Confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
