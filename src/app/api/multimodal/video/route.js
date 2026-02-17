// Video Storyboard Generation API
import { NextResponse } from "next/server";
import { generateVideoStoryboard } from "@/lib/multimodal";

export async function POST(request) {
  try {
    const { chapterContent, options } = await request.json();

    if (!chapterContent) {
      return NextResponse.json({ error: "Chapter content required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        error: "GEMINI_API_KEY not configured. Please add it to your .env file."
      }, { status: 500 });
    }

    const storyboard = await generateVideoStoryboard(chapterContent, options);

    // In production, integrate with video generation service like:
    // - Synthesia
    // - D-ID
    // - Runway ML

    return NextResponse.json({
      storyboard,
      videoUrl: null, // Will be populated by video generation service
      message: "Video storyboard generated successfully! Integrate video service for rendering.",
    });
  } catch (error) {
    console.error("Video generation error:", error);
    return NextResponse.json({
      error: error.message || "Failed to generate video storyboard"
    }, { status: 500 });
  }
}
