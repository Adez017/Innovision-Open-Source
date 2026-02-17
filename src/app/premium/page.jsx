"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Check,
  Crown,
  Sparkles,
  Zap,
  BookOpen,
  GraduationCap,
  Loader2,
  School,
  Building2,
  Brain,
  Wifi,
  BarChart3,
  Video,
  Upload,
  Code2,
  Languages,
  Trophy,
  Calendar,
  Download,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import PremiumCelebration from "@/components/premium/PremiumCelebration";
import { PageBackground, GridPattern, ScrollReveal, StaggerChildren, HoverCard } from "@/components/ui/PageWrapper";

export default function PremiumPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [premiumStatus, setPremiumStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchPremiumStatus = async () => {
      try {
        const res = await fetch("/api/premium/status");
        const data = await res.json();
        setPremiumStatus(data);
      } catch (error) {
        console.error("Error fetching premium status:", error);
      } finally {
        setLoadingStatus(false);
      }
    };

    fetchPremiumStatus();
  }, [user, router]);

  const handleUpgrade = async (planType = "premium") => {
    if (!user) {
      toast.error("Please login to upgrade");
      router.push("/login");
      return;
    }

    setLoading(true);
    setSelectedPlan(planType);

    try {
      const orderRes = await fetch("/api/premium/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planType, couponCode: couponCode.trim() }),
      });

      if (!orderRes.ok) {
        const errorData = await orderRes.json();
        console.error("Order creation failed:", errorData);
        throw new Error(errorData.details || "Failed to create order");
      }

      const orderData = await orderRes.json();

      // Show coupon result
      if (couponCode && orderData.couponValid) {
        setCouponApplied({
          discount: orderData.discountApplied / 100,
          finalAmount: orderData.amount / 100,
        });
        toast.success(`Coupon applied! You save ₹${orderData.discountApplied / 100}`);
      } else if (couponCode && !orderData.couponValid) {
        toast.error("Invalid coupon code");
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "InnoVision Premium",
          description: planType === "education" ? "Education Plan - 1 Month" : "Premium Subscription - 1 Month",
          order_id: orderData.orderId,
          handler: async function (response) {
            try {
              const verifyRes = await fetch("/api/premium/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              if (!verifyRes.ok) {
                throw new Error("Payment verification failed");
              }

              // Show celebration animation
              setShowCelebration(true);
              toast.success("Premium activated successfully!");

              // Redirect after celebration
              setTimeout(() => {
                router.push("/generate");
              }, 5000);
            } catch (error) {
              toast.error("Payment verification failed. Please contact support.");
              console.error("Verification error:", error);
            } finally {
              setLoading(false);
            }
          },
          prefill: {
            email: user.email,
            name: user.displayName || user.email,
          },
          theme: {
            color: "#3b82f6",
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };

      script.onerror = () => {
        toast.error("Failed to load payment gateway");
        setLoading(false);
      };
    } catch (error) {
      toast.error("Failed to initiate payment");
      console.error("Payment error:", error);
      setLoading(false);
    }
  };

  if (loadingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (premiumStatus?.isPremium) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 relative">
        <PageBackground variant="premium" />
        <GridPattern opacity={0.02} />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg shadow-yellow-500/25">
                <Crown className="h-10 w-10 text-black" />
              </div>
              <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
                You're Premium! <Sparkles className="h-8 w-8 text-yellow-500" />
              </h1>
              <p className="text-muted-foreground">Enjoy unlimited access to all features</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left" staggerDelay={50}>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Unlimited course generation</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Full curriculum access</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Engineering courses</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>YouTube course generation</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Studio courses</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Content Ingestion</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Code Editor & AI Builder</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Multi-language translation</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Analytics Dashboard</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>AI Personalization</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Offline Learning</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>LMS Integration</span>
                </div>
              </StaggerChildren>

              <Button onClick={() => router.push("/generate")} className="w-full mt-6 bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold transition-all duration-300 hover:scale-[1.02]">
                Start Creating Courses
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 relative">
      <PageBackground variant="premium" />
      <GridPattern opacity={0.02} />

      {/* Premium Celebration Modal */}
      <PremiumCelebration
        isOpen={showCelebration}
        onClose={() => {
          setShowCelebration(false);
          router.push("/generate");
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg shadow-yellow-500/25">
              <Crown className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Upgrade to Premium</h1>
            <p className="text-xl text-muted-foreground">Unlock unlimited learning possibilities</p>
          </div>
        </ScrollReveal>

        {/* Plans Grid */}
        <StaggerChildren className="grid md:grid-cols-3 gap-6 mb-12" staggerDelay={150}>
          {/* Free Plan */}
          <HoverCard>
            <Card className="p-6 border-2 bg-card/50 backdrop-blur-sm h-full">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-3xl font-bold mb-1">₹0</div>
              <div className="text-sm text-muted-foreground mb-6">forever</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>3 custom courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>1 YouTube course</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>1 Studio course</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>1 Offline download</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Basic gamification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5 shrink-0">✕</span>
                  <span className="text-muted-foreground">Curriculum access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5 shrink-0">✕</span>
                  <span className="text-muted-foreground">Engineering courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mtshrink-0">✕</span>
                  <span className="text-muted-foreground">Advanced features</span>
                </li>
              </ul>
              <div className="text-sm text-muted-foreground">
                Current: {premiumStatus?.courseCount || 0}/3 courses used
              </div>
            </Card>
          </HoverCard>

          {/* Premium Plan */}
          <HoverCard>
            <Card className="p-6 border-2 border-yellow-500 relative overflow-hidden bg-card/50 backdrop-blur-sm h-full">
              <div className="absolute top-0 right-0 bg-yellow-500 text-black px-3 py-1 text-sm font-semibold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                Premium
                <Crown className="h-6 w-6 text-yellow-500" />
              </h3>
              <div className="text-3xl font-bold mb-1">₹100</div>
              <div className="text-sm text-muted-foreground mb-6">per month</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-semibold">Unlimited custom courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-semibold">Unlimited YouTube courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-semibold">Unlimited Studio courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-semibold">Full curriculum (LKG-12)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-semibold">Engineering courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-semibold">All advanced features</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-semibold">Priority support</span>
                </li>
              </ul>
              <Button
                onClick={() => handleUpgrade("premium")}
                disabled={loading && selectedPlan === "premium"}
                className="w-full bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold transition-all duration-300 hover:scale-[1.02]"
              >
                {loading && selectedPlan === "premium" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Upgrade Now
                  </>
                )}
              </Button>

              {/* Coupon Input */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Have a coupon?"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="pl-9 text-sm"
                    />
                  </div>
                </div>
                {couponApplied && (
                  <p className="text-xs text-green-600 mt-2">
                    ✓ Coupon applied! You save ₹{couponApplied.discount}
                  </p>
                )}
              </div>
            </Card>
          </HoverCard>

          {/* Education Plan */}
          <HoverCard>
            <Card className="p-6 border-2 border-blue-500 relative overflow-hidden bg-card/50 backdrop-blur-sm h-full">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-semibold">
                50% OFF
              </div>
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                Education
                <School className="h-6 w-6 text-blue-500" />
              </h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold">₹50</span>
                <span className="text-lg text-muted-foreground line-through">₹100</span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">per month</div>
              <div className="text-xs text-blue-600 font-medium mb-4 flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                For Schools & Colleges
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-semibold">All Premium features</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-semibold">50% discount</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-semibold">Valid .edu email required</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-semibold">Student ID verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-semibold">Classroom integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-semibold">Bulk licensing available</span>
                </li>
              </ul>
              <Button
                onClick={() => handleUpgrade("education")}
                disabled={loading && selectedPlan === "education"}
                className="w-full bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
              >
                {loading && selectedPlan === "education" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Get Education Plan
                  </>
                )}
              </Button>
            </Card>
          </HoverCard>
        </StaggerChildren>

        {/* All Features Section */}
        <ScrollReveal delay={200}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">All Premium Features</h2>
            <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={50}>
              <HoverCard>
                <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h4 className="font-semibold text-sm">Unlimited Courses</h4>
                  <p className="text-xs text-muted-foreground">Custom, YouTube, Studio</p>
                </Card>
              </HoverCard>
              <HoverCard>
                <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <GraduationCap className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h4 className="font-semibold text-sm">Full Curriculum</h4>
                  <p className="text-xs text-muted-foreground">LKG to Class 12</p>
                </Card>
              </HoverCard>
              <HoverCard>
                <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <Building2 className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h4 className="font-semibold text-sm">Engineering</h4>
                  <p className="text-xs text-muted-foreground">All branches & semesters</p>
                </Card>
              </HoverCard>
              <HoverCard>
                <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <h4 className="font-semibold text-sm">Content Ingestion</h4>
                  <p className="text-xs text-muted-foreground">PDFs & textbooks</p>
                </Card>
              </HoverCard>
              <HoverCard>
                <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <Code2 className="h-8 w-8 mx-auto mb-2 text-cyan-500" />
                  <h4 className="font-semibold text-sm">Code Editor</h4>
                  <p className="text-xs text-muted-foreground">AI Website Builder</p>
                </Card>
              </HoverCard>
              <HoverCard>
                <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <Languages className="h-8 w-8 mx-auto mb-2 text-pink-500" />
                  <h4 className="font-semibold text-sm">Translation</h4>
                  <p className="text-xs text-muted-foreground">Multi-language support</p>
                </Card>
              </HoverCard>
              <HoverCard>
                <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-indigo-500" />
                  <h4 className="font-semibold text-sm">Analytics</h4>
                  <p className="text-xs text-muted-foreground">Performance tracking</p>
                </Card>
              </HoverCard>
              <HoverCard>
                <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-red-500" />
                  <h4 className="font-semibold text-sm">AI Personalization</h4>
                  <p className="text-xs text-muted-foreground">Smart recommendations</p>
                </Card>
              </HoverCard>
              <HoverCard>
                <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <Wifi className="h-8 w-8 mx-auto mb-2 text-teal-500" />
                  <h4 className="font-semibold text-sm">Offline Learning</h4>
                  <p className="text-xs text-muted-foreground">Unlimited downloads</p>
                </Card>
              </HoverCard>
              <HoverCard>
                <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <Video className="h-8 w-8 mx-auto mb-2 text-rose-500" />
                  <h4 className="font-semibold text-sm">Multimodal</h4>
                  <p className="text-xs text-muted-foreground">Audio & video scripts</p>
                </Card>
              </HoverCard>
              <HoverCard>
                <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                  <h4 className="font-semibold text-sm">Gamification</h4>
                  <p className="text-xs text-muted-foreground">XP, badges, streaks</p>
                </Card>
              </HoverCard>
              <HoverCard>
                <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-border/50">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
                  <h4 className="font-semibold text-sm">LMS Integration</h4>
                  <p className="text-xs text-muted-foreground">Moodle & Canvas</p>
                </Card>
              </HoverCard>
            </StaggerChildren>
          </div>
        </ScrollReveal>

        {/* Education Plan Banner */}
        <ScrollReveal delay={300}>
          <Card className="p-6 bg-linear-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 mb-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <School className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Are you a Student or Teacher?</h3>
                  <p className="text-muted-foreground">
                    Get 50% off with our Education Plan. Valid for schools, colleges, and universities.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleUpgrade("education")}
                disabled={loading && selectedPlan === "education"}
                className="bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white whitespace-nowrap transition-all duration-300 hover:scale-105"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Get Education Discount
              </Button>
            </div>
          </Card>
        </ScrollReveal>

        {/* FAQ or Trust Section */}
        <ScrollReveal delay={400}>
          <div className="text-center text-sm text-muted-foreground">
            <p>Secure payments powered by Razorpay. Cancel anytime.</p>
            <p className="mt-1">Questions? Contact us at vikas.ambalazari@gmail.com</p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
