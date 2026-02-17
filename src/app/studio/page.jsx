"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  BookOpen, Plus, Save, Eye, Upload, FileText,
  Link as LinkIcon, Trash2, Crown, Sparkles
} from "lucide-react";
import { toast } from "sonner";
import WYSIWYGEditor from "@/components/studio/WYSIWYGEditor";
import TemplateSelector from "@/components/studio/TemplateSelector";
import ResourceManager from "@/components/studio/ResourceManager";
import { PageBackground, GridPattern, PageHeader, ScrollReveal, HoverCard } from "@/components/ui/PageWrapper";

export default function StudioPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [activeTab, setActiveTab] = useState("editor");
  const [publishedCourses, setPublishedCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [editorMode, setEditorMode] = useState("edit"); // "edit" or "preview"
  const [editingCourseId, setEditingCourseId] = useState(null); // Track if editing existing course
  const [previewChapter, setPreviewChapter] = useState(null); // Track which chapter to preview
  const [premiumStatus, setPremiumStatus] = useState({ isPremium: false, count: 0 });

  useEffect(() => {
    const fetchPremiumStatus = async () => {
      if (user) {
        try {
          const res = await fetch("/api/premium/status");
          const data = await res.json();
          setPremiumStatus(data);
        } catch (error) {
          console.error("Error fetching premium status:", error);
        }
      }
    };
    fetchPremiumStatus();
  }, [user]);

  const handleSaveDraft = async () => {
    if (!courseTitle) {
      toast.error("Please enter a course title");
      return;
    }

    const courseData = {
      title: courseTitle,
      description: courseDescription,
      chapters,
      status: "draft",
      createdBy: user?.email,
      createdAt: new Date().toISOString()
    };

    // Save to Firebase
    try {
      const res = await fetch("/api/studio/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData)
      });

      if (res.ok) {
        toast.success("Draft saved successfully!");
      }
    } catch (error) {
      toast.error("Failed to save draft");
    }
  };

  const handlePublish = async () => {
    if (chapters.length === 0) {
      toast.error("Add at least one chapter before publishing");
      return;
    }

    const courseData = {
      title: courseTitle,
      description: courseDescription,
      chapters,
      status: "published",
      createdBy: user?.email,
      publishedAt: editingCourseId ? undefined : new Date().toISOString(), // Keep original publish date if updating
      updatedAt: new Date().toISOString()
    };

    try {
      const url = editingCourseId
        ? `/api/studio/courses/${editingCourseId}`
        : "/api/studio/publish";

      const method = editingCourseId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData)
      });

      if (res.ok) {
        toast.success(editingCourseId ? "Course updated successfully!" : "Course published successfully!");
        // Refresh the courses list
        await fetchPublishedCourses();
        // Switch to courses tab to show the published course
        setActiveTab("courses");
        // Reset editing state
        setEditingCourseId(null);
      } else {
        toast.error(editingCourseId ? "Failed to update course" : "Failed to publish course");
      }
    } catch (error) {
      toast.error(editingCourseId ? "Failed to update course" : "Failed to publish course");
    }
  };

  const addChapter = () => {
    const newChapter = {
      id: Date.now(),
      title: `Chapter ${chapters.length + 1}`,
      content: "",
      resources: []
    };
    setChapters([...chapters, newChapter]);
    setCurrentChapter(newChapter);
  };

  const fetchPublishedCourses = async () => {
    setLoadingCourses(true);
    try {
      const res = await fetch("/api/studio/courses");
      if (res.ok) {
        const data = await res.json();
        setPublishedCourses(data.courses || []);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
    setLoadingCourses(false);
  };

  const loadCourse = (course) => {
    setCourseTitle(course.title);
    setCourseDescription(course.description);
    setChapters(course.chapters || []);
    setEditingCourseId(course.id); // Track that we're editing this course
    setActiveTab("editor");
    toast.success("Course loaded for editing!");
  };

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;

    try {
      const res = await fetch(`/api/studio/courses/${courseToDelete.id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        toast.success("Course deleted successfully!");
        await fetchPublishedCourses();
      } else {
        toast.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete course");
    } finally {
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  useEffect(() => {
    if (user && activeTab === "courses") {
      fetchPublishedCourses();
    }
  }, [user, activeTab]);

  return (
    <div className="min-h-screen bg-background relative">
      <PageBackground />
      <GridPattern opacity={0.02} />

      <div className="pt-20 p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <PageHeader
            title="Instructor Authoring Studio"
            description="Create and edit courses with AI assistance"
            icon={BookOpen}
            iconColor="text-blue-500"
            badge={<><Sparkles className="h-3.5 w-3.5" /> Course Creator</>}
          />

          {!premiumStatus.isPremium && (
            <ScrollReveal delay={100}>
              <div className="mb-6 p-4 bg-linear-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/25">
                    <Crown className="h-5 w-5 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Studio Preview Mode</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Free users can create 1 Studio course for testing. Upgrade to Premium for unlimited course creation and full design capabilities!
                    </p>
                    <Button
                      onClick={() => router.push("/premium")}
                      className="bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black transition-all duration-300 hover:scale-105"
                    >
                      Upgrade to Premium - ₹100/month
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Course Info */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Course Title</label>
                    <Input
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      placeholder="Enter course title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                      placeholder="Course description"
                      className="w-full min-h-25 p-2 border rounded-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <Button onClick={addChapter} className="w-full" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Chapter
                    </Button>
                    {editingCourseId && (
                      <Button
                        onClick={() => {
                          setCourseTitle("");
                          setCourseDescription("");
                          setChapters([]);
                          setCurrentChapter(null);
                          setEditingCourseId(null);
                          toast.success("Ready to create new course!");
                        }}
                        className="w-full"
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        New Course
                      </Button>
                    )}
                    <Button onClick={handleSaveDraft} className="w-full" variant="secondary">
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button onClick={() => setActiveTab("preview")} className="w-full" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Course
                    </Button>
                    <Button onClick={handlePublish} className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      {editingCourseId ? "Update Course" : "Publish Course"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Chapters List */}
              <Card>
                <CardHeader>
                  <CardTitle>Chapters ({chapters.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {chapters.map((chapter, idx) => (
                      <div
                        key={chapter.id}
                        onClick={() => setCurrentChapter(chapter)}
                        className={`p-3 border rounded cursor-pointer transition-all ${currentChapter?.id === chapter.id
                          ? "border-blue-400 bg-blue-50 dark:bg-blue-950/20"
                          : "hover:bg-accent"
                          }`}
                      >
                        <div className="font-medium">{chapter.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {chapter.resources?.length || 0} resources
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Editor Area */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="editor">
                    <FileText className="h-4 w-4 mr-2" />
                    Editor
                  </TabsTrigger>
                  <TabsTrigger value="templates">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Templates
                  </TabsTrigger>
                  <TabsTrigger value="resources">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Resources
                  </TabsTrigger>
                  <TabsTrigger value="preview">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="courses">
                    <BookOpen className="h-4 w-4 mr-2" />
                    My Courses
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="editor">
                  {currentChapter ? (
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle>Chapter Editor</CardTitle>
                          {/* Edit/Preview Toggle */}
                          <div className="flex gap-1 border rounded-lg p-1">
                            <Button
                              size="sm"
                              variant={editorMode === "edit" ? "default" : "ghost"}
                              onClick={() => setEditorMode("edit")}
                              className="h-8"
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant={editorMode === "preview" ? "default" : "ghost"}
                              onClick={() => setEditorMode("preview")}
                              className="h-8"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {editorMode === "edit" ? (
                          <WYSIWYGEditor
                            chapter={currentChapter}
                            onUpdate={(updatedChapter) => {
                              setChapters(chapters.map(ch =>
                                ch.id === updatedChapter.id ? updatedChapter : ch
                              ));
                              setCurrentChapter(updatedChapter);
                            }}
                          />
                        ) : (
                          <div className="prose prose-slate dark:prose-invert max-w-none min-h-125 p-6 border rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">{currentChapter.title}</h2>
                            {currentChapter.content ? (
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
                                  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
                                  h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                                  p: ({ node, ...props }) => <p className="mb-4 leading-7" {...props} />,
                                  ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                                  li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                                  code: ({ node, inline, ...props }) =>
                                    inline
                                      ? <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                                      : <code className="block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4" {...props} />,
                                  blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-muted-foreground" {...props} />,
                                  strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                  em: ({ node, ...props }) => <em className="italic" {...props} />,
                                }}
                              >
                                {currentChapter.content}
                              </ReactMarkdown>
                            ) : (
                              <p className="text-muted-foreground italic">No content yet. Switch to Edit mode to add content.</p>
                            )}
                            {currentChapter.resources && currentChapter.resources.length > 0 && (
                              <div className="mt-8 pt-6 border-t">
                                <h3 className="text-lg font-semibold mb-3">Resources</h3>
                                <ul className="space-y-2">
                                  {currentChapter.resources.map((resource, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <LinkIcon className="h-4 w-4 text-blue-500" />
                                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        {resource.title}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="flex items-center justify-center h-64">
                        <div className="text-center text-muted-foreground">
                          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Select a chapter or add a new one to start editing</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="templates">
                  <TemplateSelector
                    onSelect={(template) => {
                      if (!currentChapter) {
                        toast.error("Please select or create a chapter first");
                        return;
                      }
                      setSelectedTemplate(template);
                      const updated = { ...currentChapter, content: template.content };
                      setChapters(chapters.map(ch =>
                        ch.id === updated.id ? updated : ch
                      ));
                      setCurrentChapter(updated);
                      toast.success(`Template "${template.name}" applied successfully!`);
                      // Switch to editor tab to see the changes
                      setActiveTab("editor");
                    }}
                  />
                </TabsContent>

                <TabsContent value="resources">
                  <ResourceManager
                    chapter={currentChapter}
                    onUpdate={(resources) => {
                      if (currentChapter) {
                        const updated = { ...currentChapter, resources };
                        setChapters(chapters.map(ch =>
                          ch.id === updated.id ? updated : ch
                        ));
                      }
                    }}
                  />
                </TabsContent>

                <TabsContent value="preview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Preview</CardTitle>
                      <CardDescription>See how your course will appear to students</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!courseTitle ? (
                        <div className="text-center text-muted-foreground py-8">
                          <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Add a course title to preview</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {/* Course Header Preview */}
                          <div className="border-b pb-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h1 className="text-3xl font-bold mb-2">{courseTitle}</h1>
                                <p className="text-lg text-muted-foreground">{courseDescription || "No description provided"}</p>
                              </div>
                              <div className="ml-4 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                                Preview
                              </div>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                <span>{chapters.length} chapters</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span>By {user?.name || user?.email || "Instructor"}</span>
                              </div>
                            </div>
                          </div>

                          {/* Chapters Preview */}
                          <div>
                            <h2 className="text-xl font-bold mb-4">Course Content</h2>
                            {chapters.length > 0 ? (
                              <div className="space-y-3">
                                {chapters.map((chapter, index) => (
                                  <Card
                                    key={chapter.id}
                                    className="cursor-pointer hover:border-blue-400 transition-all"
                                    onClick={() => setPreviewChapter(previewChapter?.id === chapter.id ? null : chapter)}
                                  >
                                    <CardHeader>
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-bold">
                                          {index + 1}
                                        </span>
                                        {chapter.title}
                                        {chapter.resources && chapter.resources.length > 0 && (
                                          <span className="ml-auto text-xs text-muted-foreground">
                                            {chapter.resources.length} resource{chapter.resources.length !== 1 ? 's' : ''}
                                          </span>
                                        )}
                                      </CardTitle>
                                    </CardHeader>
                                    {previewChapter?.id === chapter.id && chapter.content && (
                                      <CardContent>
                                        <div className="prose prose-slate dark:prose-invert max-w-none border-t pt-4">
                                          <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                              h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4 mb-3" {...props} />,
                                              h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-3 mb-2" {...props} />,
                                              h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-2 mb-2" {...props} />,
                                              p: ({ node, ...props }) => <p className="mb-3 leading-7" {...props} />,
                                              ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                                              ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                                              li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                                              code: ({ node, inline, ...props }) =>
                                                inline
                                                  ? <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                                                  : <code className="block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto mb-3" {...props} />,
                                              blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-3 text-muted-foreground" {...props} />,
                                              strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                              em: ({ node, ...props }) => <em className="italic" {...props} />,
                                            }}
                                          >
                                            {chapter.content}
                                          </ReactMarkdown>
                                          {chapter.resources && chapter.resources.length > 0 && (
                                            <div className="mt-6 pt-4 border-t">
                                              <h3 className="text-lg font-semibold mb-3">Resources</h3>
                                              <ul className="space-y-2">
                                                {chapter.resources.map((resource, idx) => (
                                                  <li key={idx} className="flex items-center gap-2">
                                                    <LinkIcon className="h-4 w-4 text-blue-500" />
                                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                      {resource.title}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      </CardContent>
                                    )}
                                  </Card>
                                ))}
                              </div>
                            ) : (
                              <Card>
                                <CardContent className="py-8 text-center text-muted-foreground">
                                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                  <p>No chapters added yet</p>
                                  <p className="text-sm mt-2">Add chapters to see them in the preview</p>
                                </CardContent>
                              </Card>
                            )}
                          </div>

                          {/* Preview Note */}
                          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                              <div>
                                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Preview Mode</h3>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                  This is how your course will appear to students after publishing. Make sure all content looks correct before publishing.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="courses">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Published Courses</CardTitle>
                      <CardDescription>View and manage your published courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loadingCourses ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                          <p className="text-sm text-muted-foreground mt-4">Loading courses...</p>
                        </div>
                      ) : publishedCourses.length > 0 ? (
                        <div className="space-y-4">
                          {publishedCourses.map((course) => (
                            <Card key={course.id} className="hover:border-blue-400 transition-all">
                              <CardHeader>
                                <CardTitle className="text-lg">{course.title}</CardTitle>
                                <CardDescription>{course.description}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-muted-foreground">
                                    {course.chapters?.length || 0} chapters • Published {new Date(course.publishedAt).toLocaleDateString()}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => loadCourse(course)}
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      View/Edit
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleDeleteClick(course)}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground py-8">
                          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No published courses yet</p>
                          <p className="text-sm mt-2">Publish your first course to see it listed here</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete "{courseToDelete?.title}"? All course content and chapters will be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
