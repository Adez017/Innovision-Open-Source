"use client";
import { useEffect, useState, useRef } from "react";

const CursorFollower = ({
  size = 20,
  color = "rgba(59, 130, 246, 0.5)",
  delay = 0.1,
  showOnMobile = false
}) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const frameRef = useRef(null);

  useEffect(() => {
    // Don't show on mobile/touch devices unless specified
    if (!showOnMobile && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Check for hoverable elements
    const handleElementHover = (e) => {
      const target = e.target;
      const isHoverable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-hover");
      setIsHovering(isHoverable);
    };

    // Smooth animation loop
    const animate = () => {
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      currentRef.current.x += dx * (1 - delay);
      currentRef.current.y += dy * (1 - delay);

      setPosition({ ...currentRef.current });
      frameRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleElementHover);

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleElementHover);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [delay, showOnMobile, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-9999 mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? size * 2 : size,
          height: isHovering ? size * 2 : size,
          backgroundColor: color,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s ease-out, height 0.2s ease-out",
        }}
      />
      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-9998 border-2 border-blue-500/30"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? size * 3 : size * 1.5,
          height: isHovering ? size * 3 : size * 1.5,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s ease-out, height 0.3s ease-out",
        }}
      />
    </>
  );
};

export default CursorFollower;
