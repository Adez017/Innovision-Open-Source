"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Database, Shield, TrendingUp, FileText } from "lucide-react";
import { toast } from "sonner";

export default function ResearchPlatform() {
  const [exporting, setExporting] = useState(false);

  const exportDataset = async (type) => {
    setExporting(true);
    try {
      const response = await fetch(`/api/research/export?type=${type}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_dataset_${Date.now()}.json`;
      a.click();
      toast.success(`${type} dataset exported successfully`);
    } catch (error) {
      toast.error("Failed to export dataset");
    }
    setExporting(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Research Platform</h1>
          <p className="text-muted-foreground">
            Export anonymized datasets for education research and model improvement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interaction Dataset */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-500" />
                Interaction Dataset
              </CardTitle>
              <CardDescription>
                Anonymized user interaction data including clicks, time spent, and navigation patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Fully anonymized</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>JSON format</span>
                </div>
              </div>
              <Button
                onClick={() => exportDataset('interactions')}
                disabled={exporting}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Interactions
              </Button>
            </CardContent>
          </Card>

          {/* Outcome Dataset */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Outcome Dataset
              </CardTitle>
              <CardDescription>
                Learning outcomes, quiz scores, completion rates, and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Fully anonymized</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>JSON format</span>
                </div>
              </div>
              <Button
                onClick={() => exportDataset('outcomes')}
                disabled={exporting}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Outcomes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Notice */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Data Privacy & Anonymization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                All personal identifiers removed
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                User IDs replaced with random hashes
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                No email addresses or names included
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                Timestamps rounded to nearest hour
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                IP addresses excluded
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                GDPR and COPPA compliant
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
