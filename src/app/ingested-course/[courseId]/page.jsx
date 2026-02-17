"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth";
import {
    PageBackground,
    GridPattern,
    ScrollReveal,
} from "@/components/ui/PageWrapper";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import {
    Loader2,
    BookOpen,
    ArrowLeft,
    Sparkles,
    BarChart3,
    Clock,
    FileText,
    BookMarked,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BookmarkButton from "@/components/chapter_content/BookmarkButton";

export default function IngestedCoursePage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCourse();
    }, [params.courseId]);

    const fetchCourse = async () => {
        try {
            const res = await fetch(`/api/ingested-courses/${params.courseId}`);
            if (res.ok) {
                const data = await res.json();
                setCourse(data.course);
                setChapters(data.chapters || []);
            } else {
                setError("Course not found");
            }
        } catch (err) {
            setError("Failed to load course");
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading course...</p>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                    <p className="text-muted-foreground mb-4">{error || "Course not found"}</p>
                    <Button
                        variant="outline"
                        onClick={() => router.push("/content-ingestion")}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Content Ingestion
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-6 relative">
            <PageBackground />
            <GridPattern opacity={0.02} />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => router.push("/content-ingestion")}
                    className="mb-4 text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Content Ingestion
                </Button>

                {/* Course Header */}
                <ScrollReveal>
                    <div className="mb-8">
                        <div className="flex items-start gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h1 className="text-3xl font-bold mb-1">{course.title}</h1>
                                    {user && (
                                        <BookmarkButton
                                            courseId={params.courseId}
                                            courseTitle={course.title}
                                            courseType="ingested"
                                        />
                                    )}
                                </div>
                                <p className="text-muted-foreground mt-1">
                                    {course.description}
                                </p>
                            </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                                <BookOpen className="h-4 w-4 text-purple-500" />
                                {chapters.length} Chapters
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                                <BarChart3 className="h-4 w-4 text-blue-500" />
                                {course.metadata?.totalWords?.toLocaleString()} Words
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                                <Clock className="h-4 w-4 text-green-500" />
                                {course.metadata?.estimatedReadingTime} min read
                            </span>
                            {course.source?.fileName && (
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
                                    <FileText className="h-4 w-4" />
                                    {course.source.fileName}
                                </span>
                            )}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Chapters List */}
                <ScrollReveal delay={100}>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <BookMarked className="h-5 w-5 text-purple-500" />
                        Course Chapters
                    </h2>

                    <div className="space-y-3">
                        {chapters.map((chapter, index) => (
                            <Card
                                key={chapter.id}
                                className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple-500/30 transition-all cursor-pointer group"
                                onClick={() =>
                                    router.push(
                                        `/ingested-course/${params.courseId}/${chapter.id}`
                                    )
                                }
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-colors">
                                            <span className="text-sm font-bold text-purple-500">
                                                {chapter.chapterNumber}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium group-hover:text-purple-500 transition-colors truncate">
                                                {chapter.title}
                                            </h3>
                                            {chapter.summary && (
                                                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                                                    {chapter.summary}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                                <span>{chapter.wordCount?.toLocaleString()} words</span>
                                                <span>
                                                    ~{Math.ceil((chapter.wordCount || 0) / 200)} min read
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Start Reading Button */}
                {chapters.length > 0 && (
                    <ScrollReveal delay={200}>
                        <div className="mt-8 text-center">
                            <Button
                                size="lg"
                                onClick={() =>
                                    router.push(
                                        `/ingested-course/${params.courseId}/${chapters[0].id}`
                                    )
                                }
                                className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8"
                            >
                                <BookOpen className="h-5 w-5 mr-2" />
                                Start Reading
                            </Button>
                        </div>
                    </ScrollReveal>
                )}
            </div>
        </div>
    );
}
