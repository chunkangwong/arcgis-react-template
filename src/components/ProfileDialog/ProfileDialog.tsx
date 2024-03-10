import esriId from "@arcgis/core/identity/IdentityManager";
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

export const ProfileDialog = () => {
  const profileDialogOpen = useLayoutStore((state) => state.profileDialogOpen);
  const setProfileDialogOpen = useLayoutStore(
    (state) => state.setProfileDialogOpen,
  );

  const handleSignOut = () => {
    esriId.destroyCredentials();
    window.location.reload();
  };

  return (
    <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <div className="py-4">{arcgisUser.credential.userId}</div>
        <DialogFooter>
          <Button
            variant="destructive"
            className="mr-auto"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
          <Button variant="outline">
            <a href={info.portalUrl} target="_blank" className="flex gap-x-2">
              <ArrowUpRightFromSquare className="h-4 w-4" />
              Go to Portal
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
