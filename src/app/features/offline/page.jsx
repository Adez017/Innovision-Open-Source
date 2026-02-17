"use client";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Wifi, WifiOff, CheckCircle, Loader2, Crown } from "lucide-react";
import Link from "next/link";
import { useOffline } from "@/hooks/useOffline";
import { toast } from "sonner";
import { PageBackground, GridPattern, PageHeader, ScrollReveal, HoverCard } from "@/components/ui/PageWrapper";

export default function OfflinePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { isOnline, offlineCourses, downloadCourse } = useOffline();
  const [courses, setCourses] = useState([]);
  const [offlineLoading, setOfflineLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);
  const [premiumStatus, setPremiumStatus] = useState({ isPremium: false });

  useEffect(() => {
    const fetchPremiumStatus = async () => {
      if (user) {
        try {
          const res = await fetch("/api/premium/status");
          const data = await res.json();
          setPremiumStatus(data);
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
    if (user) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/roadmap/all");
      const data = await response.json();
      setCourses(data.docs.filter((doc) => doc.process === "completed"));
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setOfflineLoading(false);
    }
  };

  const handleDownload = async (course) => {
    // Check if free user has reached download limit
    if (!premiumStatus.isPremium && offlineCourses.length >= 1) {
      toast.error("Free users can download only 1 course. Upgrade to Premium for unlimited downloads!");
      return;
    }

    setDownloading(course.id);
    try {
      await downloadCourse(course);
      toast.success(`${course.courseTitle} downloaded for offline access!`);
    } catch (error) {
      toast.error("Failed to download course");
    } finally {
      setDownloading(null);
    }
  };

  const isDownloaded = (courseId) => {
    return offlineCourses.some((c) => c.id === courseId);
  };

  if (offlineLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <PageBackground variant="courses" />
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
          icon={Download}
          iconColor="text-green-500"
          title="Offline Learning"
          description="Download courses and learn anywhere, anytime"
          badge="📥 Learn Offline"
        />

        {!premiumStatus.isPremium && (
          <ScrollReveal delay={100}>
            <Card className="bg-linear-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown className="h-6 w-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2">Free User Limitation</h3>
                    <p className="text-muted-foreground mb-3">
                      <strong className="text-orange-600">Free users can download only 1 course for offline access.</strong>
                      {" "}Upgrade to Premium for unlimited offline downloads!
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-semibold">
                        Downloaded: {offlineCourses.length}/1
                      </span>
                      <Button
                        onClick={() => router.push("/premium")}
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                      >
                        Upgrade to Premium
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        )}

        {premiumStatus.isPremium && (
          <ScrollReveal delay={100}>
            <Card className="bg-linear-to-r from-green-500/10 to-blue-500/10 border-2 border-green-500/30 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 justify-center">
                  <Crown className="h-6 w-6 text-yellow-600" />
                  <span className="font-bold text-lg">Premium: Unlimited Offline Downloads!</span>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        )}

        <ScrollReveal delay={150}>
          <Card className={`backdrop-blur-sm ${isOnline ? "bg-green-50/80 dark:bg-green-950/80" : "bg-red-50/80 dark:bg-red-950/80"}`}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-3">
                {isOnline ? (
                  <>
                    <Wifi className="w-6 h-6 text-green-600" />
                    <span className="text-green-900 dark:text-green-100 font-semibold">You are online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-6 h-6 text-red-600" />
                    <span className="text-red-900 dark:text-red-100 font-semibold">
                      You are offline - Using cached content
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScrollReveal delay={200}>
            <HoverCard>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Available Courses</CardTitle>
                  <CardDescription>Download courses for offline access</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center p-8">
                      <Loader2 className="w-8 h-8 animate-spin" />
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
                          {isDownloaded(course.id) ? (
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle className="w-5 h-5" />
                              <span className="text-sm font-medium">Downloaded</span>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleDownload(course)}
                              disabled={downloading === course.id || !isOnline || (!premiumStatus.isPremium && offlineCourses.length >= 1)}
                            >
                              {downloading === course.id ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Downloading...
                                </>
                              ) : !premiumStatus.isPremium && offlineCourses.length >= 1 ? (
                                <>
                                  <Crown className="w-4 h-4 mr-2" />
                                  Premium Only
                                </>
                              ) : (
                                <>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 text-muted-foreground">
                      <p>No courses available. Create a course first!</p>
                      <Link href="/generate">
                        <Button className="mt-4">Create Course</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </HoverCard>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <HoverCard>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Downloaded Courses</CardTitle>
                  <CardDescription>
                    Courses available offline ({offlineCourses.length}
                    {!premiumStatus.isPremium && "/1"})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {offlineCourses.length > 0 ? (
                    <div className="space-y-3">
                      {offlineCourses.map((course) => (
                        <div key={course.id} className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold">{course.courseTitle?.split(":")[0] || "Untitled Course"}</h4>
                              <p className="text-sm text-muted-foreground">
                                Downloaded: {new Date(course.downloadedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <Link href={`/roadmap/${course.id}`}>
                            <Button variant="outline" size="sm" className="mt-3 w-full">
                              Open Course
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 text-muted-foreground">
                      <WifiOff className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>No offline courses yet</p>
                      <p className="text-sm mt-2">Download courses to access them offline</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </HoverCard>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={300}>
          <Card className="bg-blue-50/80 dark:bg-blue-950/80 border-blue-200 dark:border-blue-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-100">How Offline Mode Works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Download courses while online to access them offline</li>
                <li><strong>Free users: 1 course download limit</strong></li>
                <li><strong>Premium users: Unlimited downloads</strong></li>
                <li>Your progress is saved locally when offline</li>
                <li>Data automatically syncs when you're back online</li>
                <li>Service Worker caches pages for faster loading</li>
                <li>IndexedDB stores course content locally</li>
              </ul>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}
