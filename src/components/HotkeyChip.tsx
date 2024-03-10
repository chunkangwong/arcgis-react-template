interface HotkeyChipProps {
  children: React.ReactNode;
}

export const HotkeyChip = ({ children }: HotkeyChipProps) => {
  return (
    <kbd className="ml-auto rounded-md bg-neutral-200 px-2">{children}</kbd>
  );
};
