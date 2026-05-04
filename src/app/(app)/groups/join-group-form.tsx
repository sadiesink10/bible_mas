"use client";

import { useState } from "react";
import { LogIn, Loader2 } from "lucide-react";
import { joinGroupByCode } from "@/app/actions/groups";

export function JoinGroupForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    const code = formData.get("code") as string;

    const res = await joinGroupByCode(code);
    setLoading(false);

    if (res.error) {
      setMessage({ type: "error", text: res.error });
    } else {
      setMessage({ type: "success", text: `Joined "${res.groupName}" successfully! 🎉` });
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
        <LogIn className="w-5 h-5 text-blue-400" />
        Join a Group
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Got a code from a friend? Enter it below to join their study group.
      </p>

      {message && (
        <div
          className={`p-3 rounded-xl mb-3 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-red-50 text-red-500 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3 mt-auto">
        <input
          name="code"
          required
          maxLength={6}
          className="flex-1 px-4 py-3 bg-blue-50/50 dark:bg-slate-700/50 border border-blue-100 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none text-slate-700 dark:text-white font-mono text-center text-lg tracking-[0.2em] uppercase"
          placeholder="ABC123"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-blue-400 to-sky-500 text-white rounded-2xl font-semibold hover:from-blue-500 hover:to-sky-600 shadow-md shadow-blue-300/20 disabled:opacity-70 transition-all"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Join"}
        </button>
      </form>
    </div>
  );
}
