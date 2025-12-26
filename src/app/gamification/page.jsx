"use client";
import { useAuth } from "@/contexts/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, TrendingUp, Target, Brain } from "lucide-react";
import GamificationDashboard from "@/components/gamification/GamificationDashboard";
import Leaderboard from "@/components/gamification/Leaderboard";
import DailyChallenges from "@/components/gamification/DailyChallenges";
import StreakCalendar from "@/components/gamification/StreakCalendar";
import XPChart from "@/components/gamification/XPChart";
import SkillTree from "@/components/gamification/SkillTree";

export default function GamificationPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Please login to view your progress</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1">Your Progress</h1>
          <p className="text-sm text-muted-foreground">Track achievements, compete, and level up!</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="text-xs">
              <Trophy className="h-3 w-3 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="challenges" className="text-xs">
              <Target className="h-3 w-3 mr-1" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">
              <Brain className="h-3 w-3 mr-1" />
              Skills
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-0">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
                <GamificationDashboard userId={session.user.email} />
              </div>

              <div className="lg:col-span-1">
                <Leaderboard currentUserId={session.user.email} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-0">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <XPChart userId={session.user.email} />
              </div>
              <div className="lg:col-span-3">
                <StreakCalendar userId={session.user.email} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <DailyChallenges userId={session.user.email} />
              </div>
              <div className="lg:col-span-1">
                <Leaderboard currentUserId={session.user.email} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-0">
            <div className="max-w-4xl mx-auto">
              <SkillTree />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
