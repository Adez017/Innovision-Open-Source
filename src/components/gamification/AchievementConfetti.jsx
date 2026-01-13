"use client";

import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

// XP milestones that trigger celebrations
const XP_MILESTONES = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

// Level up milestones
const LEVEL_MILESTONES = [5, 10, 15, 20, 25, 50, 100];

export const useAchievementConfetti = () => {
  const fireConfetti = useCallback((type = "default") => {
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    switch (type) {
      case "xp_milestone":
        // Gold confetti for XP milestones
        confetti({
          ...defaults,
          particleCount: 100,
          spread: 70,
          colors: ["#FFD700", "#FFA500", "#FF8C00", "#FFB347"],
        });
        break;

      case "level_up":
        // Multi-burst celebration for level up
        const duration = 2000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors: ["#6366f1", "#8b5cf6", "#a855f7"],
            zIndex: 9999,
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            colors: ["#6366f1", "#8b5cf6", "#a855f7"],
            zIndex: 9999,
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
        break;

      case "badge":
        // Star-shaped burst for badges
        confetti({
          ...defaults,
          particleCount: 150,
          spread: 100,
          shapes: ["star"],
          colors: ["#22c55e", "#10b981", "#14b8a6"],
        });
        break;

      case "streak":
        // Fire colors for streak achievements
        confetti({
          ...defaults,
          particleCount: 80,
          spread: 60,
          colors: ["#f97316", "#ef4444", "#eab308", "#dc2626"],
        });
        break;

      case "course_complete":
        // Big celebration for course completion
        const count = 200;
        const defaultsComplete = {
          origin: { y: 0.7 },
          zIndex: 9999,
        };

        function fire(particleRatio, opts) {
          confetti({
            ...defaultsComplete,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
          });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
        break;

      default:
        confetti({
          ...defaults,
          particleCount: 50,
          spread: 60,
        });
    }
  }, []);

  const checkXPMilestone = useCallback((oldXP, newXP) => {
    for (const milestone of XP_MILESTONES) {
      if (oldXP < milestone && newXP >= milestone) {
        return milestone;
      }
    }
    return null;
  }, []);

  const checkLevelMilestone = useCallback((oldLevel, newLevel) => {
    for (const milestone of LEVEL_MILESTONES) {
      if (oldLevel < milestone && newLevel >= milestone) {
        return milestone;
      }
    }
    return null;
  }, []);

  return {
    fireConfetti,
    checkXPMilestone,
    checkLevelMilestone,
    XP_MILESTONES,
    LEVEL_MILESTONES,
  };
};

// Component version for direct use
export default function AchievementConfetti({ trigger, type = "default" }) {
  const { fireConfetti } = useAchievementConfetti();

  useEffect(() => {
    if (trigger) {
      fireConfetti(type);
    }
  }, [trigger, type, fireConfetti]);

  return null;
}
