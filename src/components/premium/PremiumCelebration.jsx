"use client";

import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import { Crown, Sparkles, Star, Zap } from "lucide-react";

export default function PremiumCelebration({ isOpen, onClose }) {
  const [showContent, setShowContent] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Play celebration sound
      playSound();

      // Fire confetti sequence
      fireConfettiSequence();

      // Show content after a delay
      setTimeout(() => setShowContent(true), 500);

      // Auto close after 6 seconds
      const timer = setTimeout(() => {
        onClose?.();
      }, 6000);

      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen, onClose]);

  const playSound = () => {
    try {
      // Create audio context for celebration sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Play a victory fanfare sequence
      const playNote = (frequency, startTime, duration, gain = 0.3) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(gain, audioContext.currentTime + startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startTime + duration);

        oscillator.start(audioContext.currentTime + startTime);
        oscillator.stop(audioContext.currentTime + startTime + duration);
      };

      // Victory fanfare notes
      playNote(523.25, 0, 0.15);     // C5
      playNote(659.25, 0.15, 0.15);  // E5
      playNote(783.99, 0.3, 0.15);   // G5
      playNote(1046.50, 0.45, 0.4);  // C6 (longer)
      playNote(783.99, 0.85, 0.15);  // G5
      playNote(1046.50, 1.0, 0.6);   // C6 (final, longest)

    } catch (error) {
      console.log("Audio not supported");
    }
  };

  const fireConfettiSequence = () => {
    const duration = 4000;
    const end = Date.now() + duration;

    // Gold and premium colors
    const colors = ["#FFD700", "#FFA500", "#FFE55C", "#FFCC00", "#F5D300", "#FFFFFF"];

    // Initial big burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors,
      zIndex: 10000,
    });

    // Side cannons
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        zIndex: 10000,
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        zIndex: 10000,
      });
    }, 300);

    // Continuous confetti rain
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 },
        colors: colors,
        zIndex: 10000,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 },
        colors: colors,
        zIndex: 10000,
      });
    }, 100);

    // Star bursts
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 360,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
        shapes: ["star"],
        zIndex: 10000,
      });
    }, 1000);

    // Final explosion
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 180,
        origin: { y: 0.5 },
        colors: colors,
        zIndex: 10000,
      });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Content */}
      <div className={`
        relative z-10 text-center transition-all duration-700
        ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-50"}
      `}>
        {/* Glowing crown */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 animate-ping">
            <Crown className="h-24 w-24 text-yellow-500/50" />
          </div>
          <div className="relative animate-bounce-slow">
            <Crown className="h-24 w-24 text-yellow-500 drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]" />
          </div>

          {/* Floating sparkles */}
          <Sparkles className="absolute -top-4 -left-4 h-8 w-8 text-yellow-400 animate-float-sparkle" />
          <Sparkles className="absolute -top-2 -right-6 h-6 w-6 text-yellow-300 animate-float-sparkle-delayed" />
          <Star className="absolute -bottom-2 -left-6 h-6 w-6 text-yellow-400 animate-float-sparkle-delayed-2" />
          <Zap className="absolute -bottom-4 -right-4 h-7 w-7 text-yellow-500 animate-float-sparkle" />
        </div>

        {/* Text */}
        <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">
          Welcome to <span className="text-yellow-500">Premium!</span>
        </h1>

        <p className="text-xl text-gray-300 mb-6 animate-slide-up-delayed">
          You now have unlimited access to all features
        </p>

        {/* Features unlocked */}
        <div className="flex flex-wrap justify-center gap-3 animate-slide-up-delayed-2">
          {["Unlimited Courses", "Full Curriculum", "All Features", "Priority Support"].map((feature, i) => (
            <span
              key={feature}
              className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-yellow-400 text-sm font-medium"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              ✓ {feature}
            </span>
          ))}
        </div>

        {/* Click to continue */}
        <p className="mt-8 text-gray-500 text-sm animate-pulse">
          Click anywhere to continue
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        @keyframes float-sparkle {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-10px) rotate(180deg); opacity: 0.7; }
        }
        .animate-float-sparkle {
          animation: float-sparkle 2s ease-in-out infinite;
        }
        .animate-float-sparkle-delayed {
          animation: float-sparkle 2s ease-in-out infinite 0.3s;
        }
        .animate-float-sparkle-delayed-2 {
          animation: float-sparkle 2s ease-in-out infinite 0.6s;
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-slide-up-delayed {
          animation: slide-up 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
        .animate-slide-up-delayed-2 {
          animation: slide-up 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

// Export a function to trigger the celebration
export const triggerPremiumCelebration = () => {
  const event = new CustomEvent("premiumCelebration");
  window.dispatchEvent(event);
};
