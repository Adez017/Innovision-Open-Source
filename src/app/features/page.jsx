"use client";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart3, Wifi, Brain, Video, BookOpen, Crown, Download, Sparkles, Zap } from "lucide-react";
import { PageBackground, GridPattern, PageHeader, ScrollReveal, StaggerChildren, HoverCard } from "@/components/ui/PageWrapper";

export default function FeaturesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [premiumStatus, setPremiumStatus] = useState({ isPremium: false });

  useEffect(() => {
    const fetchPremiumStatus = async () => {
      if (user) {
        try {
          const res = await fetch("/api/premium/status");
          const data = await res.json();
          setPremiumStatus(data);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <PageBackground />
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const features = [
    {
      title: "Analytics Dashboard",
      description: "Track student performance, engagement metrics, and course completion rates",
      icon: <BarChart3 className="w-10 h-10 text-blue-500" />,
      href: "/features/analytics",
      color: "bg-blue-500/10",
      borderColor: "hover:border-blue-500/50",
      premium: true,
      badge: "Premium"
    },
    {
      title: "Multimodal Content",
      description: "Generate audio scripts and video storyboards for your courses (Coming Soon - Preview Only)",
      icon: <Video className="w-10 h-10 text-purple-500" />,
      href: "/features/multimodal",
      color: "bg-purple-500/10",
      borderColor: "hover:border-purple-500/50",
      premium: true,
      badge: "Preview",
      comingSoon: true
    },
    {
      title: "AI Personalization",
      description: "Advanced learning recommendations using reinforcement learning",
      icon: <Brain className="w-10 h-10 text-green-500" />,
      href: "/features/personalization",
      color: "bg-green-500/10",
      borderColor: "hover:border-green-500/50",
      premium: true,
      badge: "Premium"
    },
    {
      title: "Offline Learning",
      description: "Download courses and learn offline. Free users: 1 course only. Premium: Unlimited downloads!",
      icon: <Wifi className="w-10 h-10 text-orange-500" />,
      href: "/features/offline",
      color: "bg-orange-500/10",
      borderColor: "border-orange-500/50",
      premium: true,
      badge: "1 Free Course",
      highlight: true
    },
    {
      title: "LMS Integration",
      description: "Connect with Moodle or Canvas to sync courses and grades",
      icon: <BookOpen className="w-10 h-10 text-red-500" />,
      href: "/features/lms",
      color: "bg-red-500/10",
      borderColor: "hover:border-red-500/50",
      premium: true,
      badge: "Premium"
    },
    {
      title: "Project-Based Learning",
      description: "Build real-world projects with mentor guidance and professional reviews",
      icon: <BarChart3 className="w-10 h-10 text-teal-500" />,
      href: "/features/projects",
      color: "bg-teal-500/10",
      borderColor: "hover:border-teal-500/50",
      premium: true,
      badge: "Premium"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <PageBackground />
      <GridPattern opacity={0.02} />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 relative z-10">
        <ScrollReveal>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              Premium Features
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Advanced Features</h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlock powerful tools to enhance your learning experience
            </p>
          </div>
        </ScrollReveal>

        {!premiumStatus.isPremium && (
          <ScrollReveal delay={100}>
            <div className="mb-6 p-4 sm:p-6 bg-linear-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-2xl backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/25">
                  <Crown className="h-6 w-6 text-black" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-xl mb-2">Premium Features</h3>
                  <p className="text-muted-foreground mb-4 text-xs sm:text-base">
                    Most features are available only for Premium users. Free users get limited access:
                  </p>
                  <ul className="space-y-2 mb-4 text-xs sm:text-base inline-block text-left">
                    <li className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-orange-500" />
                      <span className="font-semibold">Offline Learning: 1 free course</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-purple-500" />
                      <span>Multimodal: Preview only</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-yellow-600" />
                      <span>Others: Premium only</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Button
                      onClick={() => router.push("/premium")}
                      className="w-full sm:w-auto bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                    >
                      Upgrade to Premium - ₹100/month
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={100}>
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <HoverCard>
                <Card className={`h-full bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 cursor-pointer relative ${feature.highlight ? 'border-2 border-orange-500/50 shadow-lg shadow-orange-500/10' : feature.borderColor
                  }`}>
                  {feature.premium && (
                    <div className="absolute top-3 right-3">
                      {feature.comingSoon ? (
                        <span className="px-2 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">
                          {feature.badge}
                        </span>
                      ) : feature.highlight ? (
                        <span className="px-2 py-1 bg-linear-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {feature.badge}
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-linear-to-r from-yellow-500 to-orange-500 text-black text-xs font-semibold rounded-full flex items-center gap-1">
                          <Crown className="h-3 w-3" />
                          {feature.badge}
                        </span>
                      )}
                    </div>
                  )}
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="pr-20">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full hover:bg-primary/5 transition-all">
                      {feature.comingSoon ? 'Preview →' : 'Explore →'}
                    </Button>
                  </CardContent>
                </Card>
              </HoverCard>
            </Link>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
}
