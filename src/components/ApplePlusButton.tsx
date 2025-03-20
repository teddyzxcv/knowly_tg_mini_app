import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import * as React from "react";
import { cn } from "@/utils";

interface ApplePlusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "sm" | "lg";
  label?: string;
}

const ApplePlusButton = React.forwardRef<HTMLButtonElement, ApplePlusButtonProps>(
  ({ className, size = "default", label, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      default: "h-10 w-10",
      lg: "h-12 w-12",
    };

    return (
      <Button
        ref={ref}
        variant="outline"
        className={cn(
          "rounded-full aspect-square flex items-center justify-center border border-input bg-background p-0 shadow-sm hover:bg-accent hover:text-accent-foreground",
          sizeClasses[size],
          className
        )}
        aria-label={label || "Add new"}
        {...props}
      >
        <Plus 
          className="opacity-80" 
          size={size === "sm" ? 14 : size === "lg" ? 20 : 16} 
          strokeWidth={2.5} 
          aria-hidden="true" 
        />
      </Button>
    );
  }
);

ApplePlusButton.displayName = "ApplePlusButton";

export { ApplePlusButton, Plus };
