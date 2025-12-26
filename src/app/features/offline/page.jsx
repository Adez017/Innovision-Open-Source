"use client";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Wifi, WifiOff, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useOffline } from "@/hooks/useOffline";
import { toast } from "sonner";

export default function OfflinePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { isOnline, offlineCourses, downloadCourse } = useOffline();
  const [courses, setCourses] = useState([]);
  const [offlineLoading, setOfflineLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchCourses();
    }
  }, [session]);

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
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="mb-6">
          <Link href="/features">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Features
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Offline Learning</h1>
          <p className="text-muted-foreground">Download courses and learn anywhere, anytime</p>
        </div>

        <Card className={isOnline ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"}>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
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
                          disabled={downloading === course.id || !isOnline}
                        >
                          {downloading === course.id ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Downloading...
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

          <Card>
            <CardHeader>
              <CardTitle>Downloaded Courses</CardTitle>
              <CardDescription>Courses available offline ({offlineCourses.length})</CardDescription>
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
        </div>

        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">How Offline Mode Works</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <ul className="list-disc list-inside space-y-1">
              <li>Download courses while online to access them offline</li>
              <li>Your progress is saved locally when offline</li>
              <li>Data automatically syncs when you're back online</li>
              <li>Service Worker caches pages for faster loading</li>
              <li>IndexedDB stores course content locally</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
