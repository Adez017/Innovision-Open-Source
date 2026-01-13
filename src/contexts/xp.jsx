"use client";

import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/contexts/auth";
import confetti from "canvas-confetti";

const xpContext = createContext();

// XP milestones that trigger celebrations
const XP_MILESTONES = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

export const XpProvider = ({ children }) => {
  const { user } = useAuth();
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [show, setShow] = useState(false);
  const [changed, setChanged] = useState(0);
  const prevXpRef = useRef(0);
  const prevLevelRef = useRef(1);

  // Fire confetti for achievements
  const fireConfetti = useCallback((type = "default") => {
    const defaults = { origin: { y: 0.7 }, zIndex: 9999 };

    switch (type) {
      case "xp_milestone":
        confetti({
          ...defaults,
          particleCount: 100,
          spread: 70,
          colors: ["#FFD700", "#FFA500", "#FF8C00", "#FFB347"],
        });
        break;

      case "level_up":
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
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
        break;

      default:
        confetti({ ...defaults, particleCount: 50, spread: 60 });
    }
  }, []);

  // Check for XP milestones
  const checkMilestones = useCallback((oldXP, newXP, oldLevel, newLevel) => {
    // Check XP milestones
    for (const milestone of XP_MILESTONES) {
      if (oldXP < milestone && newXP >= milestone) {
        fireConfetti("xp_milestone");
        break;
      }
    }

    // Check level up
    if (newLevel > oldLevel) {
      setTimeout(() => fireConfetti("level_up"), 500);
    }
  }, [fireConfetti]);

  async function change() {
    setShow(true);
    setTimeout(() => {
      setShow(false);
      setChanged(0);
    }, 2000);
  }

  const getXp = useCallback(async () => {
    if (!user?.email) return;

    try {
      const res = await fetch(`/api/gamification/stats?userId=${user.email}`);
      const data = await res.json();

      if (data && typeof data.xp === "number") {
        const xpDiff = data.xp - xp;
        const newLevel = data.level || Math.floor(data.xp / 1000) + 1;
        
        if (xpDiff > 0 && xp > 0) {
          setChanged(xpDiff);
          change();
          // Check for milestone achievements
          checkMilestones(prevXpRef.current, data.xp, prevLevelRef.current, newLevel);
        }
        
        prevXpRef.current = data.xp;
        prevLevelRef.current = newLevel;
        setXp(data.xp);
        setLevel(newLevel);
      }
    } catch (error) {
      console.error("Error fetching XP:", error);
    }
  }, [user, xp, checkMilestones]);

  const awardXP = useCallback(
    async (action, value = null) => {
      if (!user?.email) return;

      try {
        const res = await fetch("/api/gamification/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.email,
            action,
            value,
          }),
        });

        const result = await res.json();

        if (result.success) {
          // Refresh XP to show the update
          await getXp();
          return result;
        }
      } catch (error) {
        console.error("Error awarding XP:", error);
      }
    },
    [user, getXp]
  );

  useEffect(() => {
    if (user?.email) {
      getXp();

      // Poll for XP updates every 10 seconds for real-time feel
      const interval = setInterval(getXp, 10000);
      return () => clearInterval(interval);
    }
  }, [user, getXp]);

  return <xpContext.Provider value={{ getXp, awardXP, xp, level, show, changed, fireConfetti }}>{children}</xpContext.Provider>;
};

export default xpContext;
