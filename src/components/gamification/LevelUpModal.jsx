"use client";

import { useState, useEffect } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import confetti from "canvas-confetti";
import { X, Star, Trophy, Zap, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleEffect from "./ParticleEffect";

const LEVEL_BADGES = {
  5: { icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/20", title: "Rising Star" },
  10: { icon: Zap, color: "text-blue-500", bg: "bg-blue-500/20", title: "Power Learner" },
  15: { icon: Trophy, color: "text-green-500", bg: "bg-green-500/20", title: "Knowledge Seeker" },
  20: { icon: Crown, color: "text-purple-500", bg: "bg-purple-500/20", title: "Scholar" },
  25: { icon: Sparkles, color: "text-pink-500", bg: "bg-pink-500/20", title: "Expert" },
  50: { icon: Crown, color: "text-amber-500", bg: "bg-amber-500/20", title: "Master" },
  100: { icon: Crown, color: "text-red-500", bg: "bg-red-500/20", title: "Legend" },
};

export default function LevelUpModal({
  isOpen,
  onClose,
  newLevel,
  xpGained = 0,
  totalXP = 0
}) {
  const [showParticles, setShowParticles] = useState(false);
  const [badgeRevealed, setBadgeRevealed] = useState(false);

  // Get badge for this level (if any)
  const badge = LEVEL_BADGES[newLevel];

  // Animation springs
  const modalSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.5) translateY(50px)" },
    to: {
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? "scale(1) translateY(0px)" : "scale(0.5) translateY(50px)"
    },
    config: config.wobbly,
  });

  const levelSpring = useSpring({
    from: { number: newLevel - 1 },
    to: { number: newLevel },
    delay: 500,
    config: { duration: 1000 },
  });

  const badgeSpring = useSpring({
    from: { opacity: 0, transform: "scale(0) rotate(-180deg)" },
    to: {
      opacity: badgeRevealed ? 1 : 0,
      transform: badgeRevealed ? "scale(1) rotate(0deg)" : "scale(0) rotate(-180deg)"
    },
    config: config.wobbly,
  });

  const glowSpring = useSpring({
    from: { boxShadow: "0 0 0px rgba(255, 215, 0, 0)" },
    to: { boxShadow: isOpen ? "0 0 60px rgba(255, 215, 0, 0.6)" : "0 0 0px rgba(255, 215, 0, 0)" },
    config: { duration: 1500 },
    loop: { reverse: true },
  });

  // Trigger effects when modal opens
  useEffect(() => {
    if (isOpen) {
      setShowParticles(true);

      // Fire confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ["#FFD700", "#FFA500", "#FF6B6B", "#4ECDC4"],
          zIndex: 9999,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ["#FFD700", "#FFA500", "#FF6B6B", "#4ECDC4"],
          zIndex: 9999,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Reveal badge after delay
      if (badge) {
        setTimeout(() => setBadgeRevealed(true), 1500);
      }

      // Hide particles after duration
      setTimeout(() => setShowParticles(false), 3000);
    } else {
      setBadgeRevealed(false);
    }
  }, [isOpen, badge]);

  if (!isOpen) return null;

  const BadgeIcon = badge?.icon || Star;

  return (
    <>
      <ParticleEffect active={showParticles} particleCount={60} duration={3000} />

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-90 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Modal */}
        <animated.div
          style={{ ...modalSpring, ...glowSpring }}
          className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border-2 border-yellow-500/50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="text-center">
            {/* Level up text */}
            <div className="mb-6">
              <p className="text-yellow-500 font-bold text-lg tracking-widest mb-2 flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5" /> LEVEL UP! <Sparkles className="h-5 w-5" />
              </p>

              {/* Animated level number */}
              <div className="relative inline-block">
                <animated.span
                  className="text-8xl font-black bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
                >
                  {levelSpring.number.to(n => Math.floor(n))}
                </animated.span>
                <div className="absolute -inset-4 bg-yellow-500/20 blur-2xl rounded-full -z-10" />
              </div>
            </div>

            {/* XP info */}
            <div className="mb-6 space-y-2">
              <p className="text-gray-300">
                You've reached <span className="text-yellow-500 font-bold">Level {newLevel}</span>!
              </p>
              <p className="text-sm text-gray-400">
                Total XP: <span className="text-green-400 font-semibold">{totalXP.toLocaleString()}</span>
              </p>
            </div>

            {/* Badge reveal (if milestone level) */}
            {badge && (
              <animated.div style={badgeSpring} className="mb-6">
                <div className={`inline-flex flex-col items-center p-4 rounded-xl ${badge.bg} border border-white/10`}>
                  <BadgeIcon className={`h-12 w-12 ${badge.color} mb-2`} />
                  <p className="text-white font-bold">{badge.title}</p>
                  <p className="text-xs text-gray-400">New Badge Unlocked!</p>
                </div>
              </animated.div>
            )}

            {/* Next level progress hint */}
            <div className="mb-6">
              <p className="text-xs text-gray-500">
                {500 - (totalXP % 500)} XP to Level {newLevel + 1}
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-linear-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(totalXP % 500) / 5}%` }}
                />
              </div>
            </div>

            {/* Continue button */}
            <Button
              onClick={onClose}
              className="w-full bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        </animated.div>
      </div>
    </>
  );
}
