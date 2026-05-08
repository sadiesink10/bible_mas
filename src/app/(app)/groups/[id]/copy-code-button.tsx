"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2d3038] border border-[#d4e4cf] dark:border-[#363940] rounded-xl hover:bg-[#eef3ed] dark:hover:bg-[#363940] transition-colors text-sm font-semibold text-[#5e7d54] dark:text-[#8fb585]"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          Copy Code
        </>
      )}
    </button>
  );
}
