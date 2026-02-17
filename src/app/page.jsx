"use client";
import Landing from "@/components/Landing/Landing";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth";
import { useEffect, useState } from "react";
import Loading from "./loading";

const thoughts = [
  "The brain uses 20% of your body's energy.",
  "Success comes from consistency, not luck.",
  "Octopuses have three hearts and blue blood.",
  "Start moving, and motivation will follow.",
  "Fold paper 42 times and it could reach the moon.",
  "Learning daily adds up over time.",
  "Bamboo can grow 3 feet in a day.",
  "You don't have to be great to start.",
  "Bees can recognize human faces.",
  "Discipline outworks raw talent.",
];

const Page = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [text, setText] = useState("Loading...");

  useEffect(() => {
    // Set random thought only on client side to avoid hydration mismatch
    setText(thoughts[Math.floor(Math.random() * thoughts.length)]);
  }, []);

  useEffect(() => {
    if (user) {
      router.replace("/roadmap");
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="relative text-center">
        <Loading />
        <p className="absolute z-5 top-1/2 left-1/2 translate-y-1/2 -translate-x-1/2">{text}</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="relative text-center">
        <Loading />
        <p className="absolute z-5 top-1/2 left-1/2 translate-y-1/2 -translate-x-1/2">{text}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Landing />
    </div>
  );
};

export default Page;
