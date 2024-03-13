import { ArrowUpRightFromSquare } from "lucide-react";

import { arcgisUser, info } from "@/arcgis";
import { useLayoutStore } from "@/store/useLayoutStore";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ConfirmSignOutDialog } from "./ConfirmSignOutDialog";

export const ProfileDialog = () => {
  const profileDialogOpen = useLayoutStore((state) => state.profileDialogOpen);
  const setProfileDialogOpen = useLayoutStore(
    (state) => state.setProfileDialogOpen,
  );

  return (
    <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <div className="py-4">{arcgisUser.credential.userId}</div>
        <DialogFooter className="flex flex-col-reverse gap-y-4 sm:flex-row">
          <ConfirmSignOutDialog>
            <Button variant="destructive" className="sm:mr-auto" size="sm">
              Sign Out
            </Button>
          </ConfirmSignOutDialog>
          <Button variant="outline" size="sm">
            <a href={info.portalUrl} target="_blank" className="flex gap-x-2">
              <ArrowUpRightFromSquare className="h-4 w-4" />
              Manage Profile
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
