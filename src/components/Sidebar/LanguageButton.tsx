import { Globe } from "lucide-react";
import { useState } from "react";

import { LanguageDialog } from "../LanguageDialog";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";

interface LanguageButtonProps {
  side: "top" | "right";
}

export const LanguageButton = ({ side }: LanguageButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <LanguageDialog open={open} setOpen={setOpen}>
      <Button className="h-8 w-8" size="icon">
        <Tooltip title="Language Setting" side={side}>
          <Globe />
        </Tooltip>
      </Button>
    </LanguageDialog>
  );
};
