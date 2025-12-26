"use client";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Loader2, RefreshCw } from "lucide-react";
import Link from "next/link";
import LMSConfig from "@/components/settings/LMSConfig";
import { getLMSConfig } from "@/lib/lms-integration";
import { toast } from "sonner";

export default function LMSPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [config, setConfig] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

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
          userId: session.user.email,
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

  if (loading || loading) {
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
          <h1 className="text-4xl font-bold">LMS Integration</h1>
          <p className="text-muted-foreground">Connect with Moodle or Canvas to sync courses and grades</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <LMSConfig />

            {config?.enabled && (
              <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
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
            )}
          </div>

          <Card>
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
        </div>

        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
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
      </div>
    </div>
  );
}
