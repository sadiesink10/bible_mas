"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function sendGroupMessage(data: { groupId: string; content: string }) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const content = data.content.trim();
  if (!content || content.length > 500) return { error: "Message too long or empty" };

  try {
    // Verify membership
    const membership = await db.groupMember.findUnique({
      where: { userId_groupId: { userId: session.user.id, groupId: data.groupId } },
    });
    if (!membership) return { error: "Not a member of this group" };

    await db.groupMessage.create({
      data: {
        content,
        userId: session.user.id,
        groupId: data.groupId,
      },
    });

    revalidatePath(`/groups/${data.groupId}`);
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Failed to send message" };
  }
}

export async function getGroupMessages(groupId: string) {
  const session = await auth();
  if (!session?.user?.id) return [];

  // Verify membership
  const membership = await db.groupMember.findUnique({
    where: { userId_groupId: { userId: session.user.id, groupId } },
  });
  if (!membership) return [];

  return db.groupMessage.findMany({
    where: { groupId },
    orderBy: { createdAt: "asc" },
    take: 100,
    include: {
      user: { select: { id: true, name: true, profileColor: true } },
    },
  });
}
