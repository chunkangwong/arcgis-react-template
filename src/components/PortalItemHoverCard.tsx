import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface PortalItemHoverCardProps {
  children: React.ReactNode;
  htmlString: string;
}

export const PortalItemHoverCard = ({
  children,
  htmlString,
}: PortalItemHoverCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent side="left">
        <span
          className="text-xs text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: htmlString,
          }}
        ></span>
      </HoverCardContent>
    </HoverCard>
  );
};
