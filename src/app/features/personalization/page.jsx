"use client";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, TrendingUp, Eye, Headphones, Hand, Crown } from "lucide-react";
import Link from "next/link";
import { usePersonalization } from "@/hooks/usePersonalization";
import { Progress } from "@/components/ui/progress";
import PremiumDialog from "@/components/PremiumDialog";
import { PageBackground, GridPattern, PageHeader, ScrollReveal, HoverCard } from "@/components/ui/PageWrapper";

export default function PersonalizationPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { profile, personalizationLoading } = usePersonalization();
  const [learningStyle, setLearningStyle] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [premiumStatus, setPremiumStatus] = useState({ isPremium: false });
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);

  useEffect(() => {
    const fetchPremiumStatus = async () => {
      if (user) {
        try {
          const res = await fetch("/api/premium/status");
          const data = await res.json();
          setPremiumStatus(data);

          if (!data.isPremium) {
            setShowPremiumDialog(true);
          }
        } catch (error) {
          console.error("Error fetching premium status:", error);
        }
      }
    };
    fetchPremiumStatus();
  }, [user]);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const detectLearningStyle = async () => {
    if (!user) return;

    setDetecting(true);
    try {
      const response = await fetch("/api/personalization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.email,
          action: "detectLearningStyle",
        }),
      });
      const data = await response.json();
      setLearningStyle(data.result);
    } catch (error) {
      console.error("Failed to detect learning style:", error);
    } finally {
      setDetecting(false);
    }
  };

  if (loading || personalizationLoading) {
    return <div className="p-8">Loading...</div>;
  }

  const learningStyles = {
    visual: {
      icon: <Eye className="w-8 h-8" />,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950",
      description: "You learn best through images, diagrams, and visual aids",
    },
    auditory: {
      icon: <Headphones className="w-8 h-8" />,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950",
      description: "You learn best through listening and verbal explanations",
    },
    kinesthetic: {
      icon: <Hand className="w-8 h-8" />,
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-950",
      description: "You learn best through hands-on practice and interaction",
    },
  };

  const detectedStyle = learningStyle || profile?.learningStyle;

  return (
    <div className="min-h-screen bg-background relative">
      <PageBackground variant="profile" />
      <GridPattern opacity={0.02} />

      <div className="max-w-6xl mx-auto p-6 space-y-6 relative z-10">
        <ScrollReveal>
          <div className="mb-6">
            <Link href="/features">
              <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Features
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <PageHeader
          icon={Brain}
          iconColor="text-indigo-500"
          title="AI-Powered Personalization"
          description="Advanced learning recommendations using reinforcement learning"
          badge="🧠 Premium Feature"
        />

        <PremiumDialog
          open={showPremiumDialog}
          onOpenChange={setShowPremiumDialog}
          feature="AI Personalization"
        />

        {!premiumStatus.isPremium ? (
          <ScrollReveal delay={100}>
            <div className="text-center p-6 sm:p-12 border-2 border-dashed rounded-xl bg-card/50 backdrop-blur-sm">
              <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h2 className="text-2xl font-bold mb-4">Premium Feature</h2>
              <p className="text-muted-foreground mb-6">
                AI-Powered Personalization is only available for Premium users.
              </p>
              <Button
                onClick={() => router.push("/premium")}
                className="bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
            </div>
          </ScrollReveal>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScrollReveal delay={100}>
                <HoverCard>
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="w-6 h-6 text-blue-500" />
                        Your Learning Profile
                      </CardTitle>
                      <CardDescription>AI-analyzed insights about your learning patterns</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {detectedStyle ? (
                        <div className={`p-6 rounded-lg ${learningStyles[detectedStyle]?.bg}`}>
                          <div className="flex items-center gap-4 mb-4">
                            <div className={learningStyles[detectedStyle]?.color}>
                              {learningStyles[detectedStyle]?.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold capitalize">{detectedStyle} Learner</h3>
                              <p className="text-sm text-muted-foreground">
                                {learningStyles[detectedStyle]?.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-8 border-2 border-dashed rounded-lg">
                          <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                          <p className="text-muted-foreground mb-4">
                            No learning style detected yet. Complete more activities to get personalized insights.
                          </p>
                          <Button onClick={detectLearningStyle} disabled={detecting}>
                            {detecting ? "Analyzing..." : "Detect My Learning Style"}
                          </Button>
                        </div>
                      )}

                      <div className="space-y-4">
                        <h4 className="font-semibold">Engagement Metrics</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Visual Content</span>
                              <span>{profile?.engagement?.imageInteractions || 0}</span>
                            </div>
                            <Progress value={(profile?.engagement?.imageInteractions || 0) * 10} />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Audio Content</span>
                              <span>{profile?.engagement?.audioInteractions || 0}</span>
                            </div>
                            <Progress value={(profile?.engagement?.audioInteractions || 0) * 10} />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Interactive Tasks</span>
                              <span>{profile?.engagement?.interactiveTasks || 0}</span>
                            </div>
                            <Progress value={(profile?.engagement?.interactiveTasks || 0) * 10} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </HoverCard>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <HoverCard>
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-green-500" />
                        Performance Insights
                      </CardTitle>
                      <CardDescription>How the AI adapts to your learning</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                          <h4 className="font-semibold mb-2 text-green-900 dark:text-green-100">
                            Reinforcement Learning
                          </h4>
                          <p className="text-sm text-green-800 dark:text-green-200">
                            The system learns from your interactions and continuously improves recommendations based on:
                          </p>
                          <ul className="list-disc list-inside text-sm mt-2 space-y-1 text-green-800 dark:text-green-200">
                            <li>Task completion rates</li>
                            <li>Time spent on activities</li>
                            <li>Quiz scores and performance</li>
                            <li>Content revisit patterns</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                          <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                            Adaptive Content Selection
                          </h4>
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            Based on your profile, the AI recommends:
                          </p>
                          <ul className="list-disc list-inside text-sm mt-2 space-y-1 text-blue-800 dark:text-blue-200">
                            <li>Optimal task types for your learning style</li>
                            <li>Difficulty levels matching your progress</li>
                            <li>Content formats you engage with most</li>
                            <li>Study patterns that maximize retention</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                          <h4 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">How It Works</h4>
                          <p className="text-sm text-purple-800 dark:text-purple-200">
                            Our Q-learning algorithm uses an epsilon-greedy strategy (90% exploit, 10% explore) to balance
                            between recommending proven effective content and discovering new learning opportunities.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </HoverCard>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={200}>
              <HoverCard>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Recent Learning Preferences</CardTitle>
                    <CardDescription>Top content types based on your interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {profile?.preferences && Object.keys(profile.preferences).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(profile.preferences)
                          .slice(0, 3)
                          .map(([context, actions], index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <h4 className="font-semibold mb-2">Context {index + 1}</h4>
                              <div className="space-y-1 text-sm">
                                {Object.entries(actions).map(([action, value]) => (
                                  <div key={action} className="flex justify-between">
                                    <span className="capitalize">{action}</span>
                                    <span className="text-green-600 font-medium">{(value * 100).toFixed(0)}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center p-8 text-muted-foreground">
                        <p>Start learning to build your preference profile</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </HoverCard>
            </ScrollReveal>
          </>
        )}
      </div>
    </div>
  );
}
