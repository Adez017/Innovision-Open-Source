"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, User, Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PageBackground, GridPattern, PageHeader, ScrollReveal, StaggerChildren, HoverCard } from "@/components/ui/PageWrapper";

export default function CoursesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      // Fetch both published courses and user's ingested courses
      const [publishedRes, ingestedRes] = await Promise.all([
        fetch("/api/courses/public"),
        user ? fetch("/api/ingested-courses").catch(() => ({ ok: false })) : Promise.resolve({ ok: false }),
      ]);

      const courses = [];

      if (publishedRes.ok) {
        const publishedData = await publishedRes.json();
        courses.push(...(publishedData.courses || []).map(c => ({
          ...c,
          type: "published",
          courseType: "published",
        })));
      }

      if (ingestedRes.ok) {
        const ingestedData = await ingestedRes.json();
        courses.push(...(ingestedData.courses || []).map(c => ({
          ...c,
          type: "ingested",
          courseType: "ingested",
          chapters: Array(c.chapterCount || 0).fill(null).map((_, i) => ({
            id: `chapter-${i + 1}`,
            title: `Chapter ${i + 1}`,
          })),
        })));
      }

      setCourses(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
    }
    setLoading(false);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const enrollInCourse = (course) => {
    if (course.type === "ingested" || course.courseType === "ingested") {
      router.push(`/ingested-course/${course.id}`);
    } else {
      router.push(`/courses/${course.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <PageBackground variant="courses" />
      <GridPattern opacity={0.02} />

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <PageHeader
            title="Available Courses"
            description="Browse and enroll in published courses"
            icon={BookOpen}
            iconColor="text-blue-500"
            badge={<><Sparkles className="h-3.5 w-3.5" /> Explore & Learn</>}
          />

          <ScrollReveal delay={100}>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-sm text-muted-foreground mt-4">Loading courses...</p>
            </div>
          ) : filteredCourses.length > 0 ? (
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={100}>
              {filteredCourses.map((course) => (
                <HoverCard key={course.id}>
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span className="line-clamp-2">{course.title}</span>
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 ml-2">
                          <BookOpen className="h-5 w-5 text-blue-500" />
                        </div>
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {course.description || "No description available"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-2" />
                          <span>By {course.createdBy || "Instructor"}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <BookOpen className="h-4 w-4 mr-2" />
                          <span>{course.chapters?.length || 0} chapters</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Published {new Date(course.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <Button
                          onClick={() => enrollInCourse(course)}
                          className="w-full mt-4 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                        >
                          View Course
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </HoverCard>
              ))}
            </StaggerChildren>
          ) : (
            <ScrollReveal>
              <div className="text-center text-muted-foreground py-12">
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-10 w-10 opacity-50" />
                </div>
                <p className="text-lg">
                  {searchQuery ? "No courses found matching your search" : "No courses available yet"}
                </p>
                <p className="text-sm mt-2">Check back later for new courses</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </div>
  );
}
