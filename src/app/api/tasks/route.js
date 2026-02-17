import { NextResponse } from "next/server";
import { adminDb, FieldValue } from "@/lib/firebase-admin";
import { getServerSession } from "@/lib/auth-server";

async function completeChapter(chapter, roadmapId, user) {
  const docRef = adminDb.collection("users").doc(user.email).collection("roadmaps").doc(roadmapId);
  const docSnap = await docRef.get();
  if (docSnap.exists) {
    const roadmap = docSnap.data();
    const updatedChapters = roadmap.chapters.map((ch) =>
      ch.chapterNumber == chapter ? { ...ch, completed: true } : ch
    );
    const completedChapters = updatedChapters.filter((ch) => ch.completed);

    // Award 50 XP for chapter completion in gamification stats
    try {
      const statsRef = adminDb.collection("gamification").doc(user.email);
      await adminDb.runTransaction(async (transaction) => {
        const statsDoc = await transaction.get(statsRef);
        const xpGained = 50;
        let stats = statsDoc.exists
          ? statsDoc.data()
          : {
            xp: 0,
            level: 1,
            streak: 1,
            badges: [],
            rank: 0,
            achievements: [],
            lastActive: new Date().toISOString(),
          };

        const newXP = (stats.xp || 0) + xpGained;
        const newLevel = Math.floor(newXP / 500) + 1;

        // Check for badges
        const currentBadges = stats.badges || [];
        const newBadges = [...currentBadges];

        // First course badge - awarded on first chapter completion
        if (!currentBadges.includes("first_course")) {
          newBadges.push("first_course");
        }

        // Check streak badges
        const streak = stats.streak || 1;
        if (streak >= 7 && !currentBadges.includes("week_streak")) {
          newBadges.push("week_streak");
        }
        if (streak >= 30 && !currentBadges.includes("month_streak")) {
          newBadges.push("month_streak");
        }

        transaction.set(
          statsRef,
          {
            ...stats,
            xp: newXP,
            level: newLevel,
            badges: newBadges,
            lastActive: new Date().toISOString(),
            achievements: [
              ...(stats.achievements || []),
              {
                title: "Chapter Complete!",
                description: "You completed a chapter",
                xp: xpGained,
                timestamp: new Date().toISOString(),
              },
            ],
          },
          { merge: true }
        );
      });
    } catch (xpError) {
      console.error("Failed to award chapter completion XP:", xpError);
    }

    if (completedChapters.length === updatedChapters.length) {
      await docRef.update({
        completed: true,
      });
    }
    await docRef.update({
      chapters: updatedChapters,
    });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { task, roadmap, chapter, isCorrect, userAnswer } = await req.json();

    if (!task || !roadmap || !chapter || typeof isCorrect === "undefined" || !userAnswer) {
      return NextResponse.json(
        {
          message: "Missing or invalid required fields: task, roadmap, chapter, or isCorrect",
        },
        { status: 400 }
      );
    }

    const taskRef = adminDb
      .collection("users")
      .doc(session.user.email)
      .collection("roadmaps")
      .doc(roadmap)
      .collection("chapters")
      .doc(chapter)
      .collection("tasks")
      .doc("task");

    const allTasksSnap = await taskRef.get();
    let allTasks = allTasksSnap.exists ? Object.values(allTasksSnap.data()) : [];

    const taskIndex = allTasks.findIndex((e) => e.question === task.question);

    if (taskIndex !== -1) {
      if (allTasks[taskIndex].isAnswered) {
        return NextResponse.json({
          message: "Task is already answered",
        });
      }
      allTasks[taskIndex] = {
        ...task,
        isAnswered: true,
        isCorrect: isCorrect,
        userAnswer,
      };

      const date = new Date();
      const month = date.getMonth();

      if (isCorrect) {
        let points = 2; // Updated: 2 XP per correct answer
        if (task.type === "match-the-following") {
          points = isCorrect.filter((e) => e).length * 2; // 2 XP per correct item
        }

        // Update legacy user XP
        await adminDb
          .collection("users")
          .doc(session.user.email)
          .update({
            xp: FieldValue.increment(points),
            [`xptrack.${month}`]: FieldValue.increment(points),
          });

        // Award XP in gamification stats
        try {
          const statsRef = adminDb.collection("gamification").doc(session.user.email);
          await adminDb.runTransaction(async (transaction) => {
            const statsDoc = await transaction.get(statsRef);
            const xpGained = points;
            let stats = statsDoc.exists
              ? statsDoc.data()
              : {
                xp: 0,
                level: 1,
                streak: 1,
                badges: [],
                rank: 0,
                achievements: [],
                lastActive: new Date().toISOString(),
              };

            const newXP = (stats.xp || 0) + xpGained;
            const newLevel = Math.floor(newXP / 500) + 1;

            // Check for new badges
            const currentBadges = stats.badges || [];
            const newBadges = [...currentBadges];

            // Perfect score badge - awarded on first correct quiz answer
            if (!currentBadges.includes("perfect_score")) {
              newBadges.push("perfect_score");
            }

            // Night Owl badge - studying between 12 AM - 4 AM
            const hour = new Date().getHours();
            if (hour >= 0 && hour < 4 && !currentBadges.includes("night_owl")) {
              newBadges.push("night_owl");
            }

            // Early Bird badge - studying between 4 AM - 6 AM
            if (hour >= 4 && hour < 6 && !currentBadges.includes("early_bird")) {
              newBadges.push("early_bird");
            }

            transaction.set(
              statsRef,
              {
                ...stats,
                xp: newXP,
                level: newLevel,
                badges: newBadges,
                lastActive: new Date().toISOString(),
                achievements: [
                  ...(stats.achievements || []),
                  {
                    title: "Correct Answer!",
                    description: "You answered correctly",
                    xp: xpGained,
                    timestamp: new Date().toISOString(),
                  },
                ],
              },
              { merge: true }
            );
          });
        } catch (xpError) {
          console.error("Failed to award task XP:", xpError);
        }
      }

      const completedTasks = allTasks.filter((task) => task.isAnswered);

      if (completedTasks.length === allTasks.length) {
        completeChapter(chapter, roadmap, session.user);
      }
    } else {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await taskRef.set({ ...allTasks });

    return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
