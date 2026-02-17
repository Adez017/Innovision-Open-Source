"use client";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles, Palette, Upload, Youtube, Home, BookOpen, Code2,
  Trophy, Zap, BarChart3, MessageSquare, Flame, Globe, Crown,
  ArrowRight, Check
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SheryiansLanding() {
  const dotsRef = useRef(null);

  useEffect(() => {
    // Animate dots
    const dots = dotsRef.current?.querySelectorAll('.dot');
    if (dots) {
      gsap.to(dots, {
        opacity: 0.3,
        scale: 1.2,
        duration: 2,
        stagger: {
          amount: 3,
          from: "random",
          repeat: -1,
          yoyo: true,
        },
        ease: "power1.inOut",
      });
    }

    // Scroll animations
    gsap.utils.toArray('.fade-in-section').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    });
  }, []);

  const generateDots = () => {
    const dots = [];
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      dots.push(
        <div
          key={i}
          className="dot absolute w-1 h-1 bg-white/20 rounded-full"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      );
    }
    return dots;
  };

  const features = [
    { icon: Sparkles, title: "AI Course Generator", desc: "Generate courses with AI" },
    { icon: Palette, title: "Course Studio", desc: "Design custom courses" },
    { icon: Upload, title: "Content Ingestion", desc: "Import PDFs & textbooks" },
    { icon: Youtube, title: "YouTube Courses", desc: "Learn from videos" },
    { icon: BookOpen, title: "Browse Courses", desc: "Explore all courses" },
    { icon: Code2, title: "Code Editor", desc: "Practice coding" },
  ];

  const stats = [
    { value: "1000+", label: "Courses Created" },
    { value: "50K+", label: "Active Learners" },
    { value: "100+", label: "Languages" },
    { value: "98%", label: "Satisfaction" },
  ];

  const pricing = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      features: ["3 custom courses", "1 YouTube course", "Basic gamification", "1 offline download"],
    },
    {
      name: "Premium",
      price: "₹100",
      period: "per month",
      popular: true,
      features: ["Unlimited courses", "Full curriculum access", "Analytics dashboard", "Priority support"],
    },
    {
      name: "Education",
      price: "₹50",
      period: "per month",
      features: ["All Premium features", "50% student discount", "Classroom integration", "Bulk licensing"],
    },
  ];

  return (
    <div className="relative bg-black text-white overflow-hidden min-h-screen">
      {/* Animated dots background - lower z-index */}
      <div ref={dotsRef} className="fixed inset-0 z-0 pointer-events-none">
        {generateDots()}
      </div>

      {/* All content with higher z-index */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm text-gray-500 mb-6 tracking-wide">
              50,000+ Active Learners Worldwide
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 leading-tight">
              <span className="text-white">Learn Any Topic</span>
              <br />
              <span className="text-white">with AI-Generated </span>
              <span className="text-blue-500">Courses</span>
            </h1>

            <p className="text-sm md:text-base text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              Generate personalized courses on any topic in seconds. From programming to philosophy,
              <br className="hidden sm:block" />
              our AI creates structured, chapter-wise content tailored to your learning style.
            </p>

            <Link href="/login">
              <Button className="h-12 px-8 text-sm font-normal bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-full">
                Get Started Free
              </Button>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-20 px-4 fade-in-section">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-light text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-32 px-4 fade-in-section">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light text-center mb-4">
              Everything You Need to <span className="text-blue-500">Learn</span>
            </h2>
            <p className="text-gray-400 text-center mb-16 font-light">
              Powerful features to enhance your learning journey
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="p-8 border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 hover:bg-white/5 bg-black"
                >
                  <feature.icon className="h-8 w-8 text-blue-500 mb-4" />
                  <h3 className="text-xl font-light mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 font-light">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative py-32 px-4 fade-in-section">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light text-center mb-4">
              Simple <span className="text-blue-500">Pricing</span>
            </h2>
            <p className="text-gray-400 text-center mb-16 font-light">
              Choose the plan that works for you
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricing.map((plan, i) => (
                <div
                  key={i}
                  className={`p-8 border rounded-2xl transition-all duration-300 bg-black ${plan.popular
                    ? 'border-blue-500 bg-blue-500/5'
                    : 'border-white/10 hover:border-white/20'
                    }`}
                >
                  {plan.popular && (
                    <div className="text-xs text-blue-500 font-medium mb-4 uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-light mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-light">{plan.price}</span>
                    <span className="text-gray-400 text-sm ml-2">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                        <Check className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/login">
                    <Button
                      className={`w-full h-11 rounded-full font-normal ${plan.popular
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-transparent border border-white/20 hover:bg-white/10'
                        }`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 px-4 fade-in-section">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Ready to Start <span className="text-blue-500">Learning?</span>
            </h2>
            <p className="text-gray-400 mb-8 font-light">
              Join thousands of learners and start your journey today
            </p>
            <Link href="/login">
              <Button className="h-12 px-8 text-sm font-normal bg-blue-500 text-white hover:bg-blue-600 rounded-full">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12 px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Image
                    src="/InnoVision_LOGO-removebg-preview.png"
                    alt="logo"
                    width={32}
                    height={32}
                    className="invert"
                  />
                  <span className="font-light text-lg">InnoVision</span>
                </div>
                <p className="text-sm text-gray-400 font-light">
                  AI-powered learning platform
                </p>
              </div>

              <div>
                <h4 className="font-light mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="/premium" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="/demo" className="hover:text-white transition-colors">Demo</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-light mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-light mb-4">Connect</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/ItsVikasA/InnoVision" className="text-gray-400 hover:text-white transition-colors">
                    GitHub
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Twitter
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
              © 2025 InnoVision. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
