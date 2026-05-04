"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

function generateShortCode(): string {
  // Generate a 6-char alphanumeric code like "A3X7K9"
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function createGroup(data: { name: string; description?: string }) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    // Generate a unique short join code
    let joinCode = generateShortCode();
    let exists = await db.studyGroup.findUnique({ where: { joinCode } });
    while (exists) {
      joinCode = generateShortCode();
      exists = await db.studyGroup.findUnique({ where: { joinCode } });
    }

    const group = await db.studyGroup.create({
      data: {
        name: data.name,
        description: data.description || null,
        joinCode,
        maxMembers: 5,
        createdById: session.user.id,
        members: {
          create: {
            userId: session.user.id,
            role: "admin",
          },
        },
      },
    });

    revalidatePath("/groups");
    return { success: true, groupId: group.id, joinCode };
  } catch (err) {
    console.error(err);
    return { error: "Failed to create group" };
  }
}

export async function joinGroupByCode(code: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const group = await db.studyGroup.findUnique({
      where: { joinCode: code.toUpperCase().trim() },
      include: { members: true },
    });

    if (!group) return { error: "Invalid group code. Double-check and try again." };

    // Check if already a member
    const already = group.members.find((m) => m.userId === session.user!.id);
    if (already) return { error: "You are already in this group!" };

    // Check member limit (2-5 members)
    if (group.members.length >= group.maxMembers) {
      return { error: `This group is full (max ${group.maxMembers} members).` };
    }

    await db.groupMember.create({
      data: {
        userId: session.user.id,
        groupId: group.id,
        role: "member",
      },
    });

    // Post activity
    await db.activityFeed.create({
      data: {
        userId: session.user.id,
        type: "GROUP",
        message: `Joined study group "${group.name}"`,
      },
    });

    revalidatePath("/groups");
    return { success: true, groupName: group.name };
  } catch (err) {
    console.error(err);
    return { error: "Failed to join group" };
  }
}

export async function inviteMember(data: { groupId: string; email: string }) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    // Check if the inviter is a member of this group
    const membership = await db.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId: session.user.id,
          groupId: data.groupId,
        },
      },
    });

    if (!membership) return { error: "You are not a member of this group" };

    // Get group to check member count
    const group = await db.studyGroup.findUnique({
      where: { id: data.groupId },
      include: { members: true },
    });

    if (!group) return { error: "Group not found" };

    if (group.members.length >= group.maxMembers) {
      return { error: `Group is full (max ${group.maxMembers} members).` };
    }

    // Find the user to invite
    const invitee = await db.user.findUnique({
      where: { email: data.email },
    });

    if (!invitee) return { error: "No user found with that email. They need to register first." };

    // Check if already a member
    const existing = await db.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId: invitee.id,
          groupId: data.groupId,
        },
      },
    });

    if (existing) return { error: "This person is already in the group" };

    await db.groupMember.create({
      data: {
        userId: invitee.id,
        groupId: data.groupId,
        role: "member",
      },
    });

    // Post activity
    await db.activityFeed.create({
      data: {
        userId: session.user.id,
        type: "GROUP",
        message: `Added ${invitee.name} to "${group.name}"`,
      },
    });

    revalidatePath("/groups");
    revalidatePath(`/groups/${data.groupId}`);
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Failed to add member" };
  }
}

export async function leaveGroup(groupId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    await db.groupMember.delete({
      where: {
        userId_groupId: {
          userId: session.user.id,
          groupId,
        },
      },
    });

    revalidatePath("/groups");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Failed to leave group" };
  }
}
