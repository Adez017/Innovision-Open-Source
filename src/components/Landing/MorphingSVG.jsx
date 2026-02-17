"use client";
import { useEffect, useRef, useState } from "react";

// Predefined shape paths
const shapes = {
  circle: "M50,10 C72,10 90,28 90,50 C90,72 72,90 50,90 C28,90 10,72 10,50 C10,28 28,10 50,10 Z",
  square: "M20,20 L80,20 L80,80 L20,80 Z",
  triangle: "M50,15 L85,85 L15,85 Z",
  star: "M50,5 L61,40 L98,40 L68,62 L79,97 L50,75 L21,97 L32,62 L2,40 L39,40 Z",
  hexagon: "M50,5 L90,27.5 L90,72.5 L50,95 L10,72.5 L10,27.5 Z",
  blob1: "M45,10 C70,5 95,25 90,50 C85,75 65,95 40,90 C15,85 5,60 10,35 C15,15 25,12 45,10 Z",
  blob2: "M55,8 C80,15 92,40 85,65 C78,90 50,98 25,85 C5,72 2,45 15,25 C28,5 35,2 55,8 Z",
  blob3: "M40,5 C65,2 88,20 92,45 C96,70 80,92 55,95 C30,98 8,80 5,55 C2,30 18,8 40,5 Z",
};

const MorphingSVG = ({
  fromShape = "circle",
  toShape = "blob1",
  duration = 3000,
  className = "",
  fill = "currentColor",
  autoPlay = true,
  loop = true,
}) => {
  const pathRef = useRef(null);
  const [currentPath, setCurrentPath] = useState(shapes[fromShape]);
  const [isAnimating, setIsAnimating] = useState(autoPlay);

  useEffect(() => {
    if (!isAnimating) return;

    let animationFrame;
    let startTime;
    const from = shapes[fromShape];
    const to = shapes[toShape];

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-in-out)
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      // Simple interpolation - just swap at midpoint for smooth effect
      if (progress < 0.5) {
        setCurrentPath(from);
      } else {
        setCurrentPath(to);
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else if (loop) {
        // Swap shapes and restart
        startTime = null;
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [fromShape, toShape, duration, isAnimating, loop]);

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ overflow: "visible" }}
    >
      <path
        ref={pathRef}
        d={currentPath}
        fill={fill}
        style={{
          transition: `d ${duration / 2}ms ease-in-out`,
        }}
      />
    </svg>
  );
};

// Animated morphing background decoration
export const MorphingDecoration = ({ className = "" }) => {
  const [shapeIndex, setShapeIndex] = useState(0);
  const shapeKeys = ["blob1", "blob2", "blob3", "circle", "hexagon"];

  useEffect(() => {
    const interval = setInterval(() => {
      setShapeIndex((prev) => (prev + 1) % shapeKeys.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentShape = shapeKeys[shapeIndex];
  const nextShape = shapeKeys[(shapeIndex + 1) % shapeKeys.length];

  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d={shapes[currentShape]}
          fill="url(#morphGradient)"
          style={{
            transition: "d 2s ease-in-out",
          }}
        />
      </svg>
    </div>
  );
};

export default MorphingSVG;
