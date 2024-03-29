import { Globe } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { LanguageDialog } from "../LanguageDialog";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";

interface LanguageButtonProps {
  side: "top" | "right";
}

export const LanguageButton = ({ side }: LanguageButtonProps) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  return (
    <LanguageDialog open={open} setOpen={setOpen}>
      <Button className="h-8 w-8" size="icon">
        <Tooltip title={t("Language Setting")} side={side}>
          <Globe />
        </Tooltip>
      </Button>
    </LanguageDialog>
  );
};
