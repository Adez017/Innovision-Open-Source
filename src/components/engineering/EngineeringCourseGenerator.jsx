"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Upload, FileText, Sparkles, Search } from "lucide-react";
import { KARNATAKA_COLLEGES, ENGINEERING_BRANCHES, SEMESTERS } from "@/lib/engineering-data";

export default function EngineeringCourseGenerator() {
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Search states
  const [collegeSearch, setCollegeSearch] = useState("");
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);

  // Filter colleges based on search
  const filteredColleges = useMemo(() => {
    if (!collegeSearch) return KARNATAKA_COLLEGES;
    return KARNATAKA_COLLEGES.filter(college =>
      college.toLowerCase().includes(collegeSearch.toLowerCase())
    );
  }, [collegeSearch]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSyllabusFile(file);
    } else {
      alert("Please upload a PDF file only");
      e.target.value = null;
    }
  };

  const handleGenerateCourse = async () => {
    if (!selectedCollege || !selectedBranch || !selectedSemester || !syllabusFile) {
      alert("Please fill all fields and upload syllabus PDF");
      return;
    }

    setIsGenerating(true);

    // Simulate course generation
    setTimeout(() => {
      alert(`Course generated successfully!\n\nCollege: ${selectedCollege}\nBranch: ${selectedBranch}\nSemester: ${selectedSemester}\nSyllabus: ${syllabusFile.name}`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCollegeSelect = (college) => {
    setSelectedCollege(college);
    setCollegeSearch(college);
    setShowCollegeDropdown(false);
  };

  const isFormValid = selectedCollege && selectedBranch && selectedSemester && syllabusFile;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          Engineering Course Generator
        </CardTitle>
        <p className="text-sm text-gray-600">
          Generate customized courses based on your college syllabus
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* College Selection with Search */}
        <div className="space-y-2">
          <Label htmlFor="college">Select College</Label>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="college"
                placeholder="Search or select your college..."
                value={collegeSearch}
                onChange={(e) => {
                  setCollegeSearch(e.target.value);
                  setShowCollegeDropdown(true);
                }}
                onFocus={() => setShowCollegeDropdown(true)}
                className="pl-10"
              />
            </div>

            {showCollegeDropdown && filteredColleges.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredColleges.slice(0, 50).map((college, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleCollegeSelect(college)}
                  >
                    {college}
                  </div>
                ))}
                {filteredColleges.length > 50 && (
                  <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50">
                    Showing first 50 results. Type to refine search...
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Alternative: Dropdown Select */}
          <div className="mt-2">
            <Select value={selectedCollege} onValueChange={setSelectedCollege}>
              <SelectTrigger>
                <SelectValue placeholder="Or select from dropdown" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {KARNATAKA_COLLEGES.map((college, index) => (
                  <SelectItem key={index} value={college}>
                    {college}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Branch Selection */}
        <div className="space-y-2">
          <Label htmlFor="branch">Select Branch</Label>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger id="branch">
              <SelectValue placeholder="Choose your branch" />
            </SelectTrigger>
            <SelectContent>
              {ENGINEERING_BRANCHES.map((branch, index) => (
                <SelectItem key={index} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Semester Selection */}
        <div className="space-y-2">
          <Label htmlFor="semester">Select Semester</Label>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger id="semester">
              <SelectValue placeholder="Choose semester" />
            </SelectTrigger>
            <SelectContent>
              {SEMESTERS.map((semester, index) => (
                <SelectItem key={index} value={semester}>
                  {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Syllabus Upload */}
        <div className="space-y-2">
          <Label htmlFor="syllabus">Upload Syllabus (PDF only)</Label>
          <div className="flex items-center gap-4">
            <Input
              id="syllabus"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
            {syllabusFile && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <FileText className="w-4 h-4" />
                <span>{syllabusFile.name}</span>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Upload your official syllabus PDF to generate accurate course content
          </p>
        </div>

        {/* Selected Information Display */}
        {(selectedCollege || selectedBranch || selectedSemester) && (
          <div className="p-4 bg-blue-50 rounded-lg space-y-2">
            <h4 className="font-semibold text-sm text-blue-900">Selected Information:</h4>
            {selectedCollege && (
              <p className="text-sm text-blue-700">
                <span className="font-medium">College:</span> {selectedCollege}
              </p>
            )}
            {selectedBranch && (
              <p className="text-sm text-blue-700">
                <span className="font-medium">Branch:</span> {selectedBranch}
              </p>
            )}
            {selectedSemester && (
              <p className="text-sm text-blue-700">
                <span className="font-medium">Semester:</span> {selectedSemester}
              </p>
            )}
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={handleGenerateCourse}
          disabled={!isFormValid || isGenerating}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Generating Course...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Generate Course
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
