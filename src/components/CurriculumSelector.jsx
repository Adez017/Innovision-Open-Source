"use client";
import { useState, useEffect } from 'react';
import {
  CURRICULUM_STRUCTURE,
  getAllClasses,
  getAvailableStreams,
  getSubjectsByClassAndBoard
} from '@/lib/curriculum-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CurriculumSelector({ onSelectionChange }) {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [availableStreams, setAvailableStreams] = useState(null);
  const [subjects, setSubjects] = useState([]);

  const classes = getAllClasses();
  const boards = ['CBSE', 'STATE'];

  useEffect(() => {
    if (selectedClass && selectedBoard) {
      const streams = getAvailableStreams(selectedClass, selectedBoard);
      setAvailableStreams(streams);

      if (!streams) {
        // No streams, load subjects directly
        const subs = getSubjectsByClassAndBoard(selectedClass, selectedBoard);
        setSubjects(subs);
        setSelectedStream('');
      } else {
        setSubjects([]);
        setSelectedStream('');
      }
    }
  }, [selectedClass, selectedBoard]);

  useEffect(() => {
    if (selectedClass && selectedBoard && selectedStream) {
      const subs = getSubjectsByClassAndBoard(selectedClass, selectedBoard, selectedStream);
      setSubjects(subs);
    }
  }, [selectedStream]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange({
        class: selectedClass,
        board: selectedBoard,
        stream: selectedStream,
        subjects: subjects
      });
    }
  }, [selectedClass, selectedBoard, selectedStream, subjects]);

  const getClassDisplayName = (className) => {
    return CURRICULUM_STRUCTURE[className]?.name || className;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Curriculum</CardTitle>
          <CardDescription>Choose class, board, and stream to view subjects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Class Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {getClassDisplayName(cls)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Board Selection */}
          {selectedClass && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Board</label>
              <Select value={selectedBoard} onValueChange={setSelectedBoard}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Board" />
                </SelectTrigger>
                <SelectContent>
                  {boards.map((board) => (
                    <SelectItem key={board} value={board}>
                      {board}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Stream Selection (for Class 11 & 12) */}
          {availableStreams && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Stream</label>
              <Select value={selectedStream} onValueChange={setSelectedStream}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Stream" />
                </SelectTrigger>
                <SelectContent>
                  {availableStreams.map((stream) => (
                    <SelectItem key={stream} value={stream}>
                      {stream}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Display Subjects */}
      {subjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Available Subjects</CardTitle>
            <CardDescription>
              {getClassDisplayName(selectedClass)} - {selectedBoard} {selectedStream && `- ${selectedStream}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <Card key={subject.id} className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic, idx) => (
                        <Badge key={idx} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
