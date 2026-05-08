"use client";

import { useState, useTransition } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { deleteAccount } from "@/app/actions/account";

export function DeleteAccountButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteAccount();
      if (result.success) {
        window.location.href = "/login";
      }
    });
  }

  if (!showConfirm) {
    return (
      <button
        onClick={() => setShowConfirm(true)}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#9a9a9a] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
      >
        <Trash2 className="w-4 h-4" />
        Delete Account
      </button>
    );
  }

  return (
    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800/30 space-y-2">
      <div className="flex items-center gap-2 text-red-500 text-xs font-semibold">
        <AlertTriangle className="w-3.5 h-3.5" />
        This is permanent!
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="flex-1 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
        >
          {isPending ? "Deleting..." : "Yes, delete"}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="flex-1 py-1.5 bg-[#eef3ed] dark:bg-[#363940] text-[#3d3d3d] dark:text-white text-xs font-semibold rounded-lg hover:bg-[#d4e4cf] dark:hover:bg-[#2d3038] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
