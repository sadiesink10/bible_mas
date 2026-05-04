"use client";

import { useState } from "react";
import { Plus, Loader2, Copy, Check } from "lucide-react";
import { createGroup } from "@/app/actions/groups";

export function CreateGroupForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const res = await createGroup({ name, description });
    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else if (res.joinCode) {
      setCreatedCode(res.joinCode);
    }
  }

  function handleCopy() {
    if (createdCode) {
      navigator.clipboard.writeText(createdCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  // Show the join code after creation
  if (createdCode) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-green-200 dark:border-green-800 rounded-3xl p-6 text-center">
        <div className="text-green-500 text-lg font-bold mb-2">🎉 Group Created!</div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Share this code with your friends so they can join:</p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="text-4xl font-mono font-black tracking-[0.3em] bg-pink-50 dark:bg-slate-700 px-6 py-3 rounded-2xl text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-slate-600">
            {createdCode}
          </div>
          <button
            onClick={handleCopy}
            className="p-3 rounded-xl bg-pink-50 dark:bg-slate-700 hover:bg-pink-100 dark:hover:bg-slate-600 transition-colors text-pink-500"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        <button
          onClick={() => { setCreatedCode(null); setOpen(false); }}
          className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          Done
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full h-full min-h-[140px] bg-white dark:bg-slate-800 border-2 border-dashed border-pink-200 dark:border-slate-600 rounded-3xl p-6 flex flex-col items-center justify-center gap-2 text-pink-400 hover:text-pink-500 hover:border-pink-300 transition-all"
      >
        <Plus className="w-6 h-6" />
        <span className="font-semibold">Create Group</span>
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-pink-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Create Study Group</h3>
      {error && (
        <div className="p-3 bg-red-50 text-red-500 border border-red-200 rounded-xl mb-4 text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Group Name</label>
          <input
            name="name"
            required
            className="w-full px-4 py-3 bg-pink-50/50 dark:bg-slate-700/50 border border-pink-100 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-pink-400 outline-none text-slate-700 dark:text-white"
            placeholder="e.g. Morning Devotion Squad"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Description (optional)</label>
          <input
            name="description"
            className="w-full px-4 py-3 bg-blue-50/50 dark:bg-slate-700/50 border border-blue-100 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none text-slate-700 dark:text-white"
            placeholder="What's this group about?"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center py-3 rounded-2xl text-white bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 shadow-lg shadow-pink-300/20 disabled:opacity-70 font-semibold"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-500 font-semibold hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
