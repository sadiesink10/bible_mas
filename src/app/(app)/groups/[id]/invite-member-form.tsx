"use client";

import { useState } from "react";
import { UserPlus, Loader2 } from "lucide-react";
import { inviteMember } from "@/app/actions/groups";

export function InviteMemberForm({ groupId }: { groupId: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    const res = await inviteMember({ groupId, email });
    setLoading(false);

    if (res.error) {
      setMessage({ type: "error", text: res.error });
    } else {
      setMessage({ type: "success", text: "Member added successfully!" });
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] rounded-2xl p-5">
      <h3 className="font-semibold text-[#4a4a4a] dark:text-white mb-3 flex items-center gap-2">
        <UserPlus className="w-5 h-5 text-[#7c9a72]" />
        Invite a Friend
      </h3>
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
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          name="email"
          type="email"
          required
          placeholder="friend@example.com"
          className="flex-1 px-4 py-3 bg-[#eef3ed]/50 dark:bg-[#1e2126]/50 border border-[#e5dfd5] dark:border-[#363940] rounded-xl focus:ring-2 focus:ring-[#7c9a72] focus:border-[#7c9a72] outline-none text-[#4a4a4a] dark:text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-[#7c9a72] to-[#5e7d54] text-white rounded-xl font-semibold hover:from-[#6d8b63] hover:to-[#4f6e45] shadow-md shadow-[#7c9a72]/15 disabled:opacity-70 transition-all"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add"}
        </button>
      </form>
    </div>
  );
}
