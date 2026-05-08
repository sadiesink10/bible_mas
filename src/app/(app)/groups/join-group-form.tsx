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
    <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] rounded-3xl p-6 shadow-sm flex flex-col">
      <h3 className="text-lg font-bold text-[#3d3d3d] dark:text-white mb-2 flex items-center gap-2">
        <LogIn className="w-5 h-5 text-[#6a9ab8]" />
        Join a Group
      </h3>
      <p className="text-sm text-[#7a7a7a] dark:text-[#9e9b93] mb-4">
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
          className="flex-1 px-4 py-3 bg-[#e8f0f5]/50 dark:bg-[#1e2126]/50 border border-[#e5dfd5] dark:border-[#363940] rounded-2xl focus:ring-2 focus:ring-[#6a9ab8] outline-none text-[#4a4a4a] dark:text-white font-mono text-center text-lg tracking-[0.2em] uppercase"
          placeholder="ABC123"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-[#6a9ab8] to-[#5889a5] text-white rounded-2xl font-semibold hover:from-[#5b8ba9] hover:to-[#497a96] shadow-md shadow-[#6a9ab8]/15 disabled:opacity-70 transition-all"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Join"}
        </button>
      </form>
    </div>
  );
}
