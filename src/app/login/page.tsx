"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { BookOpen, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else if (res?.ok) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-4 relative overflow-hidden">
      {/* Soft Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-200/40 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200/40 rounded-full blur-3xl z-0" />
      <div className="absolute top-[40%] right-[20%] w-64 h-64 bg-rose-200/30 rounded-full blur-3xl z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-pink-100/30 border border-pink-100 dark:border-slate-700 z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-300/30 mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500">
            Welcome Back
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-center">
            Continue your spiritual journey
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-500 rounded-xl mb-6 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5 ml-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-pink-300" />
              </div>
              <input 
                type="email" 
                name="email" 
                required
                className="block w-full pl-11 pr-4 py-3 bg-pink-50/50 dark:bg-slate-700/50 border border-pink-100 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all outline-none text-slate-800 dark:text-white"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-pink-300" />
              </div>
              <input 
                type="password" 
                name="password" 
                required
                className="block w-full pl-11 pr-4 py-3 bg-pink-50/50 dark:bg-slate-700/50 border border-pink-100 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all outline-none text-slate-800 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center py-3.5 px-4 rounded-2xl text-white bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-all shadow-lg shadow-pink-300/30 disabled:opacity-70 mt-6"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                Sign In
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{' '}
          <a href="/register" className="font-semibold text-pink-500 hover:text-pink-600 transition-colors">
            Start your journey
          </a>
        </p>
      </motion.div>
    </div>
  );
}
