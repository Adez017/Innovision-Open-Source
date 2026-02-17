"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Crown } from "lucide-react";

export default function LockedFeature({
  featureName = "This feature",
  children,
  hasAccess = false,
  showPreview = false
}) {
  const router = useRouter();

  if (hasAccess) {
    return children;
  }

  // Lock card component
  const LockCard = () => (
    <Card className="bg-linear-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 max-w-md w-full mx-auto">
      <CardContent className="pt-6 text-center">
        <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-yellow-600" />
        </div>
        <h3 className="font-bold text-xl mb-2">Premium Feature</h3>
        <p className="text-muted-foreground mb-4">
          {featureName} is available during your 7-day free trial or with a Premium subscription.
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Your free trial has expired. Upgrade to continue using this feature.
        </p>
        <Button
          onClick={() => router.push("/premium")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        >
          <Crown className="h-4 w-4 mr-2" />
          Upgrade to Premium - ₹100/month
        </Button>
      </CardContent>
    </Card>
  );

  // Just show the lock card centered, no preview
  return (
    <div className="flex items-center justify-center py-8 min-h-100">
      <LockCard />
    </div>
  );
}
