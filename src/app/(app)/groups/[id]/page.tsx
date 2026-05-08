import { auth } from "@/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Users, Crown, Flame, Award, Trophy, Copy } from "lucide-react";
import { InviteMemberForm } from "./invite-member-form";
import { CopyCodeButton } from "./copy-code-button";

export const dynamic = "force-dynamic";

export default async function GroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  const group = await db.studyGroup.findUnique({
    where: { id },
    include: {
      createdBy: { select: { name: true } },
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profileColor: true,
              jesusPoints: true,
              currentStreak: true,
              longestStreak: true,
            },
          },
        },
        orderBy: { joinedAt: "asc" },
      },
    },
  });

  if (!group) return notFound();

  const isMember = group.members.some((m) => m.userId === userId);
  if (!isMember) return notFound();

  // Collective stats
  const totalPoints = group.members.reduce((sum, m) => sum + m.user.jesusPoints, 0);
  const totalStreak = group.members.reduce((sum, m) => sum + m.user.currentStreak, 0);
  const bestStreak = Math.max(...group.members.map((m) => m.user.longestStreak));
  const isFull = group.members.length >= group.maxMembers;

  return (
    <div className="p-6 md:p-10 w-full max-w-4xl mx-auto">
      {/* Group Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#d4e4cf] to-[#dde8ef] dark:from-[#3a4d36] dark:to-[#263040] rounded-2xl flex items-center justify-center shrink-0">
            <Users className="w-7 h-7 text-[#5e7d54] dark:text-[#8fb585]" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#3d3d3d] dark:text-white">{group.name}</h1>
            {group.description && (
              <p className="text-[#7a7a7a] dark:text-[#9e9b93]">{group.description}</p>
            )}
            <p className="text-sm text-[#9a9a9a] dark:text-[#6b6860] mt-1">
              Created by {group.createdBy.name} • {group.members.length}/{group.maxMembers} members
            </p>
          </div>
        </div>
      </div>

      {/* Join Code Banner */}
      <div className="bg-gradient-to-r from-[#eef3ed] to-[#e8f0f5] dark:from-[#252830] dark:to-[#252830] border border-[#d4e4cf] dark:border-[#363940] rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-medium text-[#7a7a7a] dark:text-[#9e9b93] mb-1">Share this code so friends can join:</p>
            <div className="text-3xl font-mono font-black tracking-[0.3em] text-[#5e7d54] dark:text-[#8fb585]">
              {group.joinCode}
            </div>
          </div>
          <CopyCodeButton code={group.joinCode} />
        </div>
      </div>

      {/* Collective Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] p-4 rounded-2xl text-center">
          <Flame className="w-6 h-6 text-[#c4956a] mx-auto mb-1" />
          <div className="text-2xl font-black text-[#3d3d3d] dark:text-white">{totalStreak}</div>
          <div className="text-xs font-medium text-[#9a9a9a] uppercase tracking-wider">Combined Streak</div>
        </div>
        <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] p-4 rounded-2xl text-center">
          <Award className="w-6 h-6 text-[#6a9ab8] mx-auto mb-1" />
          <div className="text-2xl font-black text-[#3d3d3d] dark:text-white">{totalPoints}</div>
          <div className="text-xs font-medium text-[#9a9a9a] uppercase tracking-wider">Total Points</div>
        </div>
        <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] p-4 rounded-2xl text-center">
          <Trophy className="w-6 h-6 text-[#c4956a] mx-auto mb-1" />
          <div className="text-2xl font-black text-[#3d3d3d] dark:text-white">{bestStreak}</div>
          <div className="text-xs font-medium text-[#9a9a9a] uppercase tracking-wider">Best Streak</div>
        </div>
      </div>

      {/* Invite (only if not full) */}
      {!isFull && (
        <div className="mb-8">
          <InviteMemberForm groupId={group.id} />
        </div>
      )}
      {isFull && (
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl text-center text-amber-600 dark:text-amber-400 text-sm font-medium">
          This group is full ({group.maxMembers}/{group.maxMembers} members)
        </div>
      )}

      {/* Members List — sorted by Jesus Points (leaderboard) */}
      <h2 className="text-xl font-bold text-[#3d3d3d] dark:text-white mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-[#7c9a72]" />
        Members Leaderboard
      </h2>

      <div className="space-y-3">
        {[...group.members]
          .sort((a, b) => b.user.jesusPoints - a.user.jesusPoints)
          .map((member, rank) => (
          <div
            key={member.id}
            className={`bg-white dark:bg-[#252830] border rounded-2xl p-5 flex items-center gap-4 ${
              rank === 0 ? "border-[#c4956a]/40 dark:border-[#c4956a]/30 ring-2 ring-[#f0ece3] dark:ring-[#3a3028]/40" : "border-[#e5dfd5] dark:border-[#363940]"
            }`}
          >
            {/* Rank */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              rank === 0 ? "bg-[#f0ece3] text-[#c4956a]" : rank === 1 ? "bg-[#f0f0f0] text-[#7a7a7a]" : "bg-[#eef3ed] text-[#7c9a72]"
            }`}>
              {rank + 1}
            </div>

            {/* Avatar */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm"
              style={{ backgroundColor: member.user.profileColor || "#a8c5a0" }}
            >
              {member.user.name[0].toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#3d3d3d] dark:text-white">{member.user.name}</span>
                {member.role === "admin" && <Crown className="w-4 h-4 text-[#c4956a]" />}
                {rank === 0 && <span className="text-xs bg-[#f0ece3] text-[#c4956a] px-2 py-0.5 rounded-full font-semibold">Top Reader</span>}
              </div>
              <p className="text-sm text-[#7a7a7a] dark:text-[#9e9b93]">{member.user.email}</p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-[#c4956a]" title="Current Streak">
                <Flame className="w-4 h-4" />
                <span className="font-semibold">{member.user.currentStreak}</span>
              </div>
              <div className="flex items-center gap-1 text-[#6a9ab8]" title="Jesus Points">
                <Award className="w-4 h-4" />
                <span className="font-semibold">{member.user.jesusPoints}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
