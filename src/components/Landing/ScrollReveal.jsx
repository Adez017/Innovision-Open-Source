"use client";
import { useEffect, useRef, useState } from "react";

// Reveal entire element on scroll
export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up" // up, down, left, right, scale
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0) scale(1)";
    switch (direction) {
      case "up": return "translateY(40px)";
      case "down": return "translateY(-40px)";
      case "left": return "translateX(40px)";
      case "right": return "translateX(-40px)";
      case "scale": return "scale(0.9)";
      default: return "translateY(40px)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
};

// Reveal text word by word
export const WordReveal = ({
  text,
  className = "",
  wordClassName = "",
  staggerDelay = 50
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block ${wordClassName}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.5s ease-out ${i * staggerDelay}ms, transform 0.5s ease-out ${i * staggerDelay}ms`,
          }}
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
};

// Reveal text letter by letter
export const LetterReveal = ({
  text,
  className = "",
  letterClassName = "",
  staggerDelay = 30
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const letters = text.split("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {letters.map((letter, i) => (
        <span
          key={i}
          className={`inline-block ${letterClassName}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) rotateX(0)" : "translateY(20px) rotateX(-90deg)",
            transition: `opacity 0.4s ease-out ${i * staggerDelay}ms, transform 0.4s ease-out ${i * staggerDelay}ms`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  );
};

// Stagger children reveal
export const StaggerReveal = ({
  children,
  className = "",
  staggerDelay = 100,
  direction = "up"
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = (visible) => {
    if (visible) return "translate(0, 0)";
    switch (direction) {
      case "up": return "translateY(30px)";
      case "down": return "translateY(-30px)";
      case "left": return "translateX(30px)";
      case "right": return "translateX(-30px)";
      default: return "translateY(30px)";
    }
  };

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) ? children.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: getTransform(isVisible),
            transition: `opacity 0.5s ease-out ${i * staggerDelay}ms, transform 0.5s ease-out ${i * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      )) : children}
    </div>
  );
};

// Line reveal (text appears with a line wipe)
export const LineReveal = ({
  children,
  className = ""
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`relative inline-block overflow-hidden ${className}`}>
      <span
        style={{
          display: "inline-block",
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        {children}
      </span>
    </span>
  );
};

export default ScrollReveal;
