"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return (<TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />);
}

function Tooltip({
  ...props
}) {
  return (
    (<TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>)
  );
}

function TooltipTrigger({
  ...props
}) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 6,
  children,
  variant = "default",
  ...props
}) {
  const variants = {
    default: "bg-primary text-primary-foreground",
    dark: "bg-gray-900 text-white",
    light: "bg-white text-gray-900 border border-gray-200 shadow-lg",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-black",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    (<TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          // Base styles
          "z-50 w-fit max-w-xs rounded-lg px-3 py-2 text-sm font-medium text-balance",
          // Variant
          variants[variant] || variants.default,
          // Enhanced animations
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          // Bouncy slide animations based on position
          "data-[side=bottom]:slide-in-from-top-3 data-[side=bottom]:animate-bounce-in-down",
          "data-[side=left]:slide-in-from-right-3 data-[side=left]:animate-bounce-in-left",
          "data-[side=right]:slide-in-from-left-3 data-[side=right]:animate-bounce-in-right",
          "data-[side=top]:slide-in-from-bottom-3 data-[side=top]:animate-bounce-in-up",
          // Shadow and glow
          "shadow-xl",
          // Transition
          "transition-all duration-200 ease-out",
          className
        )}
        {...props}>
        {children}
        <TooltipPrimitive.Arrow
          className={cn(
            "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px]",
            variant === "default" && "bg-primary fill-primary",
            variant === "dark" && "bg-gray-900 fill-gray-900",
            variant === "light" && "bg-white fill-white border-l border-b border-gray-200",
            variant === "gradient" && "bg-pink-500 fill-pink-500",
            variant === "success" && "bg-green-500 fill-green-500",
            variant === "warning" && "bg-yellow-500 fill-yellow-500",
            variant === "error" && "bg-red-500 fill-red-500",
            variant === "info" && "bg-blue-500 fill-blue-500",
          )}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>)
  );
}

// Animated tooltip with icon support
function AnimatedTooltip({
  children,
  content,
  icon,
  variant = "default",
  side = "top",
  className,
  ...props
}) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent variant={variant} side={side} className={className}>
        <div className="flex items-center gap-2">
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{content}</span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, AnimatedTooltip }
