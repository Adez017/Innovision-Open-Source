// LMS Sync API
import { NextResponse } from "next/server";
import { LMSIntegration, getLMSConfig } from "@/lib/lms-integration";

export async function POST(request) {
  try {
    const { userId, courseId, action, data } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Get user's LMS configuration
    const config = await getLMSConfig(userId);

    if (!config || !config.enabled) {
      return NextResponse.json({ error: "LMS integration not configured" }, { status: 400 });
    }

    const lms = new LMSIntegration(config.platform, config.credentials);
    await lms.authenticate();

    let result;
    switch (action) {
      case 'syncCourse':
        result = await lms.syncCourse(data.course);
        break;
      case 'syncGrades':
        result = await lms.syncGrades(userId, courseId, data.grades);
        break;
      case 'importStudents':
        result = await lms.importStudents(courseId);
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("LMS sync error:", error);
    return NextResponse.json({ error: "Failed to sync with LMS" }, { status: 500 });
  }
}
