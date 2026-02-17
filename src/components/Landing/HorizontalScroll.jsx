"use client";
import { useRef, useEffect, useState } from "react";

const HorizontalScroll = ({ children, className = "" }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContent = scrollRef.current;
    if (!container || !scrollContent) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollWidth = scrollContent.scrollWidth - window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate how far we've scrolled through the section
      const start = rect.top + window.scrollY - viewportHeight;
      const end = rect.bottom + window.scrollY - viewportHeight;
      const current = window.scrollY;

      if (current >= start && current <= end) {
        const progress = (current - start) / (end - start);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      } else if (current < start) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative h-[300vh] ${className}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div
          ref={scrollRef}
          className="flex gap-8 px-8 transition-transform duration-100 ease-out"
          style={{
            transform: `translateX(-${scrollProgress * 100}%)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// Individual scroll item
export const HorizontalScrollItem = ({ children, className = "" }) => (
  <div className={`shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] ${className}`}>
    {children}
  </div>
);

export default HorizontalScroll;
