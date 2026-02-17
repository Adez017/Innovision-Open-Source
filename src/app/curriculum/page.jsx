"use client";
import { useState, useEffect } from 'react';
import CurriculumSelector from '@/components/CurriculumSelector';
import { useAuth } from '@/contexts/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

export default function CurriculumPage() {
  const [selection, setSelection] = useState(null);
  const [premiumStatus, setPremiumStatus] = useState({ isPremium: false });
  const { user } = useAuth();
  const router = useRouter();

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

  const handleSelectionChange = (data) => {
    setSelection(data);
    console.log('Selected Curriculum:', data);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Curriculum Browser</h1>
        <p className="text-muted-foreground">
          Browse curriculum from LKG to Class 12 for CBSE and State boards
        </p>
      </div>

      {!premiumStatus.isPremium && (
        <div className="mb-6 p-4 bg-linear-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
              <Crown className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Preview Mode</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You're viewing curriculum in preview mode. Upgrade to Premium to generate full courses from curriculum!
              </p>
              <Button
                onClick={() => router.push("/premium")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Upgrade to Premium - ₹100/month
              </Button>
            </div>
          </div>
        </div>
      )}

      <CurriculumSelector onSelectionChange={handleSelectionChange} />

      {selection && selection.subjects.length > 0 && (
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Current Selection:</h3>
          <p>Class: {selection.class}</p>
          <p>Board: {selection.board}</p>
          {selection.stream && <p>Stream: {selection.stream}</p>}
          <p>Total Subjects: {selection.subjects.length}</p>
          {!premiumStatus.isPremium && (
            <p className="text-sm text-yellow-600 mt-2 flex items-center gap-1">
              <Crown className="h-4 w-4" /> Upgrade to Premium to generate courses from this curriculum
            </p>
          )}
        </div>
      )}
    </div>
  );
}
