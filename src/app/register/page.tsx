"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { register } from "../actions/auth";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    const formData = new FormData(e.currentTarget);
    const res = await register(formData);
    
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else if (res?.success) {
      setSuccess(res.success);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f0e8] via-[#f8f7f4] to-[#eef3ed] dark:from-[#1a1d21] dark:via-[#1e2126] dark:to-[#1a1d21] p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#a8c5a0]/20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#b8a9d4]/20 rounded-full blur-3xl z-0" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/90 dark:bg-[#252830]/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-[#a8c5a0]/10 border border-[#e5dfd5] dark:border-[#363940] z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#7c9a72] to-[#5e7d54] rounded-2xl flex items-center justify-center shadow-lg shadow-[#7c9a72]/20 mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7c9a72] to-[#5e7d54]">
            Join the Journey
          </h1>
          <p className="text-[#7a7a7a] dark:text-[#9e9b93] mt-2 text-center">
            Start building your spiritual habits today.
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 bg-red-50 border border-red-200 text-red-500 rounded-xl mb-6 text-sm text-center"
          >
            {error}
          </motion.div>
        )}
        
        {success && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 bg-green-50 border border-green-200 text-green-600 rounded-xl mb-6 text-sm text-center"
          >
            {success} Redirecting...
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#6b6b6b] dark:text-[#b0ada5] mb-1.5 ml-1">Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-[#a8c5a0]" />
              </div>
              <input 
                type="text" 
                name="name" 
                required
                className="block w-full pl-11 pr-4 py-3 bg-[#f5f0e8]/50 dark:bg-[#1e2126]/50 border border-[#e5dfd5] dark:border-[#363940] rounded-2xl focus:ring-2 focus:ring-[#7c9a72] focus:border-[#7c9a72] transition-all outline-none text-[#3d3d3d] dark:text-white"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6b6b6b] dark:text-[#b0ada5] mb-1.5 ml-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#a8c5a0]" />
              </div>
              <input 
                type="email" 
                name="email" 
                required
                className="block w-full pl-11 pr-4 py-3 bg-[#f5f0e8]/50 dark:bg-[#1e2126]/50 border border-[#e5dfd5] dark:border-[#363940] rounded-2xl focus:ring-2 focus:ring-[#7c9a72] focus:border-[#7c9a72] transition-all outline-none text-[#3d3d3d] dark:text-white"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#6b6b6b] dark:text-[#b0ada5] mb-1.5 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#a8c5a0]" />
              </div>
              <input 
                type="password" 
                name="password" 
                required
                className="block w-full pl-11 pr-4 py-3 bg-[#f5f0e8]/50 dark:bg-[#1e2126]/50 border border-[#e5dfd5] dark:border-[#363940] rounded-2xl focus:ring-2 focus:ring-[#7c9a72] focus:border-[#7c9a72] transition-all outline-none text-[#3d3d3d] dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center py-3.5 px-4 rounded-2xl text-white bg-gradient-to-r from-[#7c9a72] to-[#5e7d54] hover:from-[#6d8b63] hover:to-[#4f6e45] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c9a72] transition-all shadow-lg shadow-[#7c9a72]/20 disabled:opacity-70 mt-6"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                Create Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#7a7a7a] dark:text-[#9e9b93]">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-[#7c9a72] hover:text-[#5e7d54] transition-colors">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
}
