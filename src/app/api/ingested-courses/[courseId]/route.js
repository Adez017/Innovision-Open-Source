import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

/**
 * GET /api/ingested-courses/[courseId] - Get a specific ingested course with its chapters
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

        const { courseId } = await params;
        const courseRef = db.collection("ingested_courses").doc(courseId);
        const courseSnap = await courseRef.get();

        if (!courseSnap.exists) {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404 }
            );
        }

        const courseData = courseSnap.data();

        // Fetch chapters
        const chaptersSnap = await courseRef
            .collection("chapters")
            .orderBy("order", "asc")
            .get();

        const chapters = chaptersSnap.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                chapterNumber: data.chapterNumber,
                title: data.title,
                summary: data.summary,
                wordCount: data.wordCount,
                order: data.order,
            };
        });

        return NextResponse.json({
            course: {
                id: courseSnap.id,
                title: courseData.title,
                description: courseData.description,
                metadata: courseData.metadata,
                source: courseData.source,
                status: courseData.status,
                createdAt: courseData.createdAt?.toDate?.() || null,
            },
            chapters,
        });
    } catch (error) {
        console.error("Error fetching ingested course:", error);
        return NextResponse.json(
            { error: "Failed to fetch course" },
            { status: 500 }
        );
    }
}
