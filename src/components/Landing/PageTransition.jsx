"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Fade transition wrapper
export const FadeTransition = ({ children }) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, [pathname, children]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      {displayChildren}
    </div>
  );
};

// Slide transition wrapper
export const SlideTransition = ({ children, direction = "left" }) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, [pathname, children]);

  const getTransform = () => {
    if (isVisible) return "translateX(0)";
    switch (direction) {
      case "left": return "translateX(-30px)";
      case "right": return "translateX(30px)";
      case "up": return "translateY(30px)";
      case "down": return "translateY(-30px)";
      default: return "translateX(-30px)";
    }
  };

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
      }}
    >
      {displayChildren}
    </div>
  );
};

// Page loading overlay
export const PageLoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

// Curtain reveal transition
export const CurtainTransition = ({ children }) => {
  const pathname = usePathname();
  const [phase, setPhase] = useState("visible"); // visible, hiding, hidden, revealing

  useEffect(() => {
    setPhase("hiding");
    const hideTimeout = setTimeout(() => {
      setPhase("hidden");
      const revealTimeout = setTimeout(() => {
        setPhase("revealing");
        const visibleTimeout = setTimeout(() => {
          setPhase("visible");
        }, 400);
        return () => clearTimeout(visibleTimeout);
      }, 100);
      return () => clearTimeout(revealTimeout);
    }, 400);
    return () => clearTimeout(hideTimeout);
  }, [pathname]);

  return (
    <>
      {/* Curtain overlay */}
      <div
        className="fixed inset-0 z-50 bg-primary pointer-events-none"
        style={{
          transform: phase === "hiding" || phase === "hidden"
            ? "translateY(0)"
            : "translateY(-100%)",
          transition: "transform 0.4s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />
      {/* Content */}
      <div
        style={{
          opacity: phase === "visible" || phase === "revealing" ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default FadeTransition;
