// Audio Generation API
import { NextResponse } from "next/server";
import { generateAudioScript } from "@/lib/multimodal";

export async function POST(request) {
  try {
    console.log("Audio generation API called");
    const { chapterContent, options } = await request.json();
    console.log("Content length:", chapterContent?.length);

    if (!chapterContent) {
      return NextResponse.json({ error: "Chapter content required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not found in environment");
      return NextResponse.json({
        error: "GEMINI_API_KEY not configured. Please add it to your .env file."
      }, { status: 500 });
    }

    console.log("Calling generateAudioScript...");
    const script = await generateAudioScript(chapterContent, options);
    console.log("Script generated successfully, length:", script?.length);

    // In production, integrate with text-to-speech service like:
    // - Google Cloud Text-to-Speech
    // - Amazon Polly
    // - ElevenLabs

    return NextResponse.json({
      script,
      audioUrl: null, // Will be populated by TTS service
      message: "Audio script generated successfully! Integrate TTS service for audio file.",
    });
  } catch (error) {
    console.error("Audio generation error details:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json({
      error: error.message || "Failed to generate audio script",
      details: error.toString()
    }, { status: 500 });
  }
}
