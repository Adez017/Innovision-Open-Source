"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Play, Download, Sparkles, Globe, Crown } from "lucide-react";
import { toast } from "sonner";
import { PageBackground, GridPattern, PageHeader, ScrollReveal, HoverCard } from "@/components/ui/PageWrapper";

export default function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [websitePrompt, setWebsitePrompt] = useState("");
  const [generatedWebsite, setGeneratedWebsite] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [premiumStatus, setPremiumStatus] = useState({ isPremium: false });
  const router = useRouter();
  const { user } = useAuth();

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

  const runCode = async () => {
    if (!premiumStatus.isPremium) {
      toast.error("Code execution is only available for Premium users. Please upgrade!");
      return;
    }

    toast.info("Running code...");
    try {
      const response = await fetch("/api/code/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });
      const data = await response.json();
      setOutput(data.output || data.error);
    } catch (error) {
      setOutput("Error executing code");
    }
  };

  const generateWebsite = async () => {
    if (!premiumStatus.isPremium) {
      toast.error("AI Website Builder is only available for Premium users. Please upgrade!");
      return;
    }

    if (!websitePrompt) {
      toast.error("Please enter a website description");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/code/generate-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: websitePrompt }),
      });
      const data = await response.json();
      setGeneratedWebsite(data.html);
      toast.success("Website generated!");
    } catch (error) {
      toast.error("Failed to generate website");
    }
    setIsGenerating(false);
  };

  const downloadWebsite = () => {
    const blob = new Blob([generatedWebsite], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website.html";
    a.click();
  };

  return (
    <div className="min-h-screen bg-background p-6 relative">
      <PageBackground />
      <GridPattern opacity={0.02} />

      <div className="max-w-7xl mx-auto relative z-10">
        <PageHeader
          title="Code Editor & AI Website Builder"
          description="Write, run, and test code in multiple languages or generate websites with AI"
          icon={Code}
          iconColor="text-cyan-500"
          badge={<><Sparkles className="h-3.5 w-3.5" /> Developer Tools</>}
        />

        {!premiumStatus.isPremium && (
          <ScrollReveal delay={100}>
            <div className="mb-6 p-4 bg-linear-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/25">
                  <Crown className="h-5 w-5 text-black" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">Preview Only</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Code Editor and AI Website Builder are Premium features. Upgrade to run code and generate websites!
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

        <ScrollReveal delay={150}>
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="editor" className="data-[state=active]:bg-background">
                <Code className="h-4 w-4 mr-2" />
                Code Editor
              </TabsTrigger>
              <TabsTrigger value="website" className="data-[state=active]:bg-background">
                <Globe className="h-4 w-4 mr-2" />
                AI Website Builder
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editor */}
                <HoverCard>
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                            <Code className="h-4 w-4 text-cyan-500" />
                          </div>
                          Code Editor
                        </CardTitle>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="w-45 bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="cpp">C++</SelectItem>
                            <SelectItem value="c">C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder={`Write your ${language} code here...`}
                        className="font-mono min-h-100 bg-background/50"
                      />
                      <Button onClick={runCode} className="w-full bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transition-all duration-300">
                        <Play className="h-4 w-4 mr-2" />
                        Run Code
                      </Button>
                    </CardContent>
                  </Card>
                </HoverCard>

                {/* Output */}
                <HoverCard>
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle>Output</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-muted/50 p-4 rounded-xl min-h-100 overflow-auto font-mono text-sm border border-border/50">
                        {output || "Output will appear here..."}
                      </pre>
                    </CardContent>
                  </Card>
                </HoverCard>
              </div>
            </TabsContent>

            <TabsContent value="website">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Prompt */}
                <HoverCard>
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-purple-500" />
                        </div>
                        Describe Your Website
                      </CardTitle>
                      <CardDescription>Tell AI what kind of website you want to create</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        value={websitePrompt}
                        onChange={(e) => setWebsitePrompt(e.target.value)}
                        placeholder="Example: Create a portfolio website with a hero section, about me, projects gallery, and contact form. Use modern design with blue and white colors."
                        className="min-h-75 bg-background/50"
                      />
                      <Button onClick={generateWebsite} disabled={isGenerating} className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                        <Sparkles className="h-4 w-4 mr-2" />
                        {isGenerating ? "Generating..." : "Generate Website"}
                      </Button>
                    </CardContent>
                  </Card>
                </HoverCard>

                {/* Preview */}
                <HoverCard>
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Generated Code</CardTitle>
                        {generatedWebsite && (
                          <Button size="sm" onClick={downloadWebsite} className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {generatedWebsite ? (
                        <div className="space-y-4">
                          <Textarea value={generatedWebsite} readOnly className="font-mono min-h-75 bg-background/50" />
                          <div className="border border-border/50 rounded-xl p-4 bg-white">
                            <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                            <iframe
                              srcDoc={generatedWebsite}
                              className="w-full h-75 border rounded-lg"
                              title="Website Preview"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-100 text-muted-foreground">
                          <div className="text-center">
                            <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Generated website will appear here...</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </HoverCard>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollReveal>
      </div>
    </div>
  );
}
