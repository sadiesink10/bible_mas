"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function logReading(data: {
  testament: string;
  book: string;
  chapter: number;
  startVerse?: number;
  endVerse?: number;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }
  
  const userId = session.user.id;

  try {
    // Determine Gamification Points
    // Base 2 points for logging reading
    const pointsEarned = 2;

    // 1. Log the reading entry
    await db.readingEntry.create({
      data: {
        userId,
        testament: data.testament,
        book: data.book,
        chapter: Number(data.chapter),
        startVerse: data.startVerse ? Number(data.startVerse) : null,
        endVerse: data.endVerse ? Number(data.endVerse) : null,
        date: new Date(),
      }
    });

    // 2. Fetch user to update gamification stats
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { 
        currentStreak: true, 
        longestStreak: true, 
        lastActiveDate: true,
        jesusPoints: true 
      }
    });

    if (!user) return { error: "User not found" };

    let newCurrentStreak = user.currentStreak;
    let newLongestStreak = user.longestStreak;
    const now = new Date();
    const lastActive = user.lastActiveDate;

    // Check if the user was active today. If not active today, increment streak.
    // If active yesterday, streak++, if not active yesterday, streak = 1.
    if (lastActive) {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const last = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
      const diffTime = Math.abs(today.getTime() - last.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (diffDays === 1) {
        newCurrentStreak += 1;
      } else if (diffDays > 1) {
        newCurrentStreak = 1;
      }
      // If diffDays === 0, they already read today, streak remains the same.
    } else {
      // First time reading
      newCurrentStreak = 1;
    }

    if (newCurrentStreak > newLongestStreak) {
      newLongestStreak = newCurrentStreak;
    }

    const newJesusPoints = user.jesusPoints + pointsEarned;

    // 3. Update User
    await db.user.update({
      where: { id: userId },
      data: {
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        jesusPoints: newJesusPoints,
        lastActiveDate: now
      }
    });

    // 4. Record Activity Feed
    let message = `Read ${data.book} ${data.chapter}`;
    if (data.startVerse && data.endVerse) {
        message += `:${data.startVerse}-${data.endVerse}`;
    }

    await db.activityFeed.create({
      data: {
        userId,
        type: "READING",
        message
      }
    });

    // Handle streak milestones (e.g. 7 days, 30 days)
    if (newCurrentStreak > 0 && newCurrentStreak % 7 === 0 && newCurrentStreak !== user.currentStreak) {
      await db.activityFeed.create({
        data: {
          userId,
          type: "MILESTONE",
          message: `Reached a ${newCurrentStreak}-day reading streak! 🔥`
        }
      });
      // Streak milestone bonus
      await db.user.update({
        where: {id: userId},
        data: { jesusPoints: newJesusPoints + 10 }
      });
    }

    revalidatePath('/dashboard');
    revalidatePath('/log');
    
    return { success: true, pointsEarned };
  } catch (err) {
    console.error(err);
    return { error: "Failed to log reading" };
  }
}
