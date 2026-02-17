import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET(request) {
  try {
    const adminDb = getAdminDb();

    if (!adminDb) {
      return NextResponse.json({
        error: "Firebase Admin not initialized",
        details: "Check server logs for initialization errors"
      }, { status: 500 });
    }

    const coursesRef = adminDb.collection("published_courses");
    const q = coursesRef.where("status", "==", "published");
    const querySnapshot = await q.get();

    const courses = [];
    querySnapshot.forEach((doc) => {
      courses.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Sort in memory instead of using Firestore orderBy
    courses.sort((a, b) => {
      const dateA = new Date(a.publishedAt || 0);
      const dateB = new Date(b.publishedAt || 0);
      return dateB - dateA;
    });

    return NextResponse.json({
      success: true,
      courses,
      count: courses.length,
      debug: {
        adminDbInitialized: !!adminDb,
        queryExecuted: true
      }
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({
      error: "Failed to fetch courses",
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
