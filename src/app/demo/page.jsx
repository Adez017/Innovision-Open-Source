"use client";

import { ChevronLeft, Play } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth";
import { PageBackground, GridPattern, ScrollReveal } from "@/components/ui/PageWrapper";

const Page = () => {
  const { user, loading } = useAuth();
  return (
    <div className="min-h-screen bg-background relative">
      <PageBackground />
      <GridPattern opacity={0.02} />

      <div className="max-w-5xl mx-auto pt-16 w-[95vw] relative z-10">
        <ScrollReveal>
          <div className="relative mb-6">
            <Link href={user ? "/roadmap" : "/"} className="absolute top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-muted transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full mb-3 shadow-lg shadow-blue-500/25">
                <Play className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Demo</h1>
              <p className="text-muted-foreground text-sm mt-1">See InnoVision in action</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="my-5 rounded-2xl overflow-hidden shadow-2xl shadow-black/20" style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              src="https://www.dailymotion.com/embed/video/x9sz42m"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              title="InnoVision - Demo Video"
            ></iframe>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Page;
