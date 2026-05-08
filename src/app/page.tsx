import Link from "next/link";
import { BookOpen, Sparkles, TrendingUp, Users, Heart } from "lucide-react";
import { CreatorNote } from "@/components/creator-note";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#f5f0e8] via-[#f8f7f4] to-[#eef3ed] dark:from-[#1a1d21] dark:via-[#1e2126] dark:to-[#1a1d21] min-h-screen font-sans selection:bg-[#a8c5a0]/30">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-[#7c9a72] to-[#5e7d54] p-2 rounded-xl text-white shadow-lg shadow-[#7c9a72]/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-[#3d3d3d] dark:text-white">ScriptureWalk</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-sm font-medium text-[#6b6b6b] dark:text-[#b0ada5] hover:text-[#7c9a72] transition-colors">
            Log in
          </Link>
          <Link href="/register" className="text-sm font-medium bg-gradient-to-r from-[#7c9a72] to-[#5e7d54] text-white px-5 py-2 rounded-full hover:scale-105 transition-transform shadow-md shadow-[#7c9a72]/20">
            Start Journey
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="pt-24 md:pt-32 pb-8 md:pb-16 px-4 md:px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-[#d4e4cf]/60 dark:bg-[#3a4d36]/40 text-[#5e7d54] dark:text-[#8fb585] text-xs md:text-sm font-medium mb-6 md:mb-8 border border-[#a8c5a0]/40 dark:border-[#3a4d36]">
          <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span>New AI Mini-Pastor Available</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-4 md:mb-6 text-[#3d3d3d] dark:text-white">
          Read the Bible, <br className="hidden sm:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c9a72] to-[#b8a9d4]">
            Build the Habit.
          </span>
        </h1>
        
        <p className="text-sm sm:text-lg md:text-xl text-[#7a7a7a] dark:text-[#9e9b93] max-w-2xl mb-8 md:mb-10 px-2">
          Join thousands tracking their reading streaks, gaining insights from our AI Pastor, and growing together in group Bible studies.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-12 md:mb-20 w-full max-w-md sm:max-w-none justify-center">
          <Link href="/register" className="bg-gradient-to-r from-[#7c9a72] to-[#5e7d54] text-white font-medium px-6 md:px-8 py-3.5 md:py-4 rounded-2xl hover:shadow-xl hover:shadow-[#7c9a72]/20 transition-all hover:-translate-y-1 sm:w-auto w-full flex justify-center text-sm md:text-base">
            Start Reading Free
          </Link>
          <Link href="#features" className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] font-medium px-6 md:px-8 py-3.5 md:py-4 rounded-2xl hover:bg-[#f5f0e8] dark:hover:bg-[#2d3038] transition-all sm:w-auto w-full flex justify-center text-[#5a5a5a] dark:text-[#c8c4bc] text-sm md:text-base">
            How it works
          </Link>
        </div>

        {/* Feature grid */}
        <div id="features" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl mt-6 md:mt-12 text-left">
          <div className="bg-white dark:bg-[#252830] p-6 md:p-8 rounded-2xl md:rounded-3xl border border-[#e5dfd5] dark:border-[#363940] hover:shadow-xl hover:shadow-[#a8c5a0]/15 transition-all group">
            <div className="bg-[#f0ece3] dark:bg-[#3a3028] w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-[#c4956a] dark:text-[#d4a87c] group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#3d3d3d] dark:text-white">Daily Streaks</h3>
            <p className="text-sm text-[#7a7a7a] dark:text-[#9e9b93]">Build momentum. Read daily to keep your fire streak alive and earn Jesus Points.</p>
          </div>
          
          <div className="bg-white dark:bg-[#252830] p-6 md:p-8 rounded-2xl md:rounded-3xl border border-[#e5dfd5] dark:border-[#363940] hover:shadow-xl hover:shadow-[#a3c4d9]/15 transition-all group">
            <div className="bg-[#e8f0f5] dark:bg-[#263040] w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-[#6a9ab8] dark:text-[#7ea8c2] group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#3d3d3d] dark:text-white">Smart Reader</h3>
            <p className="text-sm text-[#7a7a7a] dark:text-[#9e9b93]">A clean distraction-free Bible reader with offline logging for paper readers.</p>
          </div>

          <div className="bg-white dark:bg-[#252830] p-6 md:p-8 rounded-2xl md:rounded-3xl border border-[#e5dfd5] dark:border-[#363940] hover:shadow-xl hover:shadow-[#b8a9d4]/15 transition-all group sm:col-span-2 md:col-span-1">
            <div className="bg-[#efe9f5] dark:bg-[#302840] w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-[#9b8dc0] dark:text-[#b8a9d4] group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#3d3d3d] dark:text-white">Group Study</h3>
            <p className="text-sm text-[#7a7a7a] dark:text-[#9e9b93]">Create study groups, invite friends, and keep each other accountable on the journey.</p>
          </div>
        </div>
      </main>

      {/* Footer with hidden heart */}
      <footer className="py-8 text-center">
        <p className="text-xs text-[#b0ada5] dark:text-[#6b6860] mb-2">ScriptureWalk © 2026</p>
        <CreatorNote />
      </footer>
    </div>
  );
}
