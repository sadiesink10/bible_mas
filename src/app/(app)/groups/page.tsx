import { auth } from "@/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { Users, ChevronRight, Flame, Award } from "lucide-react";
import { CreateGroupForm } from "./create-group-form";
import { JoinGroupForm } from "./join-group-form";

export const dynamic = "force-dynamic";

export default async function GroupsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const memberships = await db.groupMember.findMany({
    where: { userId },
    include: {
      group: {
        include: {
          createdBy: { select: { name: true } },
          members: {
            include: {
              user: { select: { name: true, profileColor: true, jesusPoints: true, currentStreak: true } },
            },
          },
        },
      },
    },
    orderBy: { joinedAt: "desc" },
  });

  return (
    <div className="p-6 md:p-10 w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500">
          Study Groups
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Create groups, share your code, and study the Bible together (2–5 members per group).
        </p>
      </div>

      {/* How it works */}
      <div className="bg-gradient-to-r from-pink-50 to-blue-50 dark:from-slate-800 dark:to-slate-800 border border-pink-100 dark:border-slate-700 rounded-2xl p-5 mb-8">
        <h3 className="font-semibold text-slate-700 dark:text-white mb-2">📖 How Group Study Works</h3>
        <ol className="text-sm text-slate-500 dark:text-slate-400 space-y-1 list-decimal list-inside">
          <li><strong>Create</strong> a group and get a <strong>6-character join code</strong></li>
          <li><strong>Share</strong> the code with your friends (WhatsApp, text, in person)</li>
          <li>They <strong>join</strong> by entering the code below — no email required!</li>
          <li>Track each other's <strong>streaks and Jesus Points</strong> inside the group</li>
        </ol>
      </div>

      {/* Create + Join side by side */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <CreateGroupForm />
        <JoinGroupForm />
      </div>

      {/* Groups List */}
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Your Groups</h2>
      <div className="space-y-4">
        {memberships.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-pink-100 dark:border-slate-700">
            <Users className="w-12 h-12 text-pink-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-white mb-2">No groups yet</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Create a group or join one with a code!</p>
          </div>
        )}

        {memberships.map(({ group }) => {
          // Calculate collective stats
          const totalPoints = group.members.reduce((sum, m) => sum + m.user.jesusPoints, 0);
          const totalStreak = group.members.reduce((sum, m) => sum + m.user.currentStreak, 0);

          return (
            <Link
              key={group.id}
              href={`/groups/${group.id}`}
              className="block bg-white dark:bg-slate-800 border border-pink-100 dark:border-slate-700 rounded-3xl p-6 hover:shadow-lg hover:shadow-pink-100/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-blue-200 dark:from-pink-800 dark:to-blue-800 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-pink-600 dark:text-pink-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">{group.name}</h3>
                    {group.description && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">{group.description}</p>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-pink-400 transition-colors" />
              </div>

              {/* Member avatars + collective stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {group.members.slice(0, 5).map((member) => (
                    <div
                      key={member.id}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm -ml-1 first:ml-0 border-2 border-white dark:border-slate-800"
                      style={{ backgroundColor: member.user.profileColor || "#f9a8d4" }}
                      title={member.user.name}
                    >
                      {member.user.name[0].toUpperCase()}
                    </div>
                  ))}
                  <span className="text-xs text-slate-400 ml-2">
                    {group.members.length}/{(group as any).maxMembers || 5}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-rose-400">
                    <Flame className="w-4 h-4" />
                    <span className="font-bold">{totalStreak}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-400">
                    <Award className="w-4 h-4" />
                    <span className="font-bold">{totalPoints}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
