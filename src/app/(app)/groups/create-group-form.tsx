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
      <div className="bg-white dark:bg-[#252830] border border-green-200 dark:border-green-800 rounded-3xl p-6 text-center">
        <div className="text-green-500 text-lg font-bold mb-2">🎉 Group Created!</div>
        <p className="text-[#7a7a7a] dark:text-[#9e9b93] text-sm mb-4">Share this code with your friends so they can join:</p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="text-4xl font-mono font-black tracking-[0.3em] bg-[#eef3ed] dark:bg-[#2d3038] px-6 py-3 rounded-2xl text-[#5e7d54] dark:text-[#8fb585] border border-[#d4e4cf] dark:border-[#363940]">
            {createdCode}
          </div>
          <button
            onClick={handleCopy}
            className="p-3 rounded-xl bg-[#eef3ed] dark:bg-[#2d3038] hover:bg-[#d4e4cf] dark:hover:bg-[#363940] transition-colors text-[#7c9a72]"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        <button
          onClick={() => { setCreatedCode(null); setOpen(false); }}
          className="text-sm text-[#9a9a9a] hover:text-[#6b6b6b] transition-colors"
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
        className="w-full h-full min-h-[140px] bg-white dark:bg-[#252830] border-2 border-dashed border-[#d4e4cf] dark:border-[#363940] rounded-3xl p-6 flex flex-col items-center justify-center gap-2 text-[#7c9a72] hover:text-[#5e7d54] hover:border-[#a8c5a0] transition-all"
      >
        <Plus className="w-6 h-6" />
        <span className="font-semibold">Create Group</span>
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-[#3d3d3d] dark:text-white mb-4">Create Study Group</h3>
      {error && (
        <div className="p-3 bg-red-50 text-red-500 border border-red-200 rounded-xl mb-4 text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#6b6b6b] dark:text-[#b0ada5] mb-1.5">Group Name</label>
          <input
            name="name"
            required
            className="w-full px-4 py-3 bg-[#eef3ed]/50 dark:bg-[#1e2126]/50 border border-[#e5dfd5] dark:border-[#363940] rounded-2xl focus:ring-2 focus:ring-[#7c9a72] outline-none text-[#4a4a4a] dark:text-white"
            placeholder="e.g. Morning Devotion Squad"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#6b6b6b] dark:text-[#b0ada5] mb-1.5">Description (optional)</label>
          <input
            name="description"
            className="w-full px-4 py-3 bg-[#e8f0f5]/50 dark:bg-[#1e2126]/50 border border-[#e5dfd5] dark:border-[#363940] rounded-2xl focus:ring-2 focus:ring-[#6a9ab8] outline-none text-[#4a4a4a] dark:text-white"
            placeholder="What's this group about?"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center py-3 rounded-2xl text-white bg-gradient-to-r from-[#7c9a72] to-[#5e7d54] hover:from-[#6d8b63] hover:to-[#4f6e45] shadow-lg shadow-[#7c9a72]/15 disabled:opacity-70 font-semibold"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-5 py-3 rounded-2xl bg-[#f0ece3] dark:bg-[#2d3038] text-[#6b6b6b] font-semibold hover:bg-[#e5dfd5] transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
