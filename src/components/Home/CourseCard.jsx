"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, BookOpen, Trash2, CheckCircle2 } from "lucide-react";
import { calculateEstimatedTime } from "@/lib/time-utils";
import { Progress } from "@/components/ui/progress";
import DeleteRoadmap from "./DeleteRoadmap";

const CourseCard = ({ course, onDelete }) => {
  const { id, courseTitle, courseDescription, chapterCount, difficulty, chapters } = course;

  // Calculate progress percentage
  const calculateProgress = () => {
    if (!chapters || chapters.length === 0) return 0;
    const completedChapters = chapters.filter(ch => ch.completed).length;
    return Math.round((completedChapters / chapters.length) * 100);
  };

  const progress = calculateProgress();
  const completedChapters = chapters?.filter(ch => ch.completed).length || 0;

  // Calculate estimated time
  const estimatedTime = calculateEstimatedTime(chapterCount, difficulty);

  // Get progress color based on percentage
  const getProgressColor = (percentage) => {
    if (percentage === 0) return "bg-gray-400";
    if (percentage < 33) return "bg-red-500";
    if (percentage < 67) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Get difficulty badge color
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "fast":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
      case "balanced":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "in-depth":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  const getDifficultyLabel = (diff) => {
    switch (diff) {
      case "fast":
        return "Fast-paced";
      case "balanced":
        return "Balanced";
      case "in-depth":
        return "In-depth";
      default:
        return "Balanced";
    }
  };

  return (
    <Card className="w-[320px] h-[280px] relative group hover:shadow-lg transition-all duration-300 hover:border-blue-500/50 bg-card/50 backdrop-blur-sm">
      <Link href={`/roadmap/${id}`} className="absolute inset-0 z-0" />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2 leading-tight">
            {courseTitle}
          </CardTitle>
          <DeleteRoadmap
            id={id}
            onDelete={onDelete}
            className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <CardDescription className="line-clamp-2 text-sm">
          {courseDescription}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Progress</span>
            </div>
            <span className={`font-semibold ${
              progress === 100 ? 'text-green-600 dark:text-green-400' : 
              progress > 0 ? 'text-blue-600 dark:text-blue-400' : 
              'text-muted-foreground'
            }`}>
              {progress}%
            </span>
          </div>
          <Progress 
            value={progress} 
            className="h-2"
            indicatorClassName={getProgressColor(progress)}
          />
          <p className="text-xs text-muted-foreground">
            {completedChapters} of {chapterCount} chapters completed
          </p>
        </div>

        {/* Chapter Count & Time */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>{chapterCount} {chapterCount === 1 ? "Chapter" : "Chapters"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{estimatedTime}</span>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(
              difficulty
            )}`}
          >
            {getDifficultyLabel(difficulty)}
          </span>
          {progress === 100 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
              ✓ Completed
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
