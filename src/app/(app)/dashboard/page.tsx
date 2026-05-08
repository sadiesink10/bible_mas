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
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7c9a72] to-[#5e7d54]">
          Welcome, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-[#7a7a7a] dark:text-[#9e9b93] mt-1">
          Here is your spiritual progress and community feed.
        </p>
      </div>

      {/* Streak Message Banner */}
      {streakMessage && (
        <div className="mb-8 p-4 bg-gradient-to-r from-[#eef3ed] to-[#f0ece3] dark:from-[#2a3328]/40 dark:to-[#3a3028]/40 border border-[#d4e4cf] dark:border-[#3a4d36]/50 rounded-2xl text-center">
          <p className="text-lg font-semibold text-[#5e7d54] dark:text-[#8fb585]">
            {streakMessage}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {/* Streak Card */}
        <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f0ece3]/50 to-[#e8dcc8]/50 dark:from-[#3a3028]/20 dark:to-[#302818]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Flame className={`w-10 h-10 mb-3 ${streak > 0 ? "text-[#c4956a]" : "text-[#c8c4bc]"}`} />
          <h3 className="text-4xl font-black text-[#3d3d3d] dark:text-white">{streak}</h3>
          <p className="text-sm font-medium text-[#7a7a7a] dark:text-[#9e9b93] mt-1 uppercase tracking-wider">Day Streak {streakIcon}</p>
        </div>

        {/* Jesus Points Card */}
        <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0f5]/50 to-[#dde8ef]/50 dark:from-[#263040]/20 dark:to-[#1e2830]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Award className="w-10 h-10 mb-3 text-[#6a9ab8]" />
          <h3 className="text-4xl font-black text-[#3d3d3d] dark:text-white">{user?.jesusPoints || 0}</h3>
          <p className="text-sm font-medium text-[#7a7a7a] dark:text-[#9e9b93] mt-1 uppercase tracking-wider">Jesus Points</p>
        </div>

        {/* Longest Streak Card */}
        <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#efe9f5]/50 to-[#e6dff0]/50 dark:from-[#302840]/20 dark:to-[#281e38]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Trophy className="w-10 h-10 mb-3 text-[#9b8dc0]" />
          <h3 className="text-4xl font-black text-[#3d3d3d] dark:text-white">{user?.longestStreak || 0}</h3>
          <p className="text-sm font-medium text-[#7a7a7a] dark:text-[#9e9b93] mt-1 uppercase tracking-wider">Best Streak</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-6 h-6 text-[#7c9a72]" />
          <h2 className="text-2xl font-bold text-[#3d3d3d] dark:text-white">Community Feed</h2>
        </div>

        <div className="space-y-4">
          {feed.length === 0 && (
            <p className="text-[#7a7a7a] dark:text-[#9e9b93] bg-white dark:bg-[#252830] p-6 rounded-2xl border border-[#e5dfd5] dark:border-[#363940] text-center">
              No recent activity. Be the first to read today!
            </p>
          )}
          {feed.map((item: any) => (
            <div key={item.id} className="bg-white dark:bg-[#252830] p-5 rounded-3xl border border-[#e5dfd5] dark:border-[#363940] shadow-sm flex items-start gap-4 hover:shadow-md hover:shadow-[#a8c5a0]/10 transition-shadow">
              <div 
                className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-sm"
                style={{ backgroundColor: item.user.profileColor || "#a8c5a0" }}
              >
                {item.user.name[0].toUpperCase()}
              </div>
              <div className="flex-1 mt-1">
                <p className="text-[#4a4a4a] dark:text-[#c8c4bc]">
                  <span className="font-semibold">{item.user.name}</span>
                  {" "}
                  {item.type === "MILESTONE" ? 
                    <span className="text-[#c4956a] font-medium">{item.message}</span> : 
                    <span className="text-[#7a7a7a] dark:text-[#9e9b93]">{item.message.toLowerCase()}</span>
                  }
                </p>
                <div className="mt-2 text-xs font-semibold text-[#9a9a9a] dark:text-[#6b6860] uppercase tracking-wider">
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
