import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Zap, BookOpen, Trophy, Users, Globe, Flame } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import MagneticButton from "./MagneticButton";
import landingTheme, { getAnimationDelay } from "@/lib/landing-theme";

const Hero = () => {
  const { colors, animations, effects, typography, components, stats, trustBadges, featureHighlights } = landingTheme;

  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden px-4">
      {/* Gradient orbs */}
      <div
        className={`absolute ${effects.gradient.orb1.position} ${effects.gradient.orb1.size} ${effects.gradient.orb1.color} rounded-full ${effects.blur["3xl"]} animate-pulse`}
        style={{ animationDuration: effects.gradient.orb1.duration }}
      />
      <div
        className={`absolute ${effects.gradient.orb2.position} ${effects.gradient.orb2.size} ${effects.gradient.orb2.color} rounded-full ${effects.blur["3xl"]} animate-pulse`}
        style={{ animationDuration: effects.gradient.orb2.duration, animationDelay: effects.gradient.orb2.delay }}
      />

      <div className="container relative z-10 mx-auto px-2 sm:px-4 md:px-6 py-8 sm:py-12 md:pb-24 pt-12">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div
            className={`${components.badge.base} ${components.badge.hover} mb-6 sm:mb-8 animate-fade-in`}
            style={{ animationDelay: animations.delay.badge }}
          >
            <Sparkles
              aria-hidden="true"
              className="h-3 w-3 sm:h-4 sm:w-4"
              style={{ color: colors.primary.blue }}
            />
            <span>AI-Powered Learning Platform</span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] sm:text-xs">New</span>
          </div>

          {/* Logo with glow */}
          <div
            className="mb-4 sm:mb-6 animate-fade-in relative group"
            style={{ animationDelay: animations.delay.logo }}
          >
            <div className={`absolute inset-0 bg-blue-500/20 rounded-full ${effects.blur["2xl"]} group-hover:bg-blue-500/30 transition-all duration-500`} />
            <Image
              src="/InnoVision_LOGO-removebg-preview.png"
              alt="InnoVision Logo"
              width={80}
              height={80}
              priority
              className="w-14 h-14 sm:w-20 sm:h-20 relative z-10 group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Main heading with gradient */}
          <h1 className={`${typography.hero.title} mb-4 sm:mb-6`}>
            <span
              className="block text-foreground animate-fade-in"
              style={{ animationDelay: animations.delay.heading }}
            >
              Learn Any Topic
            </span>
            <span
              className={`block bg-linear-to-r ${colors.primary.gradient} bg-clip-text text-transparent animate-fade-in animate-gradient`}
              style={{ animationDelay: animations.delay.subheading }}
            >
              with AI-Generated Courses
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`${typography.hero.subtitle} text-muted-foreground max-w-2xl mb-4 sm:mb-6 leading-relaxed animate-fade-in px-2`}
            style={{ animationDelay: animations.delay.subtitle }}
          >
            Generate personalized courses on any topic in seconds. From programming to philosophy,
            our AI creates structured, chapter-wise content tailored to your learning style.
          </p>

          {/* Feature highlights with icons */}
          <div
            className={`flex flex-wrap items-center justify-center ${landingTheme.spacing.gap.sm} mb-6 sm:mb-10 text-xs sm:text-sm text-muted-foreground animate-fade-in font-light`}
            style={{ animationDelay: animations.delay.features }}
          >
            {featureHighlights.map((item, i) => {
              const icons = [Zap, Flame, Trophy, Globe];
              const Icon = icons[i];
              return (
                <div key={i} className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 ${landingTheme.radius.full} border border-border bg-card/30 backdrop-blur-sm hover:bg-card/50 ${landingTheme.hover.scale.sm} transition-all duration-300`}>
                  <Icon
                    aria-hidden="true"
                    className={`h-3 w-3 sm:h-4 sm:w-4 ${item.color}`}
                  />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-in w-full sm:w-auto"
            style={{ animationDelay: animations.delay.buttons }}
          >
            <MagneticButton strength={0.2}>
              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  aria-label="Get started with InnoVision for free"
                  className={`h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-light gap-2 ${components.button.primary} w-full sm:w-auto`}
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Link href="/demo" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  aria-label="Watch product demo"
                  className={`h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-light gap-2 ${components.button.secondary} w-full sm:w-auto group`}
                >
                  <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  See Demo
                </Button>
              </Link>
            </MagneticButton>
          </div>

          {/* Stats with Animated Counters */}
          <div
            className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-12 pt-6 sm:pt-8 border-t border-border w-full max-w-3xl animate-fade-in"
            style={{ animationDelay: animations.delay.stats }}
          >
            {stats.map((stat, i) => {
              const icons = [BookOpen, Users, Globe, Trophy];
              const Icon = icons[i];
              return (
                <div key={i} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1">
                    <Icon
                      aria-hidden="true"
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color} group-hover:scale-110 transition-transform`}
                    />
                    <span
                      className="text-xl sm:text-2xl md:text-3xl font-light text-foreground"
                      aria-label={`${stat.end}${stat.suffix} ${stat.label}`}
                    >
                      <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Trust badges */}
          <div
            className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground animate-fade-in font-light"
            style={{ animationDelay: animations.delay.trust }}
          >
            {trustBadges.map((text, i) => (
              <div key={i} className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 ${landingTheme.radius.full} border border-border bg-card/30 backdrop-blur-sm hover:bg-card/50 ${landingTheme.hover.scale.sm} transition-all duration-300`}>
                <svg className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
