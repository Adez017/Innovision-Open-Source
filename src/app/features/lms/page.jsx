"use client";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Loader2, RefreshCw, Crown } from "lucide-react";
import Link from "next/link";
import LMSConfig from "@/components/settings/LMSConfig";
import { getLMSConfig } from "@/lib/lms-integration";
import { toast } from "sonner";
import PremiumDialog from "@/components/PremiumDialog";
import { PageBackground, GridPattern, PageHeader, ScrollReveal, HoverCard } from "@/components/ui/PageWrapper";

export default function LMSPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [config, setConfig] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [courses, setCourses] = useState([]);
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
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.email) {
      loadConfig();
      fetchCourses();
    }
  }, [user]);

  const loadConfig = async () => {
    try {
      const savedConfig = await getLMSConfig(user.email);
      setConfig(savedConfig);
    } catch (error) {
      console.error("Failed to load config:", error);
    } finally {
      setPageLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/roadmap/all");
      const data = await response.json();
      setCourses(data.docs.filter((doc) => doc.process === "completed"));
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const syncCourse = async (course) => {
    if (!config?.enabled) {
      toast.error("Please configure LMS integration first");
      return;
    }

    setSyncing(true);
    try {
      const response = await fetch("/api/lms/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.email,
          courseId: course.id,
          action: "syncCourse",
          data: {
            course: {
              id: course.id,
              title: course.courseTitle,
              description: course.courseDescription,
            },
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Course synced to ${config.platform}!`);
      } else {
        toast.error(data.error || "Failed to sync course");
      }
    } catch (error) {
      console.error("Sync error:", error);
      toast.error("An error occurred while syncing");
    } finally {
      setSyncing(false);
    }
  };

  if (loading || pageLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <PageBackground variant="default" />
      <GridPattern opacity={0.02} />

      <div className="max-w-6xl mx-auto p-6 space-y-6 relative z-10">
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
          icon={RefreshCw}
          iconColor="text-blue-500"
          title="LMS Integration"
          description="Connect with Moodle or Canvas to sync courses and grades"
          badge="🔗 Premium Feature"
        />

        <PremiumDialog
          open={showPremiumDialog}
          onOpenChange={setShowPremiumDialog}
          feature="LMS Integration"
        />

        {!premiumStatus.isPremium ? (
          <ScrollReveal delay={100}>
            <div className="text-center p-6 sm:p-12 border-2 border-dashed rounded-xl bg-card/50 backdrop-blur-sm">
              <RefreshCw className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h2 className="text-2xl font-bold mb-4">Premium Feature</h2>
              <p className="text-muted-foreground mb-6">
                LMS Integration is only available for Premium users.
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
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <ScrollReveal delay={100}>
                  <LMSConfig />
                </ScrollReveal>

                {config?.enabled && (
                  <ScrollReveal delay={150}>
                    <Card className="bg-green-50/80 dark:bg-green-950/80 border-green-200 dark:border-green-800 backdrop-blur-sm">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <div>
                            <p className="font-semibold text-green-900 dark:text-green-100">
                              Connected to {config.platform === "moodle" ? "Moodle" : "Canvas"}
                            </p>
                            <p className="text-sm text-green-800 dark:text-green-200">{config.credentials.baseUrl}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                )}
              </div>

              <ScrollReveal delay={200}>
                <HoverCard>
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle>Sync Courses</CardTitle>
                      <CardDescription>Sync your InnoVision courses to your LMS</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!config?.enabled ? (
                        <div className="text-center p-8 text-muted-foreground">
                          <p>Configure LMS integration to sync courses</p>
                        </div>
                      ) : courses.length > 0 ? (
                        <div className="space-y-3">
                          {courses.map((course) => (
                            <div
                              key={course.id}
                              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex-1">
                                <h4 className="font-semibold">{course.courseTitle?.split(":")[0] || "Untitled Course"}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-1">{course.courseDescription}</p>
                              </div>
                              <Button size="sm" onClick={() => syncCourse(course)} disabled={syncing}>
                                {syncing ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Syncing...
                                  </>
                                ) : (
                                  <>
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Sync
                                  </>
                                )}
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-8 text-muted-foreground">
                          <p>No courses available to sync</p>
                          <Link href="/generate">
                            <Button className="mt-4">Create Course</Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </HoverCard>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={250}>
              <Card className="bg-blue-50/80 dark:bg-blue-950/80 border-blue-200 dark:border-blue-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-900 dark:text-blue-100">Integration Features</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-800 dark:text-blue-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Moodle Integration</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Sync courses to Moodle</li>
                        <li>Export grades to gradebook</li>
                        <li>Import enrolled students</li>
                        <li>Web services API support</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Canvas Integration</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Create Canvas courses</li>
                        <li>Sync assignments and grades</li>
                        <li>Import course rosters</li>
                        <li>REST API integration</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </>
        )}
      </div>
    </div>
  );
}
