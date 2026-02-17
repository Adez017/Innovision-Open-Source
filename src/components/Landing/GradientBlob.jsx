"use client";
import { useEffect, useRef } from "react";

const GradientBlob = () => {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);

  useEffect(() => {
    let time = 0;
    let animationId;

    const animate = () => {
      time += 0.005;

      if (blob1Ref.current) {
        const x1 = Math.sin(time * 0.7) * 100;
        const y1 = Math.cos(time * 0.5) * 100;
        const scale1 = 1 + Math.sin(time * 0.3) * 0.2;
        blob1Ref.current.style.transform = `translate(${x1}px, ${y1}px) scale(${scale1})`;
      }

      if (blob2Ref.current) {
        const x2 = Math.cos(time * 0.6) * 120;
        const y2 = Math.sin(time * 0.4) * 80;
        const scale2 = 1 + Math.cos(time * 0.4) * 0.15;
        blob2Ref.current.style.transform = `translate(${x2}px, ${y2}px) scale(${scale2})`;
      }

      if (blob3Ref.current) {
        const x3 = Math.sin(time * 0.5) * 80;
        const y3 = Math.cos(time * 0.7) * 120;
        const scale3 = 1 + Math.sin(time * 0.5) * 0.25;
        blob3Ref.current.style.transform = `translate(${x3}px, ${y3}px) scale(${scale3})`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blob 1 - Blue/Cyan */}
      <div
        ref={blob1Ref}
        className="absolute top-1/4 left-1/4 w-150 h-150 rounded-full opacity-30 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(6,182,212,0.4) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Blob 2 - Purple/Pink */}
      <div
        ref={blob2Ref}
        className="absolute top-1/2 right-1/4 w-125 h-125 rounded-full opacity-30 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(236,72,153,0.4) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Blob 3 - Cyan/Green */}
      <div
        ref={blob3Ref}
        className="absolute bottom-1/4 left-1/3 w-112.5 h-112.5 rounded-full opacity-25 dark:opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(34,197,94,0.4) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
};

export default GradientBlob;
