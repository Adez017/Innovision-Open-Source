"use client";
import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen, Brain, Compass, Layers, Sparkles, Zap, Target, Trophy,
  Clock, Globe, Shield, CheckCircle, Gamepad2, Moon, Bell, Bookmark,
  Code, Download, BarChart3, Users, GraduationCap, PlaySquare, FileText,
  Flame, Medal, Crown, Copy, Quote, Calendar, Wifi, Video, Briefcase,
  Network, ChevronDown, ChevronUp,
} from "lucide-react";
import { ScrollReveal, StaggerReveal } from "./ScrollReveal";

// Advanced 3D tilt card component
const FeatureCard3D = ({ feature, premium, index = 0 }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <ScrollReveal delay={index * 100} direction="up">
      <Card
        className="group relative overflow-hidden border border-border bg-background backdrop-blur-sm transition-all duration-500 hover:border-border/60 hover:-translate-y-2 h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${(mousePosition.y - 150) / 30}deg) rotateY(${(mousePosition.x - 150) / 30}deg) scale3d(1.02, 1.02, 1.02)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        }}
      >
        {/* Mouse spotlight effect */}
        {isHovered && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${feature.color}15, transparent 40%)`,
            }}
          />
        )}

        {premium && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-0.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 text-xs font-light flex items-center gap-1 backdrop-blur-sm">
              <Crown className="h-3 w-3" /> Premium
            </span>
          </div>
        )}
        <CardHeader className="relative z-10">
          <div
            className="w-12 h-12 rounded-xl border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500 group-hover:rotate-6"
            style={{
              borderColor: `${feature.color}20`,
              boxShadow: isHovered ? `0 0 20px ${feature.color}40` : 'none'
            }}
          >
            <feature.icon className="h-6 w-6 transition-all duration-500" style={{ color: feature.color }} />
          </div>
          <CardTitle className={`text-lg font-light mb-2 text-foreground ${premium ? 'pr-16' : ''}`}>{feature.title}</CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed text-sm font-light">{feature.description}</CardDescription>
        </CardHeader>
      </Card>
    </ScrollReveal>
  );
};

const courseFeatures = [
  { icon: Sparkles, title: "AI Course Generation", description: "Generate comprehensive courses on any topic in seconds using Google Gemini AI.", color: "#3b82f6" },
  { icon: PlaySquare, title: "YouTube Courses", description: "Transform any YouTube video into a structured learning course automatically.", color: "#ef4444" },
  { icon: Code, title: "Instructor Studio", description: "WYSIWYG editor with AI assistance, templates, and resource management.", color: "#06b6d4" },
  { icon: FileText, title: "Content Ingestion", description: "Import PDFs, textbooks, and documents to generate AI-powered courses.", color: "#f97316" },
  { icon: GraduationCap, title: "Curriculum Browser", description: "Pre-built curriculum from LKG to Class 12, CBSE & State Boards.", color: "#10b981" },
  { icon: Layers, title: "Engineering Courses", description: "Specialized courses for all engineering branches and semesters.", color: "#a855f7" },
];

const gamificationFeatures = [
  { icon: Zap, title: "XP Points System", description: "Earn XP for lessons, quizzes, courses. Level up as you learn.", color: "#eab308" },
  { icon: Flame, title: "Learning Streaks", description: "Maintain daily streaks with fire animations. Build study habits.", color: "#f97316" },
  { icon: Medal, title: "8+ Badges", description: "First Steps, Dedicated, Perfectionist, Speed Demon, Night Owl & more.", color: "#f59e0b" },
  { icon: Trophy, title: "Leaderboards", description: "Compete worldwide with Daily, Weekly, and All-Time rankings.", color: "#10b981" },
  { icon: Target, title: "Daily Quests", description: "Complete daily challenges for bonus XP rewards.", color: "#ec4899" },
  { icon: Gamepad2, title: "XP Combo Multiplier", description: "Chain correct answers for bonus XP multipliers!", color: "#8b5cf6" },
];

const learningFeatures = [
  { icon: Brain, title: "Interactive Quizzes", description: "MCQ, Fill-in-the-blanks, Match the Following for each chapter.", color: "#a855f7" },
  { icon: Clock, title: "Reading Time", description: "Estimated reading time for each chapter (200 wpm).", color: "#3b82f6" },
  { icon: Copy, title: "Code Copy Button", description: "One-click copy for all code blocks with success animation.", color: "#64748b" },
  { icon: Bookmark, title: "Bookmark System", description: "Save favorite chapters for quick access in your profile.", color: "#f43f5e" },
  { icon: Globe, title: "100+ Languages", description: "Learn in your preferred language with real-time AI translation.", color: "#14b8a6" },
  { icon: Compass, title: "AI Roadmaps", description: "Step-by-step learning paths organized into 8-12 chapters.", color: "#6366f1" },
];

const premiumFeatures = [
  { icon: BarChart3, title: "Analytics Dashboard", description: "Track performance metrics, XP graphs, and learning insights.", color: "#3b82f6" },
  { icon: Calendar, title: "Activity Heatmap", description: "GitHub-style activity heatmap showing your learning consistency.", color: "#10b981" },
  { icon: Brain, title: "AI Personalization", description: "Smart recommendations using reinforcement learning algorithms.", color: "#a855f7" },
  { icon: Wifi, title: "Offline Learning", description: "Download courses for offline access. Learn anywhere, anytime.", color: "#f97316" },
  { icon: Network, title: "LMS Integration", description: "Connect with Moodle and Canvas for grade syncing.", color: "#ef4444" },
  { icon: Briefcase, title: "Project-Based Learning", description: "Build real-world projects with mentor guidance and reviews.", color: "#14b8a6" },
  { icon: Video, title: "Multimodal Content", description: "Generate audio scripts and video storyboards for courses.", color: "#ec4899" },
  { icon: FileText, title: "Research Platform", description: "Export anonymized datasets for educational research.", color: "#06b6d4" },
];

const uxFeatures = [
  { icon: Moon, title: "Night Mode", description: "Blue light filter for comfortable late-night studying.", color: "#6366f1" },
  { icon: Bell, title: "Study Reminders", description: "Browser push notifications for scheduled study times.", color: "#eab308" },
  { icon: Quote, title: "Motivational Quotes", description: "Rotating inspirational quotes on your dashboard.", color: "#ec4899" },
  { icon: Users, title: "Profile Dashboard", description: "Overview, Progress, Courses, Compete, Activity, and Settings.", color: "#3b82f6" },
];

const FeatureCard = ({ feature, premium, index = 0 }) => <FeatureCard3D feature={feature} premium={premium} index={index} />;

const FeatureSection = ({ icon: Icon, iconColor, title, features, columns = 3, badge }) => (
  <div className="mb-20">
    <ScrollReveal direction="up">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Icon className="h-5 w-5 text-blue-500" />
        <h3 className="text-xl font-light text-foreground">{title}</h3>
        {badge && (
          <span className="px-2 py-0.5 rounded-full border border-blue-500/20 text-blue-400 text-xs font-light">
            {badge}
          </span>
        )}
      </div>
    </ScrollReveal>
    <div className={`grid grid-cols-1 md:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 max-w-6xl mx-auto`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.title} feature={feature} premium={badge === "7-Day Free Trial"} index={index} />
      ))}
    </div>
  </div>
);

const whyChooseFeatures = [
  { icon: Sparkles, title: "AI-Powered Generation", description: "Our advanced AI creates comprehensive courses on any topic in seconds.", color: "#3b82f6" },
  { icon: Layers, title: "Chapter-wise Learning", description: "Structured content organized into logical chapters for better understanding.", color: "#a855f7" },
  { icon: Compass, title: "Personalized Path", description: "Courses adapt to your learning style, pace, and existing knowledge.", color: "#06b6d4" },
  { icon: BookOpen, title: "Interactive Exercises", description: "Reinforce learning with quizzes, challenges, and practical exercises.", color: "#10b981" },
  { icon: CheckCircle, title: "Progress Tracking", description: "Monitor your learning journey with detailed analytics and insights.", color: "#f97316" },
  { icon: Target, title: "Any Topic, Any Level", description: "From beginner to advanced, learn anything you're interested in.", color: "#ec4899" },
];

const Features = () => {
  const [showAllPremium, setShowAllPremium] = useState(false);

  return (
    <section id="features" className="relative w-screen py-20 md:py-32 bg-background">
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        {/* Why Choose InnoVision Section */}
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 text-foreground">
              Why Choose InnoVision?
            </h2>
            <p className="max-w-2xl text-muted-foreground text-lg mb-12 font-light">
              Our platform combines cutting-edge AI with proven learning methodologies to create the most effective learning experience.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-32">
          {whyChooseFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* All Features Section */}
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-foreground text-sm font-light mb-4">
              <Zap className="h-3.5 w-3.5" /> 50+ Features
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 text-foreground">
              Everything You Need to{" "}
              <span className="text-blue-500">Learn Effectively</span>
            </h2>
            <p className="max-w-2xl text-muted-foreground text-lg font-light">
              Explore our comprehensive suite of features designed to enhance your learning journey.
            </p>
          </div>
        </ScrollReveal>

        <FeatureSection icon={Sparkles} iconColor="text-blue-500" title="AI-Powered Course Generation" features={courseFeatures} />
        <FeatureSection icon={Gamepad2} iconColor="text-yellow-500" title="Gamification & Rewards" features={gamificationFeatures} />
        <FeatureSection icon={BookOpen} iconColor="text-purple-500" title="Enhanced Learning Experience" features={learningFeatures} />

        <div className="mb-20">
          <FeatureSection icon={Crown} iconColor="text-blue-500" title="Premium Features" features={showAllPremium ? premiumFeatures : premiumFeatures.slice(0, 4)} columns={4} badge="7-Day Free Trial" />
          {premiumFeatures.length > 4 && (
            <div className="flex justify-center mt-6">
              <Button variant="outline" onClick={() => setShowAllPremium(!showAllPremium)} className="gap-2 transition-all duration-300 hover:scale-105 border border-border text-foreground hover:bg-muted rounded-full font-light">
                {showAllPremium ? <>Show Less <ChevronUp className="h-4 w-4" /></> : <>Show All Premium Features <ChevronDown className="h-4 w-4" /></>}
              </Button>
            </div>
          )}
        </div>

        <FeatureSection icon={Users} iconColor="text-blue-500" title="User Experience" features={uxFeatures} columns={4} />

        <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto" staggerDelay={100}>
          {[
            { icon: Shield, label: "Secure", desc: "Data Protected", color: "#10b981" },
            { icon: CheckCircle, label: "PWA Support", desc: "Install as App", color: "#3b82f6" },
            { icon: Globe, label: "Multi-language", desc: "100+ Languages", color: "#a855f7" },
            { icon: Download, label: "Offline Mode", desc: "Learn Anywhere", color: "#f97316" },
            { icon: Code, label: "Code Editor", desc: "Built-in IDE", color: "#06b6d4" },
            { icon: Crown, label: "PRO Badge", desc: "Premium Users", color: "#eab308" },
          ].map((item) => (
            <div key={item.label} className="text-center p-4 rounded-xl bg-background border border-border hover:border-border/60 transition-all duration-300 hover:scale-105 cursor-default group">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mx-auto mb-3 group-hover:border-border/60 transition-colors" style={{ borderColor: `${item.color}20` }}>
                <item.icon className="h-5 w-5" style={{ color: item.color }} />
              </div>
              <p className="font-light text-sm text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground font-light">{item.desc}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};

export default Features;
