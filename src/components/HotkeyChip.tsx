interface HotkeyChipProps {
  children: React.ReactNode;
}

export const HotkeyChip = ({ children }: HotkeyChipProps) => {
  return (
    <kbd className="hidden md:block ml-auto rounded-md bg-muted-foreground text-neutral-100 px-2">
      {children}
    </kbd>
  );
};
