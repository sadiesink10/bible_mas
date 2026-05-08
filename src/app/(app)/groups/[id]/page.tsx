import { auth } from "@/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Users, Crown, Flame, Award, Trophy, BookOpen } from "lucide-react";
import { CopyCodeButton } from "./copy-code-button";
import { GroupChat } from "./group-chat";
import { getGroupMessages } from "@/app/actions/chat";

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
              readings: {
                select: { book: true, chapter: true, date: true },
                orderBy: { date: "desc" },
                take: 5,
              },
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

  // Fetch chat messages
  const messages = await getGroupMessages(id);

  return (
    <div className="p-4 sm:p-6 md:p-10 w-full max-w-4xl mx-auto">
      {/* Group Header */}
      <div className="mb-6">
        <div className="flex items-start gap-3 sm:gap-4 mb-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#d4e4cf] to-[#dde8ef] dark:from-[#3a4d36] dark:to-[#263040] rounded-2xl flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 sm:w-7 sm:h-7 text-[#5e7d54] dark:text-[#8fb585]" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold text-[#3d3d3d] dark:text-white truncate">{group.name}</h1>
            {group.description && (
              <p className="text-sm text-[#7a7a7a] dark:text-[#9e9b93] line-clamp-2">{group.description}</p>
            )}
            <p className="text-xs text-[#9a9a9a] dark:text-[#6b6860] mt-1">
              Created by {group.createdBy.name} • {group.members.length}/{group.maxMembers} members
            </p>
          </div>
        </div>
      </div>

      {/* Join Code Banner */}
      <div className="bg-gradient-to-r from-[#eef3ed] to-[#e8f0f5] dark:from-[#252830] dark:to-[#252830] border border-[#d4e4cf] dark:border-[#363940] rounded-2xl p-4 sm:p-5 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs font-medium text-[#7a7a7a] dark:text-[#9e9b93] mb-1">Share this code:</p>
            <div className="text-2xl sm:text-3xl font-mono font-black tracking-[0.3em] text-[#5e7d54] dark:text-[#8fb585]">
              {group.joinCode}
            </div>
          </div>
          <CopyCodeButton code={group.joinCode} />
        </div>
      </div>

      {/* Collective Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
        <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] p-3 sm:p-4 rounded-2xl text-center">
          <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-[#c4956a] mx-auto mb-1" />
          <div className="text-xl sm:text-2xl font-black text-[#3d3d3d] dark:text-white">{totalStreak}</div>
          <div className="text-[10px] sm:text-xs font-medium text-[#9a9a9a] uppercase tracking-wider">Streak</div>
        </div>
        <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] p-3 sm:p-4 rounded-2xl text-center">
          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#6a9ab8] mx-auto mb-1" />
          <div className="text-xl sm:text-2xl font-black text-[#3d3d3d] dark:text-white">{totalPoints}</div>
          <div className="text-[10px] sm:text-xs font-medium text-[#9a9a9a] uppercase tracking-wider">Points</div>
        </div>
        <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] p-3 sm:p-4 rounded-2xl text-center">
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#c4956a] mx-auto mb-1" />
          <div className="text-xl sm:text-2xl font-black text-[#3d3d3d] dark:text-white">{bestStreak}</div>
          <div className="text-[10px] sm:text-xs font-medium text-[#9a9a9a] uppercase tracking-wider">Best</div>
        </div>
      </div>

      {/* Group Chat */}
      <div className="mb-6">
        <GroupChat
          groupId={id}
          currentUserId={userId!}
          initialMessages={messages as any}
        />
      </div>

      {isFull && (
        <div className="mb-6 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl text-center text-amber-600 dark:text-amber-400 text-sm font-medium">
          Group is full ({group.maxMembers}/{group.maxMembers})
        </div>
      )}

      {/* Members with Reading Progress */}
      <h2 className="text-lg sm:text-xl font-bold text-[#3d3d3d] dark:text-white mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-[#7c9a72]" />
        Members & Reading Progress
      </h2>

      <div className="space-y-3">
        {[...group.members]
          .sort((a, b) => b.user.jesusPoints - a.user.jesusPoints)
          .map((member, rank) => (
          <div
            key={member.id}
            className={`bg-white dark:bg-[#252830] border rounded-2xl p-4 sm:p-5 ${
              rank === 0 ? "border-[#c4956a]/40 dark:border-[#c4956a]/30 ring-2 ring-[#f0ece3] dark:ring-[#3a3028]/40" : "border-[#e5dfd5] dark:border-[#363940]"
            }`}
          >
            {/* Top row: avatar + name + stats */}
            <div className="flex items-center gap-3">
              {/* Rank */}
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 ${
                rank === 0 ? "bg-[#f0ece3] text-[#c4956a]" : rank === 1 ? "bg-[#f0f0f0] text-[#7a7a7a]" : "bg-[#eef3ed] text-[#7c9a72]"
              }`}>
                {rank + 1}
              </div>

              {/* Avatar */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-sm shrink-0"
                style={{ backgroundColor: member.user.profileColor || "#a8c5a0" }}
              >
                {member.user.name[0].toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-sm sm:text-base text-[#3d3d3d] dark:text-white truncate">{member.user.name}</span>
                  {member.role === "admin" && <Crown className="w-3.5 h-3.5 text-[#c4956a] shrink-0" />}
                  {rank === 0 && <span className="text-[10px] bg-[#f0ece3] dark:bg-[#3a3028] text-[#c4956a] px-1.5 py-0.5 rounded-full font-semibold shrink-0">Top</span>}
                </div>
                <p className="text-xs text-[#7a7a7a] dark:text-[#9e9b93] truncate">{member.user.email}</p>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm shrink-0">
                <div className="flex items-center gap-1 text-[#c4956a]" title="Streak">
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-semibold">{member.user.currentStreak}</span>
                </div>
                <div className="flex items-center gap-1 text-[#6a9ab8]" title="Points">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-semibold">{member.user.jesusPoints}</span>
                </div>
              </div>
            </div>

            {/* Reading Progress */}
            {member.user.readings && member.user.readings.length > 0 && (
              <div className="mt-3 pt-3 border-t border-[#e5dfd5] dark:border-[#363940]">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-[#9a9a9a] mb-2 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> Recent Readings
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {member.user.readings.map((r: any, i: number) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[10px] sm:text-xs bg-[#eef3ed] dark:bg-[#2d3038] text-[#5e7d54] dark:text-[#8fb585] px-2 py-1 rounded-full font-medium">
                      📖 {r.book} {r.chapter}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {member.user.readings && member.user.readings.length === 0 && (
              <div className="mt-3 pt-3 border-t border-[#e5dfd5] dark:border-[#363940]">
                <p className="text-[10px] text-[#9a9a9a] italic">No readings logged yet</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
