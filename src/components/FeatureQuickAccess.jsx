"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Palette, Trophy, BookOpen, Sparkles } from "lucide-react";

export default function FeatureQuickAccess() {
  const router = useRouter();

  const features = [
    {
      title: "Instructor Studio",
      description: "Create and edit courses with AI-powered tools",
      icon: Palette,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      href: "/studio"
    },
    {
      title: "Gamification",
      description: "Track your progress, earn badges, and compete",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      href: "/gamification"
    },
    {
      title: "Curriculum Browser",
      description: "Browse LKG to Class 12 curriculum",
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      href: "/curriculum"
    },
    {
      title: "Generate Course",
      description: "Create custom or curriculum-based courses",
      icon: Sparkles,
      color: "text-green-500",
      bgColor: "bg-green-50",
      href: "/generate"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <Card
            key={feature.href}
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => router.push(feature.href)}
          >
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-2`}>
                <Icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Open
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
