"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { Flame } from "lucide-react";

// CSS-based fire animation as fallback
const CSSFireAnimation = ({ size = "md", intensity = 1 }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      {/* Base flame */}
      <div
        className="absolute animate-pulse"
        style={{
          animationDuration: `${0.5 / intensity}s`,
        }}
      >
        <Flame
          className={`${sizeClasses[size]} text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]`}
          style={{
            filter: `drop-shadow(0 0 ${4 * intensity}px rgba(249,115,22,0.8))`,
          }}
        />
      </div>
      {/* Glow effect */}
      <div
        className="absolute rounded-full animate-ping opacity-30"
        style={{
          width: "80%",
          height: "80%",
          background: "radial-gradient(circle, rgba(249,115,22,0.6) 0%, transparent 70%)",
          animationDuration: `${1 / intensity}s`,
        }}
      />
    </div>
  );
};

// Animated fire particles
const FireParticles = ({ count = 5 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float-up"
          style={{
            left: `${20 + Math.random() * 60}%`,
            bottom: "20%",
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${1 + Math.random()}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function StreakFire({
  streak = 0,
  size = "md",
  showLabel = true,
  showParticles = true,
  animate = true,
}) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [intensity, setIntensity] = useState(1);

  // Calculate intensity based on streak
  useEffect(() => {
    if (streak >= 30) {
      setIntensity(3);
    } else if (streak >= 7) {
      setIntensity(2);
    } else if (streak >= 1) {
      setIntensity(1);
    } else {
      setIntensity(0.5);
    }
  }, [streak]);

  // Milestone celebrations
  useEffect(() => {
    if (streak === 7 || streak === 30 || streak === 100 || streak === 365) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [streak]);

  const getStreakColor = () => {
    if (streak >= 30) return "text-red-500";
    if (streak >= 7) return "text-orange-500";
    if (streak >= 1) return "text-yellow-500";
    return "text-gray-400";
  };

  const getStreakLabel = () => {
    if (streak >= 365) return "🔥 Legendary!";
    if (streak >= 100) return "🔥 On Fire!";
    if (streak >= 30) return "🔥 Blazing!";
    if (streak >= 7) return "🔥 Hot!";
    if (streak >= 1) return "🔥 Warming up";
    return "Start your streak!";
  };

  if (!animate) {
    return (
      <div className="flex items-center gap-2">
        <Flame className={`w-5 h-5 ${getStreakColor()}`} />
        {showLabel && <span className="font-bold">{streak}</span>}
      </div>
    );
  }

  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="absolute -inset-4 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-gradient-radial from-orange-500/20 to-transparent animate-pulse rounded-full" />
          <span className="absolute -top-8 text-sm font-bold text-orange-500 animate-bounce">
            {streak} Day Streak! 🎉
          </span>
        </div>
      )}

      {/* Fire animation */}
      <div className="relative">
        <CSSFireAnimation size={size} intensity={intensity} />
        {showParticles && streak >= 7 && <FireParticles count={Math.min(streak / 5, 10)} />}
      </div>

      {/* Streak count */}
      {showLabel && (
        <div className="mt-1 text-center">
          <span className={`font-bold text-lg ${getStreakColor()}`}>{streak}</span>
          <p className="text-xs text-muted-foreground">{getStreakLabel()}</p>
        </div>
      )}
    </div>
  );
}

// Hook for streak fire effects
export function useStreakFire(currentStreak) {
  const [previousStreak, setPreviousStreak] = useState(currentStreak);
  const [milestone, setMilestone] = useState(null);

  useEffect(() => {
    // Check for milestone achievements
    const milestones = [7, 30, 100, 365];

    for (const m of milestones) {
      if (previousStreak < m && currentStreak >= m) {
        setMilestone(m);
        setTimeout(() => setMilestone(null), 5000);
        break;
      }
    }

    setPreviousStreak(currentStreak);
  }, [currentStreak, previousStreak]);

  return { milestone };
}
