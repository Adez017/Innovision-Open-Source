// Custom hook for offline functionality
import { useEffect, useState } from "react";
import {
  saveCourseOffline,
  getOfflineCourses,
  saveProgressOffline,
  syncOfflineData
} from "@/lib/offline";

export function useOffline() {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineCourses, setOfflineCourses] = useState([]);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    loadOfflineCourses();

    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineData();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadOfflineCourses = async () => {
    const courses = await getOfflineCourses();
    setOfflineCourses(courses);
  };

  const downloadCourse = async (course) => {
    await saveCourseOffline(course);
    await loadOfflineCourses();
  };

  const saveProgress = async (progress) => {
    if (isOnline) {
      // Save directly to server
      await fetch('/api/progress/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(progress),
      });
    } else {
      // Save offline for later sync
      await saveProgressOffline(progress);
    }
  };

  return {
    isOnline,
    offlineCourses,
    downloadCourse,
    saveProgress,
  };
}
