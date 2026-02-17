"use client";
import { useAuth } from "@/contexts/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, TrendingUp, Target, Brain, Sparkles } from "lucide-react";
import GamificationDashboard from "@/components/gamification/GamificationDashboard";
import Leaderboard from "@/components/gamification/Leaderboard";
import DailyChallenges from "@/components/gamification/DailyChallenges";
import StreakCalendar from "@/components/gamification/StreakCalendar";
import XPChart from "@/components/gamification/XPChart";
import SkillTree from "@/components/gamification/SkillTree";
import { PageBackground, GridPattern, PageHeader, ScrollReveal } from "@/components/ui/PageWrapper";

export default function GamificationPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <PageBackground />
        <p className="text-muted-foreground relative z-10">Please login to view your progress</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 relative">
      <PageBackground />
      <GridPattern opacity={0.02} />

      <div className="max-w-400 mx-auto relative z-10">
        <PageHeader
          title="Your Progress"
          description="Track achievements, compete, and level up!"
          icon={Trophy}
          iconColor="text-yellow-500"
          badge={<><Sparkles className="h-3.5 w-3.5" /> Gamification</>}
        />

        <ScrollReveal delay={100}>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-background">
                <Trophy className="h-3 w-3 mr-1" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs data-[state=active]:bg-background">
                <TrendingUp className="h-3 w-3 mr-1" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="challenges" className="text-xs data-[state=active]:bg-background">
                <Target className="h-3 w-3 mr-1" />
                Challenges
              </TabsTrigger>
              <TabsTrigger value="skills" className="text-xs data-[state=active]:bg-background">
                <Brain className="h-3 w-3 mr-1" />
                Skills
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-0">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-3">
                  <GamificationDashboard userId={user.email} />
                </div>

                <div className="lg:col-span-1">
                  <Leaderboard currentUserId={user.email} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-0">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <XPChart userId={user.email} />
                </div>
                <div className="lg:col-span-3">
                  <StreakCalendar userId={user.email} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <DailyChallenges userId={user.email} />
                </div>
                <div className="lg:col-span-1">
                  <Leaderboard currentUserId={user.email} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-0">
              <div className="max-w-4xl mx-auto">
                <SkillTree />
              </div>
            </TabsContent>
          </Tabs>
        </ScrollReveal>
      </div>
    </div>
  );
}
