import { ArrowUpRightFromSquare } from "lucide-react";

import { arcgisUser, info } from "@/arcgis";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ConfirmSignOutDialog } from "./ConfirmSignOutDialog";

interface ProfileDialogProps {
  children: React.ReactNode;
}

export const ProfileDialog = ({ children }: ProfileDialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Profile")}</DialogTitle>
        </DialogHeader>
        <div className="py-4">{arcgisUser.credential.userId}</div>
        <DialogFooter className="flex flex-col-reverse gap-y-4 sm:flex-row">
          <ConfirmSignOutDialog>
            <Button variant="destructive" className="sm:mr-auto" size="sm">
              {t("Sign Out")}
            </Button>
          </ConfirmSignOutDialog>
          <Button variant="outline" size="sm">
            <a href={info.portalUrl} target="_blank" className="flex gap-x-2">
              <ArrowUpRightFromSquare className="h-4 w-4" />
              {t("Manage Profile")}
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
