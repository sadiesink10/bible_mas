import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Flame, Trophy, Award, Activity } from "lucide-react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { currentStreak: true, longestStreak: true, jesusPoints: true, name: true }
  });

  const feed = await db.activityFeed.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, profileColor: true }
      }
    }
  });

  // Dynamic streak message
  const streak = user?.currentStreak || 0;
  let streakMessage = "";
  let streakIcon = "";
  if (streak >= 30) {
    streakMessage = `You are on a ${streak}-day walk with God 👑`;
    streakIcon = "👑";
  } else if (streak >= 7) {
    streakMessage = `You are on a ${streak}-day walk with God 🔥🔥`;
    streakIcon = "🔥🔥";
  } else if (streak >= 1) {
    streakMessage = `You are on a ${streak}-day walk with God 🙏`;
    streakIcon = "🔥";
  }

  return (
    <div className="p-6 md:p-10 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500">
          Welcome, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Here is your spiritual progress and community feed.
        </p>
      </div>

      {/* Streak Message Banner */}
      {streakMessage && (
        <div className="mb-8 p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-200 dark:border-pink-800/40 rounded-2xl text-center">
          <p className="text-lg font-semibold text-pink-600 dark:text-pink-400">
            {streakMessage}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {/* Streak Card */}
        <div className="bg-white dark:bg-slate-800 border border-pink-100 dark:border-slate-700 p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-pink-100/50 dark:from-rose-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Flame className={`w-10 h-10 mb-3 ${streak > 0 ? "text-rose-400" : "text-slate-300"}`} />
          <h3 className="text-4xl font-black text-slate-800 dark:text-white">{streak}</h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Day Streak {streakIcon}</p>
        </div>

        {/* Jesus Points Card */}
        <div className="bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-sky-100/50 dark:from-blue-900/10 dark:to-sky-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Award className="w-10 h-10 mb-3 text-blue-400" />
          <h3 className="text-4xl font-black text-slate-800 dark:text-white">{user?.jesusPoints || 0}</h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Jesus Points</p>
        </div>

        {/* Longest Streak Card */}
        <div className="bg-white dark:bg-slate-800 border border-pink-100 dark:border-slate-700 p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-rose-100/50 dark:from-pink-900/10 dark:to-rose-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Trophy className="w-10 h-10 mb-3 text-pink-400" />
          <h3 className="text-4xl font-black text-slate-800 dark:text-white">{user?.longestStreak || 0}</h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Best Streak</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-6 h-6 text-pink-400" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Community Feed</h2>
        </div>

        <div className="space-y-4">
          {feed.length === 0 && (
            <p className="text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-pink-100 dark:border-slate-700 text-center">
              No recent activity. Be the first to read today!
            </p>
          )}
          {feed.map((item: any) => (
            <div key={item.id} className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-pink-100 dark:border-slate-700 shadow-sm flex items-start gap-4 hover:shadow-md hover:shadow-pink-100/30 transition-shadow">
              <div 
                className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-sm"
                style={{ backgroundColor: item.user.profileColor || "#f9a8d4" }}
              >
                {item.user.name[0].toUpperCase()}
              </div>
              <div className="flex-1 mt-1">
                <p className="text-slate-700 dark:text-slate-200">
                  <span className="font-semibold">{item.user.name}</span>
                  {" "}
                  {item.type === "MILESTONE" ? 
                    <span className="text-rose-500 font-medium">{item.message}</span> : 
                    <span className="text-slate-500 dark:text-slate-400">{item.message.toLowerCase()}</span>
                  }
                </p>
                <div className="mt-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                   {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
