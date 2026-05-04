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
          <div className="w-14 h-14 bg-gradient-to-br from-pink-200 to-blue-200 dark:from-pink-800 dark:to-blue-800 rounded-2xl flex items-center justify-center shrink-0">
            <Users className="w-7 h-7 text-pink-600 dark:text-pink-300" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">{group.name}</h1>
            {group.description && (
              <p className="text-slate-500 dark:text-slate-400">{group.description}</p>
            )}
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              Created by {group.createdBy.name} • {group.members.length}/{group.maxMembers} members
            </p>
          </div>
        </div>
      </div>

      {/* Join Code Banner */}
      <div className="bg-gradient-to-r from-pink-50 to-blue-50 dark:from-slate-800 dark:to-slate-800 border border-pink-200 dark:border-slate-700 rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Share this code so friends can join:</p>
            <div className="text-3xl font-mono font-black tracking-[0.3em] text-pink-600 dark:text-pink-400">
              {group.joinCode}
            </div>
          </div>
          <CopyCodeButton code={group.joinCode} />
        </div>
      </div>

      {/* Collective Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 border border-rose-100 dark:border-slate-700 p-4 rounded-2xl text-center">
          <Flame className="w-6 h-6 text-rose-400 mx-auto mb-1" />
          <div className="text-2xl font-black text-slate-800 dark:text-white">{totalStreak}</div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Combined Streak</div>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 p-4 rounded-2xl text-center">
          <Award className="w-6 h-6 text-blue-400 mx-auto mb-1" />
          <div className="text-2xl font-black text-slate-800 dark:text-white">{totalPoints}</div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Points</div>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-pink-100 dark:border-slate-700 p-4 rounded-2xl text-center">
          <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-1" />
          <div className="text-2xl font-black text-slate-800 dark:text-white">{bestStreak}</div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Best Streak</div>
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-pink-400" />
        Members Leaderboard
      </h2>

      <div className="space-y-3">
        {[...group.members]
          .sort((a, b) => b.user.jesusPoints - a.user.jesusPoints)
          .map((member, rank) => (
          <div
            key={member.id}
            className={`bg-white dark:bg-slate-800 border rounded-2xl p-5 flex items-center gap-4 ${
              rank === 0 ? "border-amber-200 dark:border-amber-800/50 ring-2 ring-amber-100 dark:ring-amber-900/30" : "border-pink-100 dark:border-slate-700"
            }`}
          >
            {/* Rank */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              rank === 0 ? "bg-amber-100 text-amber-600" : rank === 1 ? "bg-slate-100 text-slate-500" : "bg-pink-50 text-pink-400"
            }`}>
              {rank + 1}
            </div>

            {/* Avatar */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm"
              style={{ backgroundColor: member.user.profileColor || "#f9a8d4" }}
            >
              {member.user.name[0].toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800 dark:text-white">{member.user.name}</span>
                {member.role === "admin" && <Crown className="w-4 h-4 text-amber-400" />}
                {rank === 0 && <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-semibold">Top Reader</span>}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{member.user.email}</p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-rose-400" title="Current Streak">
                <Flame className="w-4 h-4" />
                <span className="font-semibold">{member.user.currentStreak}</span>
              </div>
              <div className="flex items-center gap-1 text-blue-400" title="Jesus Points">
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
