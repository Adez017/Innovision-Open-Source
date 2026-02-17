import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { getServerSession } from "@/lib/auth-server";

// GET - Fetch user's bookmarks
export async function GET(request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRef = adminDb.collection("users").doc(session.user.email);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ bookmarks: [] });
    }

    const bookmarks = userDoc.data().bookmarks || [];
    return NextResponse.json({ bookmarks });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json({ error: "Failed to fetch bookmarks" }, { status: 500 });
  }
}

// POST - Add or remove bookmark
export async function POST(request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { roadmapId, courseId, chapterNumber, chapterTitle, roadmapTitle, courseTitle, courseType, action, chapterId } = await request.json();

    // Support both roadmapId (legacy) and courseId (new)
    const id = courseId || roadmapId;
    const title = courseTitle || roadmapTitle || "Course";
    const type = courseType || "roadmap"; // "roadmap", "ingested", "youtube", etc.

    if (!id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const userRef = adminDb.collection("users").doc(session.user.email);
    const userDoc = await userRef.get();

    let bookmarks = userDoc.exists ? (userDoc.data().bookmarks || []) : [];
    // If chapterNumber/chapterId is missing, assume it's a course bookmark
    const bookmarkId = chapterNumber !== undefined ? `${type}_${id}_${chapterNumber}` : `${type}_${id}_course`;

    if (action === "remove") {
      // Remove bookmark
      bookmarks = bookmarks.filter(b => b.id !== bookmarkId);
    } else {
      // Add bookmark if not exists
      const exists = bookmarks.some(b => b.id === bookmarkId);
      if (!exists) {
        bookmarks.push({
          id: bookmarkId,
          roadmapId: id, // Keep for backward compatibility
          courseId: id,
          chapterNumber: chapterNumber || 0, // Default to 0 if course level
          chapterId: chapterId || null, // Specific ID for ingested/youtube chapters
          chapterTitle: chapterTitle || (chapterNumber ? `Chapter ${chapterNumber}` : "Course Overview"),
          roadmapTitle: title, // Keep for backward compatibility
          courseTitle: title,
          courseType: type,
          createdAt: new Date().toISOString(),
        });
      }
    }

    await userRef.set({ bookmarks }, { merge: true });

    return NextResponse.json({
      success: true,
      bookmarks,
      isBookmarked: action !== "remove"
    });
  } catch (error) {
    console.error("Error updating bookmark:", error);
    return NextResponse.json({ error: "Failed to update bookmark" }, { status: 500 });
  }
}
