"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Clock, AlertTriangle } from "lucide-react";

export default function TrialBanner({ onStatusChange }) {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/premium/status");
      const data = await res.json();
      setStatus(data);
      if (onStatusChange) {
        onStatusChange(data);
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !status) return null;

  // Premium user - no banner needed
  if (status.isPremium) return null;

  // In trial period
  if (status.isInTrial) {
    return (
      <Card className="bg-linear-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Free Trial Active</h3>
                <p className="text-sm text-muted-foreground">
                  {status.trialDaysRemaining} day{status.trialDaysRemaining !== 1 ? "s" : ""} remaining - Enjoy full access to all features!
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/premium")}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade Now
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Trial expired
  if (status.trialExpired) {
    return (
      <Card className="bg-linear-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Free Trial Expired</h3>
                <p className="text-sm text-muted-foreground">
                  Your 7-day free trial has ended. Upgrade to continue using premium features.
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/premium")}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Premium - ₹100/month
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
