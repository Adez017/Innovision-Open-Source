// In-memory store for courses when Firebase is not available
// Note: This will be cleared on server restart
const courseStore = new Map();

export function storeCourse(courseId, courseData) {
  courseStore.set(courseId, courseData);
  console.log(`Course stored: ${courseId}. Total courses in store: ${courseStore.size}`);
}

export function getCourse(courseId) {
  return courseStore.get(courseId);
}

export function updateCourse(courseId, updates) {
  const existing = courseStore.get(courseId);
  if (existing) {
    courseStore.set(courseId, { ...existing, ...updates });
    return true;
  }
  return false;
}

export function deleteCourse(courseId) {
  return courseStore.delete(courseId);
}

export function getAllCourses() {
  return Array.from(courseStore.entries()).map(([id, data]) => ({ id, ...data }));
}