"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Quick access card for curriculum-based learning
 * Can be placed on dashboard or home page
 */
export default function QuickCurriculumCard() {
  const router = useRouter();

  const popularCourses = [
    { class: "CLASS_10", board: "CBSE", subject: "Mathematics", label: "Class 10 Math" },
    { class: "CLASS_12", board: "CBSE", subject: "Physics", label: "Class 12 Physics" },
    { class: "CLASS_9", board: "CBSE", subject: "Science", label: "Class 9 Science" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Curriculum-Based Learning
        </CardTitle>
        <CardDescription>
          Generate courses aligned with CBSE & State board syllabus
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={() => router.push('/generate')}
          className="w-full"
          variant="default"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Browse Full Curriculum
        </Button>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Popular courses:</p>
          <div className="flex flex-wrap gap-2">
            {popularCourses.map((course, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => router.push('/generate')}
              >
                {course.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
