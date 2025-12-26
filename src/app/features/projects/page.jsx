"use client";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Briefcase, Users, Award, Clock } from "lucide-react";
import Link from "next/link";
import { projectTemplates, getUserProjects } from "@/lib/projects";
import { Progress } from "@/components/ui/progress";

export default function ProjectsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [projectLoading, setProjectLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (user?.email) {
      loadProjects();
    }
  }, [session]);

  const loadProjects = async () => {
    try {
      const userProjects = await getUserProjects(session.user.email);
      setProjects(userProjects);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setProjectLoading(false);
    }
  };

  if (projectLoading) {
    return <div className="p-8">Loading...</div>;
  }

  const getStatusColor = (status) => {
    const colors = {
      planning: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      in_progress: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      under_review: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return colors[status] || colors.planning;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="mb-6">
          <Link href="/features">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Features
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Project-Based Learning</h1>
          <p className="text-muted-foreground">
            Build real-world projects with mentor guidance and professional reviews
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{projects.length}</p>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{projects.filter((p) => p.status === "completed").length}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Mentors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{projects.filter((p) => p.status === "under_review").length}</p>
                  <p className="text-sm text-muted-foreground">Under Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Projects */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>My Projects</CardTitle>
                <CardDescription>Track your ongoing and completed projects</CardDescription>
              </div>
              <Link href="/features/projects/create">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {projectLoading ? (
              <div className="text-center p-8">Loading projects...</div>
            ) : projects.length > 0 ? (
              <div className="space-y-4">
                {projects.map((project) => (
                  <Link key={project.id} href={`/features/projects/${project.id}`}>
                    <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                        >
                          {project.status.replace("_", " ").toUpperCase()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} />
                      </div>
                      <div className="flex gap-2 mt-3">
                        {project.skills?.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center p-12">
                <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                <p className="text-muted-foreground mb-4">No projects yet</p>
                <Link href="/features/projects/create">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Start Your First Project
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Project Templates</CardTitle>
            <CardDescription>Choose a template to get started quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectTemplates.map((template) => (
                <div key={template.id} className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">{template.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-1 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded text-xs">
                      {template.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 rounded text-xs">
                      {template.duration}
                    </span>
                  </div>
                  <Link href={`/features/projects/create?template=${template.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Use Template
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
