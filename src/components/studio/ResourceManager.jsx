"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus, Trash2, Link as LinkIcon, FileText,
  Video, Image as ImageIcon, Download
} from "lucide-react";
import { toast } from "sonner";

export default function ResourceManager({ chapter, onUpdate }) {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    type: "link",
    title: "",
    url: ""
  });

  useEffect(() => {
    if (chapter?.resources) {
      setResources(chapter.resources);
    }
  }, [chapter]);

  const addResource = () => {
    if (!newResource.title || !newResource.url) {
      toast.error("Please fill in all fields");
      return;
    }

    const resource = {
      id: Date.now(),
      ...newResource
    };

    const updated = [...resources, resource];
    setResources(updated);
    onUpdate(updated);

    setNewResource({ type: "link", title: "", url: "" });
    toast.success("Resource added");
  };

  const removeResource = (id) => {
    const updated = resources.filter(r => r.id !== id);
    setResources(updated);
    onUpdate(updated);
    toast.success("Resource removed");
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'document': return FileText;
      case 'image': return ImageIcon;
      case 'download': return Download;
      default: return LinkIcon;
    }
  };

  if (!chapter) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">Select a chapter to manage resources</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chapter Resources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Resource */}
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
          <h3 className="font-semibold">Add New Resource</h3>

          <div>
            <label className="text-sm font-medium">Resource Type</label>
            <Select
              value={newResource.type}
              onValueChange={(value) => setNewResource({ ...newResource, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="link">Web Link</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="download">Downloadable File</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={newResource.title}
              onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
              placeholder="Resource title"
            />
          </div>

          <div>
            <label className="text-sm font-medium">URL</label>
            <Input
              value={newResource.url}
              onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <Button onClick={addResource} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        </div>

        {/* Resources List */}
        <div className="space-y-2">
          <h3 className="font-semibold">Current Resources ({resources.length})</h3>

          {resources.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No resources added yet
            </p>
          ) : (
            <div className="space-y-2">
              {resources.map((resource) => {
                const Icon = getResourceIcon(resource.type);
                return (
                  <div
                    key={resource.id}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent"
                  >
                    <Icon className="h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <div className="font-medium">{resource.title}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {resource.url}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeResource(resource.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
