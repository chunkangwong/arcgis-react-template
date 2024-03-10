import { arcgisUser } from "@/arcgis";
import { useLayoutStore } from "@/store/useLayoutStore";
import { Dialog, DialogContent } from "../ui/dialog";

export const ProfileDialog = () => {
  const profileDialogOpen = useLayoutStore((state) => state.profileDialogOpen);
  const setProfileDialogOpen = useLayoutStore(
    (state) => state.setProfileDialogOpen,
  );

  return (
    <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
      <DialogContent>{arcgisUser.credential.userId}</DialogContent>
    </Dialog>
  );
};