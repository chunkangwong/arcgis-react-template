import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { LanguageList } from "./LanguageList";

interface LanguageDialogProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const languages = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "fr",
    label: "French",
  },
  {
    value: "cn",
    label: "Chinese",
  },
];

export const LanguageDialog = ({
  children,
  open,
  setOpen,
}: LanguageDialogProps) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSelect = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleConfirm = async () => {
    await changeLanguage(selectedLanguage);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col gap-y-4">
        <DialogHeader>
          <DialogTitle>{t("Language Setting")}</DialogTitle>
          <DialogDescription>
            <Input
              placeholder={t("Search for languages")}
              value={searchKeyword}
              onChange={handleChange}
            />
            <LanguageList
              onSelect={handleSelect}
              languageList={languages.filter((language) =>
                language.label
                  .toLowerCase()
                  .includes(searchKeyword.toLowerCase()),
              )}
              selectedLanguage={selectedLanguage}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-y-4 sm:flex-row">
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              {t("Cancel")}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="sm:mr-auto"
            size="sm"
            onClick={handleConfirm}
          >
            {t("Confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
