"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Sparkles } from "lucide-react";
import CourseCard from "@/components/Home/CourseCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { loader } from "@/components/ui/Custom/ToastLoader";
import { PageBackground, GridPattern, PageHeader, ScrollReveal, HoverCard } from "@/components/ui/PageWrapper";
import ChatBot from "@/components/chat/ChatBot";

export default function page() {
    const [error, setError] = useState(null);
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const { hideLoader } = loader();

    async function fetchRoadmaps() {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/roadmap/all");

            if (!response.ok) {
                throw new Error("Failed to fetch roadmaps");
            }

            const data = await response.json();
            setRoadmaps(data?.docs || []);
        } catch (err) {
            console.error("Roadmap fetch error:", err);
            setError("Unable to load your courses.");
            setRoadmaps([]);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchRoadmaps();
    }, []);

    const completedCourses = roadmaps.filter(r => r.process === "completed");

    return (
        <div className="min-h-screen bg-background relative">
            <PageBackground variant="courses" />
            <GridPattern opacity={0.02} />

            <div className="max-w-6xl flex flex-col gap-4 items-center p-4 mb-16 mx-auto relative z-10">
                <PageHeader
                    title="Your Courses"
                    description="Manage and continue your learning journey"
                    icon={BookOpen}
                    iconColor="text-blue-500"
                    badge={<><Sparkles className="h-3.5 w-3.5" /> My Learning</>}
                />

                <div className="flex gap-6 justify-center flex-wrap w-full">
                    {loading ? (
                        Array(6)
                            .fill(0)
                            .map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="w-[320px] h-[280px] rounded-xl"
                                />
                            ))
                    ) : error ? (
                        <div className="w-full text-center py-16 text-muted-foreground">
                            <div className="flex flex-col items-center">
                                <BookOpen className="h-12 w-12 mb-4 opacity-50" />
                                <p className="text-lg font-semibold">
                                    We couldn't load your courses
                                </p>
                                <p className="text-sm mt-2">
                                    Please try again or refresh the page.
                                </p>
                                <button
                                    onClick={fetchRoadmaps}
                                    className="mt-4 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    ) : completedCourses.length === 0 ? (
                        <div className="w-full text-center py-16 text-muted-foreground">
                            <div className="flex flex-col items-center">
                                <BookOpen className="h-12 w-12 mb-4 opacity-50" />
                                <p className="text-lg font-medium">
                                    You don't have any courses yet
                                </p>
                                <p className="text-sm mt-2">
                                    Start by generating your first roadmap
                                </p>
                                <Link href="/generate" className="mt-4">
                                    <Button>Create Course</Button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Course Cards */}
                            {completedCourses.map((roadmap, index) => (
                                <ScrollReveal key={roadmap.id} delay={index * 50}>
                                    <HoverCard>
                                        <CourseCard
                                            course={roadmap}
                                            onDelete={fetchRoadmaps}
                                        />
                                    </HoverCard>
                                </ScrollReveal>
                            ))}

                            {/* Create New Course Card */}
                            <ScrollReveal delay={completedCourses.length * 50}>
                                <HoverCard>
                                    <Card className="w-[320px] h-[280px] relative flex items-center justify-center border-2 border-dashed border-border/50 bg-card/30 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
                                        <div className="flex flex-col items-center text-muted-foreground">
                                            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                                                <Plus strokeWidth={1.5} className="w-8 h-8 text-blue-500" />
                                            </div>
                                            <p className="text-lg text-center font-medium">
                                                Create New Course
                                            </p>
                                        </div>
                                        <Link href={`/generate`} scroll={false}>
                                            <span className="absolute inset-0"></span>
                                        </Link>
                                    </Card>
                                </HoverCard>
                            </ScrollReveal>
                        </>
                    )}
                </div>
            </div>
            <ChatBot />
        </div>
    );
}
