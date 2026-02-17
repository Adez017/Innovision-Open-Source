"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bold, Italic, Underline, List, ListOrdered,
  Heading1, Heading2, Code, Quote, Sparkles
} from "lucide-react";
import { toast } from "sonner";

export default function WYSIWYGEditor({ chapter, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAIGenerating, setIsAIGenerating] = useState(false);

  useEffect(() => {
    if (chapter) {
      setTitle(chapter.title || "");
      setContent(chapter.content || "");
    }
  }, [chapter]);

  const handleSave = () => {
    if (!chapter) return;
    onUpdate({ ...chapter, title, content });
    toast.success("Chapter updated");
  };

  const applyFormatting = (format) => {
    const textarea = document.getElementById("content-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let formattedText = selectedText;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'heading1':
        formattedText = `# ${selectedText}`;
        break;
      case 'heading2':
        formattedText = `## ${selectedText}`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        break;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  const enhanceWithAI = async () => {
    if (!content) {
      toast.error("Add some content first");
      return;
    }

    setIsAIGenerating(true);
    try {
      const res = await fetch("/api/studio/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, title })
      });

      const data = await res.json();
      if (data.enhanced) {
        setContent(data.enhanced);
        toast.success("Content enhanced with AI!");
      }
    } catch (error) {
      toast.error("Failed to enhance content");
    }
    setIsAIGenerating(false);
  };

  if (!chapter) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">Select or create a chapter to start editing</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Chapter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Chapter Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter chapter title"
          />
        </div>

        {/* Formatting Toolbar */}
        <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/50">
          <Button size="sm" variant="ghost" onClick={() => applyFormatting('bold')}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => applyFormatting('italic')}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => applyFormatting('heading1')}>
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => applyFormatting('heading2')}>
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => applyFormatting('code')}>
            <Code className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => applyFormatting('quote')}>
            <Quote className="h-4 w-4" />
          </Button>
          <div className="flex-1" />
          <Button
            size="sm"
            variant="default"
            onClick={enhanceWithAI}
            disabled={isAIGenerating}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isAIGenerating ? "Enhancing..." : "Enhance with AI"}
          </Button>
        </div>

        {/* Content Editor */}
        <div>
          <label className="text-sm font-medium">Content</label>
          <textarea
            id="content-editor"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your chapter content here... (Markdown supported)"
            className="w-full min-h-100 p-4 border rounded-md font-mono text-sm"
          />
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Chapter
        </Button>
      </CardContent>
    </Card>
  );
}
