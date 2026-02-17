import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Code,
  Crown,
  FlameIcon as Fire,
  Gift,
  Medal,
  Star,
  Trophy,
  Zap,
} from "lucide-react"

const achievements = [
  {
    id: "1",
    name: "First Blood",
    description: "Solved your first problem",
    icon: CheckCircle,
    date: "Jan 15, 2023",
    unlocked: true,
  },
  {
    id: "2",
    name: "Persistence",
    description: "Maintained a 7-day streak",
    icon: Calendar,
    date: "Feb 2, 2023",
    unlocked: true,
  },
  {
    id: "3",
    name: "Dedication",
    description: "Maintained a 30-day streak",
    icon: Fire,
    date: "Mar 5, 2023",
    unlocked: true,
  },
  {
    id: "4",
    name: "Problem Solver",
    description: "Solved 50 problems",
    icon: Code,
    date: "Apr 12, 2023",
    unlocked: true,
  },
  {
    id: "5",
    name: "Intermediate",
    description: "Solved 100 problems",
    icon: Award,
    date: "Jun 23, 2023",
    unlocked: true,
  },
  {
    id: "6",
    name: "Advanced",
    description: "Solved 200 problems",
    icon: Trophy,
    date: "Oct 8, 2023",
    unlocked: true,
  },
  {
    id: "7",
    name: "Hard Hitter",
    description: "Solved 10 hard problems",
    icon: Zap,
    date: "Aug 17, 2023",
    unlocked: true,
  },
  {
    id: "8",
    name: "Contest Participant",
    description: "Participated in 5 contests",
    icon: Medal,
    date: "Jul 30, 2023",
    unlocked: true,
  },
  {
    id: "9",
    name: "Top 25%",
    description: "Ranked in the top 25% in a contest",
    icon: Crown,
    date: "Sep 14, 2023",
    unlocked: true,
  },
  {
    id: "10",
    name: "Centurion",
    description: "Maintained a 100-day streak",
    icon: Star,
    date: "Nov 2, 2023",
    unlocked: true,
  },
  {
    id: "11",
    name: "Language Master",
    description: "Solved problems in 5 different languages",
    icon: BookOpen,
    date: "Dec 5, 2023",
    unlocked: false,
  },
  {
    id: "12",
    name: "Elite",
    description: "Solved 500 problems",
    icon: Gift,
    date: "Not unlocked yet",
    unlocked: false,
  },
]

export function Achievements() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-center ${achievement.unlocked ? "" : "opacity-50"
            }`}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${achievement.unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              }`}
          >
            <achievement.icon className="h-6 w-6" />
          </div>
          <h3 className="font-medium">{achievement.name}</h3>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
          <p className="text-xs text-muted-foreground">{achievement.date}</p>
        </div>
      ))}
    </div>
  )
}  