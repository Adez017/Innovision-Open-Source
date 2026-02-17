import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

/**
 * GET /api/ingested-courses/[courseId]/chapters/[chapterId] - Get full chapter content
 */
export async function GET(request, { params }) {
    try {
        const db = getAdminDb();
        if (!db) {
            return NextResponse.json(
                { error: "Database not available" },
                { status: 503 }
            );
        }

        const { courseId, chapterId } = await params;

        // Verify course exists
        const courseRef = db.collection("ingested_courses").doc(courseId);
        const courseSnap = await courseRef.get();

        if (!courseSnap.exists) {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404 }
            );
        }

        // Get chapter
        const chapterRef = courseRef.collection("chapters").doc(chapterId);
        const chapterSnap = await chapterRef.get();

        if (!chapterSnap.exists) {
            return NextResponse.json(
                { error: "Chapter not found" },
                { status: 404 }
            );
        }

        const chapterData = chapterSnap.data();

        // Get adjacent chapters for navigation
        const allChaptersSnap = await courseRef
            .collection("chapters")
            .orderBy("order", "asc")
            .get();

        const allChapters = allChaptersSnap.docs.map((doc) => ({
            id: doc.id,
            order: doc.data().order,
        }));

        const currentIndex = allChapters.findIndex((ch) => ch.id === chapterId);
        const previousChapterId =
            currentIndex > 0 ? allChapters[currentIndex - 1].id : null;
        const nextChapterId =
            currentIndex < allChapters.length - 1
                ? allChapters[currentIndex + 1].id
                : null;

        return NextResponse.json({
            chapter: {
                id: chapterSnap.id,
                chapterNumber: chapterData.chapterNumber,
                title: chapterData.title,
                content: chapterData.content,
                summary: chapterData.summary,
                wordCount: chapterData.wordCount,
                previousChapterId,
                nextChapterId,
            },
            courseTitle: courseSnap.data().title,
        });
    } catch (error) {
        console.error("Error fetching chapter:", error);
        return NextResponse.json(
            { error: "Failed to fetch chapter" },
            { status: 500 }
        );
    }
}
