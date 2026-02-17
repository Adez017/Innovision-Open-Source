"use client";

import { useState, useEffect } from "react";
import { Zap, Flame, Star, Crown } from "lucide-react";

const COMBO_TIERS = [
  { min: 2, max: 4, multiplier: 2, label: "2x", color: "text-blue-500", bg: "bg-blue-500", icon: Zap },
  { min: 5, max: 9, multiplier: 3, label: "3x", color: "text-purple-500", bg: "bg-purple-500", icon: Flame },
  { min: 10, max: 19, multiplier: 4, label: "4x", color: "text-orange-500", bg: "bg-orange-500", icon: Star },
  { min: 20, max: Infinity, multiplier: 5, label: "5x", color: "text-red-500", bg: "bg-red-500", icon: Crown },
];

export function getComboTier(streak) {
  return COMBO_TIERS.find(tier => streak >= tier.min && streak <= tier.max) || null;
}

export function getMultiplier(streak) {
  const tier = getComboTier(streak);
  return tier ? tier.multiplier : 1;
}

export default function ComboMultiplier({
  combo = 0,
  show = false,
  position = "top-right" // top-right, top-center, bottom-right
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const tier = getComboTier(combo);

  useEffect(() => {
    if (show && tier) {
      setIsVisible(true);
      setAnimationKey(prev => prev + 1);

      // Hide after animation
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [show, combo, tier]);

  if (!isVisible || !tier) return null;

  const IconComponent = tier.icon;

  const positionClasses = {
    "top-right": "top-20 right-4",
    "top-center": "top-20 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-20 right-4",
  };

  return (
    <div
      key={animationKey}
      className={`fixed ${positionClasses[position]} z-50 pointer-events-none`}
    >
      <div className="animate-combo-popup">
        {/* Main combo display */}
        <div className={`
          flex items-center gap-2 px-4 py-3 rounded-xl
          ${tier.bg} text-white font-bold text-xl
          shadow-2xl border-2 border-white/30
          animate-combo-pulse
        `}>
          <IconComponent className="h-6 w-6 animate-spin-slow" />
          <span className="tracking-wider">{tier.label} COMBO!</span>
          <IconComponent className="h-6 w-6 animate-spin-slow" />
        </div>

        {/* Streak count */}
        <div className="text-center mt-2">
          <span className={`text-sm font-semibold ${tier.color} drop-shadow-lg`}>
            {combo} correct in a row!
          </span>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-visible pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${tier.bg} animate-combo-particle`}
              style={{
                left: `${20 + i * 12}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Inline combo indicator for quiz UI
export function ComboIndicator({ combo = 0, className = "" }) {
  const tier = getComboTier(combo);

  if (!tier) return null;

  const IconComponent = tier.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${tier.bg}/20 ${tier.color} font-bold text-sm animate-pulse ${className}`}>
      <IconComponent className="h-4 w-4" />
      <span>{tier.label}</span>
      <span className="text-xs opacity-70">({combo})</span>
    </div>
  );
}

// Mini combo badge
export function ComboBadge({ combo = 0 }) {
  const tier = getComboTier(combo);

  if (!tier) return null;

  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${tier.bg} text-white font-bold text-xs shadow-lg`}>
      {tier.label}
    </span>
  );
}
