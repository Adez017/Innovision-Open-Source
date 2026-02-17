// Multimodal Content Generation Service
// Using simple fetch API to avoid SDK issues

/**
 * Generate audio script for a chapter
 */
export async function generateAudioScript(chapterContent, options = {}) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    const prompt = `Convert the following educational content into a natural, engaging audio script suitable for text-to-speech. 
Make it conversational and easy to understand when spoken aloud.

Content: ${chapterContent}

Duration target: ${options.duration || '5-7 minutes'}
Tone: ${options.tone || 'educational and friendly'}

Return only the script text, optimized for audio narration. Do not include any JSON formatting or extra text.`;

    // Use direct API call with v1 endpoint
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Audio script generation error:", error);
    throw new Error("Failed to generate audio script: " + error.message);
  }
}

/**
 * Generate video storyboard for educational content
 */
export async function generateVideoStoryboard(chapterContent, options = {}) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    const prompt = `Create a detailed video storyboard for the following educational content.
Include scene descriptions, visual elements, narration text, and timing.

Content: ${chapterContent}

Video style: ${options.style || 'animated explainer'}
Duration: ${options.duration || '3-5 minutes'}

Return ONLY valid JSON (no markdown, no extra text) with this exact structure:
{
  "scenes": [
    {
      "timestamp": "0:00-0:30",
      "visual": "description of what appears on screen",
      "narration": "what is being said",
      "animations": ["animation1", "animation2"]
    }
  ]
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    let text = data.candidates[0].content.parts[0].text;

    // Clean up the response
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Video storyboard generation error:", error);
    throw new Error("Failed to generate video storyboard: " + error.message);
  }
}

/**
 * Generate image prompts for visual learning aids
 */
export async function generateImagePrompts(topic, count = 5) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    const prompt = `Generate ${count} detailed image prompts for educational illustrations about: ${topic}
    
Each prompt should be suitable for AI image generation and help visualize key concepts.
Return as JSON array: ["prompt1", "prompt2", ...]`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    let text = data.candidates[0].content.parts[0].text;
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Image prompt generation error:", error);
    throw new Error("Failed to generate image prompts: " + error.message);
  }
}
