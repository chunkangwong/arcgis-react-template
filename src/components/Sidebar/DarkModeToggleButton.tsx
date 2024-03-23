import { toggleDarkMode } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";

interface DarkModeToggleButtonProps {
  side: "top" | "right";
}

export const DarkModeToggleButton = ({ side }: DarkModeToggleButtonProps) => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.theme === "dark");

  const handleClick = () => {
    const newDarkMode = !isDarkMode;
    toggleDarkMode(newDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Tooltip title="Toggle Dark Mode" side={side}>
      <Button
        className="h-8 w-8 ml-auto md:mt-auto"
        size="icon"
        onClick={handleClick}
      >
        {isDarkMode ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>
    </Tooltip>
  );
};
