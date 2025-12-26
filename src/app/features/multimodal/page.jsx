"use client";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, Video, Mic, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function MultimodalPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState("audio");
  const [pageLoading, setPageLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const generateContent = async () => {
    if (!content.trim()) {
      toast.error("Please enter some content");
      return;
    }

    setPageLoading(true);
    setResult(null);

    try {
      const endpoint = contentType === "audio" ? "/api/multimodal/audio" : "/api/multimodal/video";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapterContent: content,
          options: {
            duration: contentType === "audio" ? "5-7 minutes" : "3-5 minutes",
            tone: "educational and friendly",
            style: "animated explainer",
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        toast.success(`${contentType === "audio" ? "Audio script" : "Video storyboard"} generated successfully!`);
      } else {
        console.error("Generation error:", data);
        toast.error(data.error || "Failed to generate content");
        setResult({ error: data.error });
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("An error occurred while generating content");
    } finally {
      setPageLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="mb-6">
          <Link href="/features">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Features
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Multimodal Content Generation</h1>
          <p className="text-muted-foreground">
            Transform your course content into audio scripts and video storyboards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Content</CardTitle>
              <CardDescription>Enter your course content and select the output format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Content Type</label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="audio">
                      <div className="flex items-center gap-2">
                        <Mic className="w-4 h-4" />
                        <span>Audio Script</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="video">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        <span>Video Storyboard</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Course Content</label>
                <Textarea
                  placeholder="Enter your chapter content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="resize-none"
                />
              </div>

              <Button onClick={generateContent} disabled={loading || !content.trim()} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Generate {contentType === "audio" ? "Audio Script" : "Video Storyboard"}</>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Output</CardTitle>
              <CardDescription>Your generated content will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
              ) : result?.error ? (
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Error</h3>
                  <p className="text-sm text-red-800 dark:text-red-200">{result.error}</p>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  {contentType === "audio" ? (
                    <div className="space-y-2">
                      <h3 className="font-semibold">Audio Script:</h3>
                      <div className="p-4 bg-muted rounded-lg max-h-96 overflow-y-auto">
                        <p className="whitespace-pre-wrap">{result.script}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{result.message}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h3 className="font-semibold">Video Storyboard:</h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {result.storyboard?.scenes?.map((scene, index) => (
                          <div key={index} className="p-4 bg-muted rounded-lg">
                            <div className="font-semibold text-blue-600 mb-2">
                              Scene {index + 1} ({scene.timestamp})
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium">Visual:</span> {scene.visual}
                              </div>
                              <div>
                                <span className="font-medium">Narration:</span> {scene.narration}
                              </div>
                              {scene.animations && (
                                <div>
                                  <span className="font-medium">Animations:</span>
                                  <ul className="list-disc list-inside ml-2">
                                    {scene.animations.map((anim, i) => (
                                      <li key={i}>{anim}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{result.message}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Video className="w-16 h-16 mb-4 opacity-20" />
                  <p>No content generated yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">Integration Options</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 dark:text-blue-200">
            <p className="mb-2">To generate actual audio/video files, integrate with:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong>Audio:</strong> Google Cloud Text-to-Speech, Amazon Polly, or ElevenLabs
              </li>
              <li>
                <strong>Video:</strong> Synthesia, D-ID, or Runway ML
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
