import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type LanguageListProps = {
  languageList: {
    label: string;
    value: string;
  }[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
};

export const LanguageList = ({
  languageList,
  selectedLanguage,
  onSelect,
}: LanguageListProps) => {
  const handleSelect = (value: string) => () => {
    onSelect(value);
  };

  const handleKeyDown = (value: string) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSelect(value);
    } else if (e.key === "ArrowDown") {
      e.currentTarget.nextSibling &&
        (e.currentTarget.nextSibling as HTMLLIElement).focus();
    } else if (e.key === "ArrowUp") {
      e.currentTarget.previousSibling &&
        (e.currentTarget.previousSibling as HTMLLIElement).focus();
    }
  };

  return (
    <ul className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1">
      {languageList.length === 0 ? (
        <p className="py-6 text-center text-sm">No language found</p>
      ) : (
        languageList.map((language) => (
          <li
            className={cn(
              "group cursor-pointer flex items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
              selectedLanguage === language.value &&
                "bg-accent text-accent-foreground",
            )}
            tabIndex={0}
            key={language.value}
            onClick={handleSelect(language.value)}
            onKeyDown={handleKeyDown(language.value)}
          >
            {selectedLanguage === language.value ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <div className="mr-2 h-4 w-4"></div>
            )}
            <span className="group-hover:underline">{language.label}</span>
          </li>
        ))
      )}
    </ul>
  );
};
