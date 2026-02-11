"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar/page";
import StudioContent from "@/components/chapter_content/StudioContent";
import { useAuth } from "@/contexts/auth";
import { useContext } from "react";
import xpContext from "@/contexts/xp";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function StudioCoursePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { awardXP } = useContext(xpContext);
  const [viewAwarded, setViewAwarded] = useState(false);

  const chapterIndex = parseInt(params.chapterId) - 1;

  useEffect(() => {
    fetchCourse();
  }, [params.courseId]);

  // Award XP for viewing chapter
  useEffect(() => {
    if (user && awardXP && !viewAwarded) {
      awardXP('view_course');
      setViewAwarded(true);
    }
  }, [user, awardXP, viewAwarded]);

  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/courses/${params.courseId}`);
      if (res.ok) {
        const data = await res.json();
        setCourseData(data); // Store original data

        // Transform course data to match roadmap structure for Sidebar
        const transformedData = {
          courseTitle: data.title,
          courseDescription: data.description,
          chapters: data.chapters.map((ch, idx) => ({
            chapterNumber: idx + 1,
            chapterTitle: ch.title,
            chapterDescription: ch.description,
            contentOutline: [],
            completed: false
          }))
        };
        setCourse(transformedData);
      }
    } catch (error) {
      console.error("Failed to fetch course");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!course || !courseData || !courseData.chapters || !courseData.chapters[chapterIndex]) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chapter not found</p>
      </div>
    );
  }

  const currentChapter = courseData.chapters[chapterIndex];
  const totalChapters = courseData.chapters.length;
  const isFirstChapter = chapterIndex === 0;
  const isLastChapter = chapterIndex >= totalChapters - 1;

  const handlePrevChapter = () => {
    if (!isFirstChapter) {
      router.push(`/studio-course/${params.courseId}/${chapterIndex}`);
    }
  };

  const handleNextChapter = () => {
    if (!isLastChapter) {
      router.push(`/studio-course/${params.courseId}/${chapterIndex + 2}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        roadmap={course}
        roadmapId={params.courseId}
        activeChapter={chapterIndex}
        activeSubtopic={0}
        isStudioCourse={true}
        courseId={params.courseId}
      />
      <div className="flex-1 pt-20 lg:ml-96">
        <div className="p-6 max-w-4xl mx-auto">
          <StudioContent content={currentChapter.content} />

          {/* Chapter Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 mb-6">
            <Button
              variant="outline"
              onClick={handlePrevChapter}
              disabled={isFirstChapter}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Previous Chapter</span>
            </Button>

            <span className="text-sm text-muted-foreground">
              Chapter {chapterIndex + 1} of {totalChapters}
            </span>

            <Button
              onClick={handleNextChapter}
              disabled={isLastChapter}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <span>Next Chapter</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
