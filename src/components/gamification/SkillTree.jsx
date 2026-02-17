"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Lightbulb, Rocket, Lock } from "lucide-react";

export default function SkillTree() {
  const skills = [
    {
      id: 1,
      name: "Beginner",
      icon: Lightbulb,
      unlocked: true,
      level: 3,
      maxLevel: 3,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950"
    },
    {
      id: 2,
      name: "Intermediate",
      icon: Brain,
      unlocked: true,
      level: 2,
      maxLevel: 5,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      id: 3,
      name: "Advanced",
      icon: Code,
      unlocked: false,
      level: 0,
      maxLevel: 5,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950"
    },
    {
      id: 4,
      name: "Expert",
      icon: Rocket,
      unlocked: false,
      level: 0,
      maxLevel: 10,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950"
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-4 w-4 text-purple-500" />
          Skill Progression
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="relative">
          {/* Connection lines */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-yellow-500 via-blue-500 to-slate-300 dark:to-slate-700" />

          <div className="space-y-4 relative">
            {skills.map((skill, index) => {
              const Icon = skill.unlocked ? skill.icon : Lock;
              const progress = (skill.level / skill.maxLevel) * 100;

              return (
                <div key={skill.id} className="flex items-center gap-3">
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-3' : 'order-2 pl-3'}`}>
                    <div className={`inline-block p-3 rounded-lg border ${skill.unlocked
                      ? `${skill.bgColor} border-current ${skill.color}`
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 opacity-50'
                      }`}>
                      <div className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${skill.unlocked ? skill.color : 'text-slate-400'}`} />
                        <div>
                          <div className="font-semibold text-sm">{skill.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Level {skill.level}/{skill.maxLevel}
                          </div>
                        </div>
                      </div>
                      {skill.unlocked && (
                        <div className="mt-1.5 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full ${skill.color.replace('text-', 'bg-')} transition-all duration-500`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-current z-10 flex items-center justify-center">
                    {skill.unlocked ? (
                      <div className={`w-2 h-2 rounded-full ${skill.color.replace('text-', 'bg-')}`} />
                    ) : (
                      <Lock className="h-2.5 w-2.5 text-slate-400" />
                    )}
                  </div>

                  <div className={`flex-1 ${index % 2 === 0 ? 'order-2' : ''}`} />
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
