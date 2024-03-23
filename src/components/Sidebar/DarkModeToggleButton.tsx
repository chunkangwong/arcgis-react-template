import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";

export const DarkModeToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Tooltip title="Toggle Dark Mode" side="right">
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
