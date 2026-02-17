"use client";
import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { setupOfflineListeners, syncOfflineData } from "@/lib/offline";

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    setupOfflineListeners(
      async () => {
        setIsOnline(true);
        setSyncing(true);
        await syncOfflineData();
        setSyncing(false);
      },
      () => {
        setIsOnline(false);
      }
    );
  }, []);

  if (isOnline && !syncing) return null;

  return (
    <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 ${isOnline ? 'bg-blue-500' : 'bg-red-500'
      } text-white`}>
      {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
      <span>{syncing ? 'Syncing...' : isOnline ? 'Back online' : 'Offline mode'}</span>
    </div>
  );
}
