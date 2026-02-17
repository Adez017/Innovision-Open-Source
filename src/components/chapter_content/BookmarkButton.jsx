"use client";

import { useState, useEffect } from "react";
import { Bookmark, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth";

export default function BookmarkButton({
  roadmapId,
  courseId,
  chapterNumber,
  chapterTitle = "",
  roadmapTitle = "",
  courseTitle = "",
  courseType = "roadmap",
  size = "default",
  ...rest
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const id = courseId || roadmapId;
  const title = courseTitle || roadmapTitle;

  // Check if chapter is bookmarked on mount
  useEffect(() => {
    if (!user) return;

    async function checkBookmark() {
      try {
        const res = await fetch("/api/bookmarks");
        const data = await res.json();

        if (data.bookmarks) {
          // If chapterNumber is missing, check for course-level bookmark
          const bookmarkId = chapterNumber !== undefined
            ? `${courseType}_${id}_${chapterNumber}`
            : `${courseType}_${id}_course`;

          setIsBookmarked(data.bookmarks.some(b => b.id === bookmarkId));
        }
      } catch (error) {
        console.error("Error checking bookmark:", error);
      }
    }

    checkBookmark();
  }, [user, id, chapterNumber, courseType]);

  const toggleBookmark = async () => {
    if (!user) {
      toast.error("Please login to bookmark chapters");
      return;
    }

    setLoading(true);

    try {
      const body = {
        roadmapId: id, // Backward compatibility
        courseId: id,
        chapterNumber: chapterNumber,
        chapterTitle: chapterTitle || (chapterNumber ? `Chapter ${chapterNumber}` : "Course Overview"),
        roadmapTitle: title, // Backward compatibility
        courseTitle: title,
        courseType,
        action: isBookmarked ? "remove" : "add",
        chapterId: rest.chapterId, // Pass chapterId if available
      };

      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        setIsBookmarked(!isBookmarked);
        toast.success(
          isBookmarked ? "Bookmark removed" : (chapterNumber ? "Chapter bookmarked!" : "Course bookmarked!"),
          {
            icon: <Bookmark className={`h-4 w-4 ${!isBookmarked ? "fill-yellow-500 text-yellow-500" : ""}`} />,
            action: !isBookmarked ? {
              label: "View Bookmarks",
              onClick: () => router.push("/profile"),
            } : null,
          }
        );
      }
    } catch (error) {
      console.error("Bookmark error:", error);
      toast.error("Failed to update bookmark");
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-9 w-9",
    lg: "h-10 w-10",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    default: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleBookmark}
      disabled={loading}
      className={`
        ${sizeClasses[size]}
        transition-all duration-200
        ${isBookmarked
          ? "text-yellow-500 hover:text-yellow-600"
          : "text-muted-foreground hover:text-foreground"
        }
      `}
      title={isBookmarked ? "Remove bookmark" : "Bookmark this chapter"}
    >
      <Bookmark
        className={`
          ${iconSizes[size]}
          transition-all duration-200
          ${isBookmarked ? "fill-yellow-500" : ""}
          ${loading ? "animate-pulse" : ""}
        `}
      />
    </Button>
  );
}
