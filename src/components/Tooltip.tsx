import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps {
  children: React.ReactNode;
  title: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

export const Tooltip = ({
  children,
  title,
  side = "bottom",
  sideOffset,
}: TooltipProps) => {
  return (
    <TooltipProvider>
      <ShadcnTooltip disableHoverableContent>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} sideOffset={sideOffset}>
          {title}
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
};
