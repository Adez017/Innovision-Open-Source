"use client";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import gsap from "gsap";

const AdvancedHero = () => {
  const heroRef = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    // Animate title
    gsap.from(".hero-title", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".hero-subtitle", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(".hero-description", {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from(".hero-cta", {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      delay: 0.7,
      ease: "back.out(1.7)",
    });

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
  }, []);

  // Generate dots
  const generateDots = () => {
    const dots = [];
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      dots.push(
        <div
          key={i}
          className="dot absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
          }}
        />
      );
    }
    return dots;
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated dots background */}
      <div ref={dotsRef} className="absolute inset-0">
        {generateDots()}
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 py-20">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Small text above */}
          <p className="hero-subtitle text-sm md:text-base text-gray-500 mb-6 tracking-wide">
            50,000+ Active Learners Worldwide
          </p>

          {/* Main Title */}
          <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight mb-4 leading-tight">
            <span className="text-white font-light">Learn Any Topic</span>
            <br />
            <span className="text-white font-light">with AI-Generated </span>
            <span className="text-blue-500 font-light">Courses</span>
          </h1>

          {/* Description */}
          <p className="hero-description text-sm md:text-base text-gray-400 max-w-3xl mb-12 leading-relaxed font-light">
            Generate personalized courses on any topic in seconds. From programming to philosophy,
            <br className="hidden sm:block" />
            our AI creates structured, chapter-wise content tailored to your learning style.
          </p>

          {/* CTA Button */}
          <div className="hero-cta">
            <Link href="/login">
              <Button
                size="lg"
                className="h-12 px-8 text-sm font-normal bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-full transition-all duration-300"
              >
                Get Started Free
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdvancedHero;
