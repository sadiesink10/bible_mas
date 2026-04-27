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

  return (
    <div className="p-6 md:p-10 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Welcome, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Here is your spiritual progress and community feed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {/* Streak Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Flame className={`w-10 h-10 mb-3 ${Number(user?.currentStreak) > 0 ? "text-orange-500" : "text-gray-400"}`} />
          <h3 className="text-4xl font-black">{user?.currentStreak || 0}</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">Day Streak</p>
        </div>

        {/* Jesus Points Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Award className="w-10 h-10 mb-3 text-amber-500" />
          <h3 className="text-4xl font-black">{user?.jesusPoints || 0}</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">Jesus Points</p>
        </div>

        {/* Longest Streak Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Trophy className="w-10 h-10 mb-3 text-purple-500" />
          <h3 className="text-4xl font-black">{user?.longestStreak || 0}</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">Best Streak</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-6 h-6 text-indigo-500" />
          <h2 className="text-2xl font-bold">Community Feed</h2>
        </div>

        <div className="space-y-4">
          {feed.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
              No recent activity. Be the first to read today!
            </p>
          )}
          {feed.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div 
                className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-sm"
                style={{ backgroundColor: item.user.profileColor || "#3B82F6" }}
              >
                {item.user.name[0].toUpperCase()}
              </div>
              <div className="flex-1 mt-1">
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">{item.user.name}</span>
                  {" "}
                  {item.type === "MILESTONE" ? 
                    <span className="text-orange-500 font-medium">{item.message}</span> : 
                    <span className="text-gray-600 dark:text-gray-400">{item.message.toLowerCase()}</span>
                  }
                </p>
                <div className="mt-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
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
