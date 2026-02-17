"use client";

import { toast } from "sonner";
import {
  Trophy, Star, Flame, Zap, Crown, Award, Medal, Target,
  BookOpen, GraduationCap, Sparkles, Heart, Users, Clock,
  TrendingUp, CheckCircle2, Gift, Rocket
} from "lucide-react";

const ICON_MAP = {
  trophy: Trophy,
  star: Star,
  flame: Flame,
  zap: Zap,
  crown: Crown,
  award: Award,
  medal: Medal,
  target: Target,
  book: BookOpen,
  graduation: GraduationCap,
  sparkles: Sparkles,
  heart: Heart,
  users: Users,
  clock: Clock,
  trending: TrendingUp,
  check: CheckCircle2,
  gift: Gift,
  rocket: Rocket,
};

const ACHIEVEMENT_STYLES = {
  badge: {
    gradient: "from-yellow-500 to-orange-500",
    iconBg: "bg-yellow-500",
    textColor: "text-yellow-500",
  },
  milestone: {
    gradient: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-500",
    textColor: "text-purple-500",
  },
  streak: {
    gradient: "from-orange-500 to-red-500",
    iconBg: "bg-orange-500",
    textColor: "text-orange-500",
  },
  level: {
    gradient: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500",
    textColor: "text-blue-500",
  },
  xp: {
    gradient: "from-green-500 to-emerald-500",
    iconBg: "bg-green-500",
    textColor: "text-green-500",
  },
  quest: {
    gradient: "from-indigo-500 to-purple-500",
    iconBg: "bg-indigo-500",
    textColor: "text-indigo-500",
  },
};

/**
 * Show achievement toast notification (Xbox/PlayStation style)
 */
export function showAchievementToast({
  title,
  description,
  xp = 0,
  icon = "trophy",
  type = "badge",
  duration = 5000,
}) {
  const IconComponent = ICON_MAP[icon] || Trophy;
  const style = ACHIEVEMENT_STYLES[type] || ACHIEVEMENT_STYLES.badge;

  toast.custom(
    (t) => (
      <div
        className={`
          flex items-center gap-4 p-4 rounded-xl
          bg-linear-to-r ${style.gradient}
          shadow-2xl border border-white/20
          animate-slide-in-right
          min-w-[320px] max-w-100
        `}
      >
        {/* Icon */}
        <div className="shrink-0 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <IconComponent className="h-7 w-7 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
              Achievement Unlocked
            </span>
          </div>
          <h4 className="text-white font-bold text-lg truncate">
            {title}
          </h4>
          {description && (
            <p className="text-white/80 text-sm truncate">
              {description}
            </p>
          )}
        </div>

        {/* XP Badge */}
        {xp > 0 && (
          <div className="shrink-0 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
            <div className="text-white font-bold text-lg">+{xp}</div>
            <div className="text-white/70 text-xs">XP</div>
          </div>
        )}
      </div>
    ),
    {
      duration,
      position: "top-right",
    }
  );
}

/**
 * Pre-built achievement notifications
 */
export const achievements = {
  // Badge achievements
  firstCourse: () => showAchievementToast({
    title: "First Steps",
    description: "Completed your first course",
    xp: 50,
    icon: "book",
    type: "badge",
  }),

  weekStreak: () => showAchievementToast({
    title: "Dedicated Learner",
    description: "7-day learning streak!",
    xp: 100,
    icon: "flame",
    type: "streak",
  }),

  monthStreak: () => showAchievementToast({
    title: "Unstoppable",
    description: "30-day learning streak!",
    xp: 500,
    icon: "flame",
    type: "streak",
  }),

  perfectQuiz: () => showAchievementToast({
    title: "Perfectionist",
    description: "100% on a quiz!",
    xp: 35,
    icon: "target",
    type: "badge",
  }),

  // Milestone achievements
  xp100: () => showAchievementToast({
    title: "Getting Started",
    description: "Earned 100 XP",
    xp: 10,
    icon: "sparkles",
    type: "milestone",
  }),

  xp500: () => showAchievementToast({
    title: "Rising Star",
    description: "Earned 500 XP",
    xp: 25,
    icon: "star",
    type: "milestone",
  }),

  xp1000: () => showAchievementToast({
    title: "XP Master",
    description: "Earned 1,000 XP",
    xp: 50,
    icon: "crown",
    type: "milestone",
  }),

  xp5000: () => showAchievementToast({
    title: "XP Legend",
    description: "Earned 5,000 XP",
    xp: 100,
    icon: "trophy",
    type: "milestone",
  }),

  // Level achievements
  level5: () => showAchievementToast({
    title: "Level 5",
    description: "You're making progress!",
    xp: 50,
    icon: "trending",
    type: "level",
  }),

  level10: () => showAchievementToast({
    title: "Level 10",
    description: "Double digits!",
    xp: 100,
    icon: "zap",
    type: "level",
  }),

  level25: () => showAchievementToast({
    title: "Level 25",
    description: "Quarter century!",
    xp: 250,
    icon: "award",
    type: "level",
  }),

  // Quest achievements
  dailyQuestComplete: () => showAchievementToast({
    title: "Quest Complete",
    description: "Finished a daily quest",
    xp: 0,
    icon: "check",
    type: "quest",
  }),

  allQuestsComplete: () => showAchievementToast({
    title: "Quest Master",
    description: "All daily quests complete!",
    xp: 50,
    icon: "gift",
    type: "quest",
  }),

  // Special achievements
  nightOwl: () => showAchievementToast({
    title: "Night Owl",
    description: "Studying after midnight",
    xp: 15,
    icon: "clock",
    type: "badge",
  }),

  earlyBird: () => showAchievementToast({
    title: "Early Bird",
    description: "Studying before 6 AM",
    xp: 15,
    icon: "clock",
    type: "badge",
  }),

  socialButterfly: () => showAchievementToast({
    title: "Social Butterfly",
    description: "Helped 10 students",
    xp: 100,
    icon: "users",
    type: "badge",
  }),

  speedDemon: () => showAchievementToast({
    title: "Speed Demon",
    description: "Completed a course in 1 day",
    xp: 75,
    icon: "rocket",
    type: "badge",
  }),
};

export default showAchievementToast;
