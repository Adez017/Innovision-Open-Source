"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function SignIn() {
  const { user, googleSignIn, githubSignIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/roadmap");
    }
  }, [user, router]);

  return (
    <div className="min-h-[calc(100vh-64px)] relative bg-background overflow-hidden flex items-center justify-center">
      {/* Animated dots background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="dot absolute w-1 h-1 bg-foreground/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full py-16 flex items-center justify-center">
        <div className="container m-auto px-6 md:px-12">
          <div className="m-auto max-w-md">
            <div className="rounded-2xl bg-background/80 backdrop-blur-sm border border-border p-8 sm:p-12">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <Image
                  src="/InnoVision_LOGO-removebg-preview.png"
                  alt="InnoVision Logo"
                  width={60}
                  height={60}
                  priority
                />
              </div>

              {/* Heading */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-foreground text-sm font-light mb-4">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Welcome Back</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-2">
                  Sign in to InnoVision
                </h2>
                <p className="text-muted-foreground font-light text-sm">
                  Continue your learning journey
                </p>
              </div>

              {/* Sign in buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => githubSignIn()}
                  className="group w-full h-12 px-6 border border-border rounded-full transition-all duration-300 hover:border-foreground/30 hover:bg-muted hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-5 h-5 text-foreground"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  <span className="font-light text-foreground">
                    Continue with GitHub
                  </span>
                </button>

                <button
                  onClick={() => googleSignIn()}
                  className="group w-full h-12 px-6 border border-border rounded-full transition-all duration-300 hover:border-foreground/30 hover:bg-muted hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <img src="/google.png" alt="Google" className="w-5 h-5" />
                  <span className="font-light text-foreground">
                    Continue with Google
                  </span>
                </button>
              </div>

              {/* Terms */}
              <div className="mt-8 space-y-3 text-muted-foreground text-center">
                <p className="text-xs font-light">
                  By proceeding, you agree to our{" "}
                  <a href="/terms" className="underline hover:text-foreground transition-colors">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="underline hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
