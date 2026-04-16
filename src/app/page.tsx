import Link from "next/link";
import { BookOpen, Sparkles, TrendingUp, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl text-white shadow-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">ScriptureWalk</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-sm font-medium hover:text-indigo-600 transition-colors">
            Log in
          </Link>
          <Link href="/register" className="text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-full hover:scale-105 transition-transform">
            Start Journey
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8 border border-indigo-100 dark:border-indigo-800/50">
          <Sparkles className="w-4 h-4" />
          <span>New AI Mini-Pastor Available</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-6">
          Read the Bible, <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Build the Habit.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mb-10">
          Join thousands tracking their reading streaks, gaining insights from our AI Pastor, and growing together in a beautifully designed social platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center">
          <Link href="/register" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium px-8 py-4 rounded-2xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:-translate-y-1 sm:w-auto w-full flex justify-center">
            Start Reading Free
          </Link>
          <Link href="#features" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 font-medium px-8 py-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all sm:w-auto w-full flex justify-center">
            How it works
          </Link>
        </div>

        {/* Feature grid */}
        <div id="features" className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mt-12 text-left">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all group">
            <div className="bg-orange-100 dark:bg-orange-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Daily Streaks</h3>
            <p className="text-gray-500 dark:text-gray-400">Build momentum. Read daily to keep your fire streak alive and earn Jesus Points.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all group">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Reader</h3>
            <p className="text-gray-500 dark:text-gray-400">A clean distraction-free Bible reader with offline logging for paper readers.</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all group">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Social Accountability</h3>
            <p className="text-gray-500 dark:text-gray-400">Share progress, celebrate milestones, and colorize your profile in the activity feed.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
