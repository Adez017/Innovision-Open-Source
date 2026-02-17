"use client";
import { getAllClasses, getCurriculumByClass } from '@/lib/curriculum-data';

export default function TestCurriculum() {
  const classes = getAllClasses();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Curriculum Data Test</h1>
      <div className="space-y-2">
        <p>Total Classes: {classes.length}</p>
        <div className="grid grid-cols-4 gap-2">
          {classes.map(cls => (
            <div key={cls} className="p-2 border rounded">
              {getCurriculumByClass(cls)?.name || cls}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
