import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface HelpHoverCardProps {
  children: React.ReactNode;
  text: string;
}

export const HelpHoverCard = ({ children, text }: HelpHoverCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent side="left">
        <span className="text-xs text-muted-foreground">{text}</span>
      </HoverCardContent>
    </HoverCard>
  );
};
