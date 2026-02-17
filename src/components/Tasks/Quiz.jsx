"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, XCircle, Loader, Zap } from "lucide-react";
import { toast } from "sonner";
import { useContext } from "react";
import xpContext from "@/contexts/xp";
import { ComboIndicator } from "@/components/gamification/ComboMultiplier";

export default function Quiz({ task, roadmapId, chapterNumber }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { getXp, awardXP, combo, incrementCombo, resetCombo, getCurrentMultiplier } = useContext(xpContext);

  const handleOptionSelect = (value) => {
    if (isAnswered) return;
    setSelectedOption(value);
  };

  const checkAnswer = async () => {
    setSubmitting(true);
    const correct = selectedOption === task.answer;
    
    try {
      const res = await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
          isCorrect: correct,
          roadmap: roadmapId,
          chapter: chapterNumber,
          userAnswer: selectedOption,
        }),
      });
      
      if (res.ok) {
        setIsCorrect(correct);
        setIsAnswered(true);

        // Handle combo system
        if (correct) {
          incrementCombo();
          // Show toast for combo XP after a small delay so combo updates first
          setTimeout(() => {
            const multiplier = getCurrentMultiplier();
            if (multiplier > 1) {
              toast.success(`+${2 * multiplier} XP (${multiplier}x combo!)`, {
                icon: <Zap className="h-4 w-4 text-yellow-500" />,
              });
            }
          }, 100);
        } else {
          resetCombo();
        }

        // XP is now awarded server-side in /api/tasks
        getXp();
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.error || "Failed to submit task. Try again.");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Network error. Please check your connection and try again.");
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (task.isAnswered) {
      setSelectedOption(task.userAnswer);
      setIsAnswered(task.isAnswered);
      setIsCorrect(task.isCorrect);
    }
  }, []);

  return (
    <div>
      <Card className="p-0 border-0 mx-auto shadow-none lg:w-[40vw]">
        <CardHeader className="rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">Multiple choice question</CardTitle>
            {/* Show combo indicator if active */}
            {combo >= 2 && <ComboIndicator combo={combo} />}
          </div>
        </CardHeader>

        <CardContent className="pb-2">
          <div className="space-y-6">
            <h2 className="mb-0 text-lg ">Question</h2>
            <h3 className="text-lg select-none">{task.question || task.content}</h3>
            <RadioGroup value={selectedOption} className="space-y-3 text-sm">
              {task.options.map((option) => (
                <div
                  key={option}
                  className={`flex items-center space-x-2 rounded-lg border-2 p-4 transition-all duration-200 ${isAnswered
                    ? option === task.answer
                      ? "border-green-500 dark:bg-green-950/30 bg-green-50"
                      : option === selectedOption && option !== task.answer
                        ? "border-red-500 dark:bg-red-950/30 bg-red-50"
                        : "border-gray-200 opacity-70"
                    : option === selectedOption
                      ? "border-blue-300 bg-blue-50 dark:bg-blue-950"
                      : "hover:border-blue-300 hover:bg-blue-50/10 dark:hover:bg-blue-950/20 cursor-pointer"
                    }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-white dark:bg-zinc-900 shrink-0">
                    <RadioGroupItem
                      value={option}
                      id={option}
                      disabled={isAnswered}
                      checked={selectedOption === option}
                      className="sr-only  text-sm"
                    />
                    {isAnswered && option === task.answer ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : isAnswered && option === selectedOption && option !== task.answer ? (
                      <XCircle className="h-6 w-6 text-red-500" />
                    ) : (
                      <span className="text-base font-medium">
                        {String.fromCharCode(65 + task.options.indexOf(option))}
                      </span>
                    )}
                  </div>
                  <Label htmlFor={option} className="grow cursor-pointer ml-2 text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {isAnswered && (
            <div>
              <div className="flex items-center mt-4">
                <div className="shrink-0 mr-3">
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
                <div>
                  <div className="font-semibold">{isCorrect ? "Correct!" : "Incorrect!"}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {isCorrect ? "Great job!" : `The correct answer is: ${task.answer}`}
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4 animate-fadeIn">
                <div
                  className={`p-4 rounded-lg border-l-4 ${isCorrect
                    ? "bg-green-50 dark:bg-green-950/30 border-green-500 text-green-700 dark:text-green-400"
                    : "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-700 dark:text-red-400"
                    }`}
                >
                  <div className="font-bold text-lg mb-1">Explanation</div>
                  <p>{task.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!isAnswered && (
            <Button
              disabled={!selectedOption || submitting}
              variant={"secondary"}
              className={"bg-blue-500 text-zinc-50 mx-auto dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-600"}
              onClick={checkAnswer}
            >
              {submitting ? (
                <>
                  Submit
                  <Loader className="animate-spin"></Loader>{" "}
                </>
              ) : (
                "Submit"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
