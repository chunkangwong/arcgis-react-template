import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps {
  children: React.ReactNode;
  title: string;
  side?: "top" | "bottom" | "left" | "right";
}

export const Tooltip = ({ children, title, side = "bottom" }: TooltipProps) => {
  return (
    <TooltipProvider>
      <ShadcnTooltip disableHoverableContent>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{title}</TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
};
