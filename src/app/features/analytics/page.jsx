"use client";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BarChart3, Crown } from "lucide-react";
import PremiumDialog from "@/components/PremiumDialog";
import { PageBackground, GridPattern, PageHeader, ScrollReveal } from "@/components/ui/PageWrapper";

export default function AnalyticsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isInstructor, setIsInstructor] = useState(false);
  const [premiumStatus, setPremiumStatus] = useState({ isPremium: false });
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);

  useEffect(() => {
    const fetchPremiumStatus = async () => {
      if (user) {
        try {
          const res = await fetch("/api/premium/status");
          const data = await res.json();
          setPremiumStatus(data);

          if (!data.isPremium) {
            setShowPremiumDialog(true);
          }
        } catch (error) {
          console.error("Error fetching premium status:", error);
        }
      }
    };
    fetchPremiumStatus();
  }, [user]);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
    if (user) {
      setIsInstructor(true);
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <PageBackground variant="default" />
      <GridPattern opacity={0.02} />

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <ScrollReveal>
          <div className="mb-6">
            <Link href="/features">
              <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Features
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <PageHeader
          icon={BarChart3}
          iconColor="text-blue-500"
          title="Analytics Dashboard"
          description="Track your learning progress and performance insights"
          badge="📊 Premium Feature"
        />

        <PremiumDialog
          open={showPremiumDialog}
          onOpenChange={setShowPremiumDialog}
          feature="Analytics Dashboard"
        />

        {isInstructor && premiumStatus.isPremium ? (
          <ScrollReveal delay={100}>
            <AnalyticsDashboard instructorId={user.email} />
          </ScrollReveal>
        ) : !premiumStatus.isPremium ? (
          <ScrollReveal delay={100}>
            <div className="text-center p-6 sm:p-12 border-2 border-dashed rounded-xl bg-card/50 backdrop-blur-sm">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h2 className="text-2xl font-bold mb-4">Premium Feature</h2>
              <p className="text-muted-foreground mb-6">
                Analytics Dashboard is only available for Premium users.
              </p>
              <Button
                onClick={() => router.push("/premium")}
                className="bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={100}>
            <div className="text-center p-12 border-2 border-dashed rounded-xl bg-card/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Instructor Access Required</h2>
              <p className="text-muted-foreground">
                This feature is available for instructors. Contact support to upgrade your account.
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
