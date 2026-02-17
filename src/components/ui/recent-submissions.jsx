import { Badge } from "@/components/ui/badge";
import { Skeleton } from "./skeleton";
import Link from "next/link";

export function RecentCourses({ courses, loading }) {
    if (loading) return (
        <div className="flex flex-col gap-2">
            <Skeleton className={"flex h-12"}></Skeleton>
            <Skeleton className={"flex h-12"}></Skeleton>
            <Skeleton className={"flex h-12"}></Skeleton>
        </div>
    )
    return (
        <div className="space-y-4">
            {courses[0] ? courses.map((course) => (
                <div
                    key={course.id}
                    className="flex flex-col gap-2 rounded-lg border p-3"
                >
                    <div className="flex items-center justify-between">
                        <Link
                            href={
                                course.courseType === "ingested"
                                    ? `/ingested-course/${course.id}`
                                    : course.courseType === "youtube"
                                        ? `/youtube-course/${course.id}`
                                        : `/roadmap/${course.id}`
                            }
                            className="font-medium hover:underline"
                        >
                            {course.courseTitle}
                        </Link>
                        <Badge
                            variant={
                                course.progress === "In Progress"
                                    ? "secondary"
                                    : "destructive"
                            }
                            className={
                                course.progress === "In Progress"
                                    ? "text-yellow-500 bg-yellow-50"
                                    : "text-red-500 bg-red-50"
                            }
                        >
                            {course.progress}
                        </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <div className=" text-muted-foreground">
                            Generated  {" "}:{" "}
                            {new Date(course.createdAt).toLocaleDateString(
                                "en-US",
                                { month: "long", year: "numeric" }
                            )}
                        </div>
                    </div>
                </div>
            )) : <div className="flex justify-center">You have no recent or completed courses</div>}
        </div>
    );
}
