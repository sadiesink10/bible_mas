"use server";

import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";

export async function deleteAccount() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    // Delete user - cascades all related data (readings, activities, streaks, messages, group memberships)
    await db.user.delete({
      where: { id: session.user.id },
    });

    // Sign out after deletion
    await signOut({ redirect: false });
    return { success: true };
  } catch (err) {
    console.error("Delete account error:", err);
    return { error: "Failed to delete account. Please try again." };
  }
}
