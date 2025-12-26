"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth";
const Page = () => {
  const { user, loading } = useAuth();
  return (
    <div className="max-w-5xl mx-auto mt-4 w-[95vw]">
      <div className="relative ">
        <Link href={user ? "/roadmap" : "/"}>
          <ChevronLeft className="absolute top-1/2 -translate-y-1/2" />
        </Link>
        <h1 className="mx-auto text-center text-3xl">DEMO</h1>
      </div>

      <div className="my-5" style={{ padding: "56.25% 0 0 0", position: "relative" }}>
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
    </div>
  );
};

export default Page;
