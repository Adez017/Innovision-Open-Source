"use client";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, TrendingUp, TrendingDown, Calendar, Users, Crown, Medal, Award, Minus } from "lucide-react";

export default function Leaderboard({ currentUserId }) {
  const [leaderboard, setLeaderboard] = useState({
    daily: [],
    weekly: [],
    allTime: []
  });
  const [previousRanks, setPreviousRanks] = useState({});
  const [animatingUsers, setAnimatingUsers] = useState(new Set());
  const isFirstLoad = useRef(true);

  useEffect(() => {
    fetchLeaderboard();

    // Refresh leaderboard every 10 seconds for real-time updates
    const interval = setInterval(fetchLeaderboard, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/gamification/leaderboard");
      const data = await res.json();

      if (data.error) {
        setLeaderboard({
          daily: [],
          weekly: [],
          allTime: []
        });
        return;
      }

      // Track rank changes for animations
      if (!isFirstLoad.current) {
        const newPreviousRanks = {};
        const newAnimating = new Set();

        ["daily", "weekly", "allTime"].forEach(period => {
          data[period]?.forEach((user, idx) => {
            const prevRank = previousRanks[`${period}_${user.id}`];
            const newRank = idx + 1;

            if (prevRank !== undefined && prevRank !== newRank) {
              newAnimating.add(`${period}_${user.id}`);
              // Clear animation after 2 seconds
              setTimeout(() => {
                setAnimatingUsers(prev => {
                  const next = new Set(prev);
                  next.delete(`${period}_${user.id}`);
                  return next;
                });
              }, 2000);
            }

            newPreviousRanks[`${period}_${user.id}`] = newRank;
          });
        });

        setAnimatingUsers(newAnimating);
        setPreviousRanks(newPreviousRanks);
      } else {
        // First load - just store ranks
        const initialRanks = {};
        ["daily", "weekly", "allTime"].forEach(period => {
          data[period]?.forEach((user, idx) => {
            initialRanks[`${period}_${user.id}`] = idx + 1;
          });
        });
        setPreviousRanks(initialRanks);
        isFirstLoad.current = false;
      }

      setLeaderboard(data);
    } catch (error) {
      setLeaderboard({
        daily: [],
        weekly: [],
        allTime: []
      });
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankChange = (userId, period, currentRank) => {
    const prevRank = previousRanks[`${period}_${userId}`];
    if (prevRank === undefined || prevRank === currentRank) return null;

    const change = prevRank - currentRank;
    if (change > 0) {
      return (
        <div className="flex items-center text-green-500 text-xs font-semibold animate-bounce">
          <TrendingUp className="h-3 w-3 mr-0.5" />
          +{change}
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-red-500 text-xs font-semibold">
          <TrendingDown className="h-3 w-3 mr-0.5" />
          {change}
        </div>
      );
    }
  };

  const LeaderboardList = ({ users, period }) => {
    if (!users || users.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <Trophy className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p>No data available yet.</p>
          <p className="text-sm">Complete courses to appear on the leaderboard!</p>
        </div>
      );
    }

    // Find current user's rank
    const currentUserRank = users.findIndex(u => u.id === currentUserId) + 1;

    return (
      <div className="space-y-2">
        {/* Current user's rank summary if not in top 10 */}
        {currentUserRank > 10 && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700 dark:text-blue-300">Your Rank</span>
              <span className="font-bold text-blue-700 dark:text-blue-300">#{currentUserRank}</span>
            </div>
          </div>
        )}

        {users.slice(0, 10).map((user, idx) => {
          const isCurrentUser = user.id === currentUserId;
          const rank = idx + 1;
          const isAnimating = animatingUsers.has(`${period}_${user.id}`);
          const rankChange = getRankChange(user.id, period, rank);

          return (
            <div
              key={user.id}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                ${isCurrentUser
                  ? "bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-2 border-blue-400 dark:border-blue-600 shadow-md"
                  : "border border-border hover:bg-accent/50"
                }
                ${isAnimating ? "animate-pulse scale-[1.02]" : ""}
                ${rank <= 3 ? "bg-linear-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-950/20 dark:to-orange-950/20" : ""}
              `}
            >
              {/* Rank */}
              <div className="w-10 flex flex-col items-center">
                {getRankIcon(rank)}
                {rankChange}
              </div>

              {/* Avatar */}
              <div className="relative">
                <Avatar className={`${rank <= 3 ? "ring-2 ring-yellow-400" : ""} ${isCurrentUser ? "ring-2 ring-blue-500" : ""}`}>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className={rank === 1 ? "bg-yellow-100 text-yellow-700" : ""}>
                    {user.name?.[0]?.toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                {rank === 1 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Crown className="h-2.5 w-2.5 text-yellow-900" />
                  </div>
                )}
              </div>

              {/* User info */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold flex items-center gap-2 truncate">
                  <span className={isCurrentUser ? "text-blue-700 dark:text-blue-300" : ""}>
                    {user.name || "Anonymous"}
                  </span>
                  {isCurrentUser && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs">
                      You
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>Lvl {user.level || 1}</span>
                  <Minus className="h-3 w-3" />
                  <span>{user.coursesCompleted || 0} courses</span>
                </div>
              </div>

              {/* XP */}
              <div className="text-right">
                <div className={`font-bold text-lg ${rank === 1 ? "text-yellow-600 dark:text-yellow-400" : ""}`}>
                  {(user.xp || 0).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">XP</div>
              </div>
            </div>
          );
        })}

        {/* Show more indicator */}
        {users.length > 10 && (
          <div className="text-center py-2 text-sm text-muted-foreground">
            +{users.length - 10} more learners
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Leaderboard
        </CardTitle>
        <CardDescription className="text-xs">Compete with other learners</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <TabsList className="grid w-full grid-cols-3 h-9">
            <TabsTrigger value="daily" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Today
            </TabsTrigger>
            <TabsTrigger value="weekly" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Week
            </TabsTrigger>
            <TabsTrigger value="allTime" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              All Time
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="mt-3">
            <LeaderboardList users={leaderboard.daily} period="daily" />
          </TabsContent>

          <TabsContent value="weekly" className="mt-3">
            <LeaderboardList users={leaderboard.weekly} period="weekly" />
          </TabsContent>

          <TabsContent value="allTime" className="mt-3">
            <LeaderboardList users={leaderboard.allTime} period="allTime" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
