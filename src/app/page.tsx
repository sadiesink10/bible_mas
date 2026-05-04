import Link from "next/link";
import { BookOpen, Sparkles, TrendingUp, Users, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 min-h-screen font-sans selection:bg-pink-300/40">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-pink-400 to-rose-500 p-2 rounded-xl text-white shadow-lg shadow-pink-300/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">ScriptureWalk</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-pink-500 transition-colors">
            Log in
          </Link>
          <Link href="/register" className="text-sm font-medium bg-gradient-to-r from-pink-400 to-rose-500 text-white px-5 py-2 rounded-full hover:scale-105 transition-transform shadow-md shadow-pink-300/30">
            Start Journey
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-sm font-medium mb-8 border border-pink-200 dark:border-pink-800/50">
          <Sparkles className="w-4 h-4" />
          <span>New AI Mini-Pastor Available</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-6 text-slate-800 dark:text-white">
          Read the Bible, <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
            Build the Habit.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mb-10">
          Join thousands tracking their reading streaks, gaining insights from our AI Pastor, and growing together in group Bible studies.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center">
          <Link href="/register" className="bg-gradient-to-r from-pink-400 to-rose-500 text-white font-medium px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-pink-300/30 transition-all hover:-translate-y-1 sm:w-auto w-full flex justify-center">
            Start Reading Free
          </Link>
          <Link href="#features" className="bg-white dark:bg-slate-800 border border-pink-100 dark:border-slate-700 font-medium px-8 py-4 rounded-2xl hover:bg-pink-50 dark:hover:bg-slate-700 transition-all sm:w-auto w-full flex justify-center text-slate-700 dark:text-slate-200">
            How it works
          </Link>
        </div>

        {/* Feature grid */}
        <div id="features" className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mt-12 text-left">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-pink-100 dark:border-slate-700 hover:shadow-xl hover:shadow-pink-100/50 transition-all group">
            <div className="bg-rose-100 dark:bg-rose-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-rose-500 dark:text-rose-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Daily Streaks</h3>
            <p className="text-slate-500 dark:text-slate-400">Build momentum. Read daily to keep your fire streak alive and earn Jesus Points.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-blue-100 dark:border-slate-700 hover:shadow-xl hover:shadow-blue-100/50 transition-all group">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Smart Reader</h3>
            <p className="text-slate-500 dark:text-slate-400">A clean distraction-free Bible reader with offline logging for paper readers.</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-pink-100 dark:border-slate-700 hover:shadow-xl hover:shadow-pink-100/50 transition-all group">
            <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-pink-500 dark:text-pink-400 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Group Study</h3>
            <p className="text-slate-500 dark:text-slate-400">Create study groups, invite friends, and keep each other accountable on the journey.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
