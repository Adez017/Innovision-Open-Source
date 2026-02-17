"use client";

import * as React from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { cn } from "@/lib/utils";

const AnimatedProgress = React.forwardRef(
  ({
    className,
    value = 0,
    showValue = false,
    color = "primary",
    size = "default",
    delay = 0,
    glow = false,
    striped = false,
    ...props
  }, ref) => {
    const [hasAnimated, setHasAnimated] = React.useState(false);

    // Animate on mount and value change
    const spring = useSpring({
      from: { width: hasAnimated ? undefined : 0 },
      to: { width: Math.min(100, Math.max(0, value)) },
      delay: hasAnimated ? 0 : delay,
      config: { ...config.gentle, duration: 800 },
      onRest: () => setHasAnimated(true),
    });

    // Color variants
    const colorVariants = {
      primary: "bg-primary",
      blue: "bg-blue-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      orange: "bg-gradient-to-r from-yellow-500 to-orange-500",
      purple: "bg-purple-500",
      pink: "bg-pink-500",
      gradient: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
      success: "bg-gradient-to-r from-green-400 to-emerald-500",
      xp: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
    };

    // Size variants
    const sizeVariants = {
      sm: "h-1",
      default: "h-2",
      md: "h-3",
      lg: "h-4",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-secondary",
          sizeVariants[size],
          className
        )}
        {...props}
      >
        <animated.div
          className={cn(
            "h-full rounded-full transition-colors",
            colorVariants[color],
            glow && "shadow-lg shadow-current",
            striped && "bg-stripes"
          )}
          style={{
            width: spring.width.to((w) => `${w}%`),
          }}
        />

        {/* Shimmer effect */}
        {value > 0 && (
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="shimmer-effect absolute inset-0" />
          </div>
        )}

        {/* Value display */}
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-medium text-white drop-shadow-sm">
              {Math.round(value)}%
            </span>
          </div>
        )}
      </div>
    );
  }
);

AnimatedProgress.displayName = "AnimatedProgress";

// Multi-segment progress bar for showing multiple values
const MultiProgress = React.forwardRef(
  ({ className, segments = [], size = "default", delay = 0, ...props }, ref) => {
    const sizeVariants = {
      sm: "h-1",
      default: "h-2",
      md: "h-3",
      lg: "h-4",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-secondary flex",
          sizeVariants[size],
          className
        )}
        {...props}
      >
        {segments.map((segment, index) => {
          const segmentSpring = useSpring({
            from: { width: 0 },
            to: { width: segment.value },
            delay: delay + index * 100,
            config: { ...config.gentle, duration: 600 },
          });

          return (
            <animated.div
              key={index}
              className={cn("h-full first:rounded-l-full last:rounded-r-full", segment.color)}
              style={{
                width: segmentSpring.width.to((w) => `${w}%`),
              }}
              title={segment.label}
            />
          );
        })}
      </div>
    );
  }
);

MultiProgress.displayName = "MultiProgress";

// Circular progress component
const CircularProgress = ({
  value = 0,
  size = 60,
  strokeWidth = 6,
  color = "primary",
  showValue = true,
  delay = 0,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const spring = useSpring({
    from: { progress: 0 },
    to: { progress: Math.min(100, Math.max(0, value)) },
    delay,
    config: { ...config.gentle, duration: 1000 },
  });

  const colorVariants = {
    primary: "stroke-primary",
    blue: "stroke-blue-500",
    green: "stroke-green-500",
    yellow: "stroke-yellow-500",
    orange: "stroke-orange-500",
    purple: "stroke-purple-500",
    xp: "stroke-yellow-500",
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-secondary"
        />
        {/* Progress circle */}
        <animated.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={colorVariants[color]}
          strokeDasharray={circumference}
          strokeDashoffset={spring.progress.to(
            (p) => circumference - (p / 100) * circumference
          )}
        />
      </svg>
      {showValue && (
        <animated.span className="absolute text-xs font-semibold">
          {spring.progress.to((p) => `${Math.round(p)}%`)}
        </animated.span>
      )}
    </div>
  );
};

export { AnimatedProgress, MultiProgress, CircularProgress };
