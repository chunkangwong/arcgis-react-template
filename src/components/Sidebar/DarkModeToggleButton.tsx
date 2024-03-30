import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { toggleDarkMode } from "@/lib/utils";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";

interface DarkModeToggleButtonProps {
  side: "top" | "right";
}

export const DarkModeToggleButton = ({ side }: DarkModeToggleButtonProps) => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(localStorage.theme === "dark");

  const handleClick = () => {
    const newDarkMode = !isDarkMode;
    toggleDarkMode(newDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Tooltip
      title={isDarkMode ? t("Toggle Light Mode") : t("Toggle Dark Mode")}
      side={side}
    >
      <Button className="h-8 w-8" size="icon" onClick={handleClick}>
        {isDarkMode ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>
    </Tooltip>
  );
};
