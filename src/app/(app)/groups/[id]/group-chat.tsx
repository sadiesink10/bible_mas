"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Send, MessageCircle } from "lucide-react";
import { sendGroupMessage } from "@/app/actions/chat";

type Message = {
  id: string;
  content: string;
  createdAt: Date;
  user: { id: string; name: string; profileColor: string };
};

export function GroupChat({ groupId, currentUserId, initialMessages }: {
  groupId: string;
  currentUserId: string;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Poll for new messages every 5s
  useEffect(() => {
    if (!open) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/group-messages?groupId=${groupId}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch {}
    }, 5000);
    return () => clearInterval(interval);
  }, [open, groupId]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const optimistic: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      createdAt: new Date(),
      user: { id: currentUserId, name: "You", profileColor: "#7c9a72" },
    };
    setMessages(prev => [...prev, optimistic]);
    const msg = input.trim();
    setInput("");

    startTransition(async () => {
      await sendGroupMessage({ groupId, content: msg });
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#eef3ed] dark:bg-[#2d3038] hover:bg-[#d4e4cf] dark:hover:bg-[#363940] text-[#5e7d54] dark:text-[#8fb585] border border-[#d4e4cf] dark:border-[#363940] rounded-2xl font-semibold transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        Open Group Chat ({messages.length} messages)
      </button>
    );
  }

  return (
    <div className="border border-[#d4e4cf] dark:border-[#363940] rounded-2xl overflow-hidden bg-white dark:bg-[#252830]">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5dfd5] dark:border-[#363940] bg-[#eef3ed] dark:bg-[#2d3038]">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#7c9a72]" />
          <span className="font-semibold text-[#3d3d3d] dark:text-white text-sm">Group Chat</span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-[#9a9a9a] hover:text-[#5e7d54] dark:hover:text-[#8fb585] font-medium"
        >
          Minimize
        </button>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-sm text-[#9a9a9a] py-8">No messages yet. Say hello! 👋</p>
        )}
        {messages.map((msg) => {
          const isMe = msg.user.id === currentUserId;
          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ backgroundColor: msg.user.profileColor || "#7c9a72" }}
              >
                {msg.user.name[0].toUpperCase()}
              </div>
              <div className={`max-w-[70%] ${isMe ? "text-right" : ""}`}>
                <p className="text-[10px] text-[#9a9a9a] font-medium mb-0.5">
                  {isMe ? "You" : msg.user.name}
                </p>
                <div className={`inline-block px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  isMe
                    ? "bg-[#7c9a72] text-white rounded-tr-sm"
                    : "bg-[#f0ece3] dark:bg-[#363940] text-[#3d3d3d] dark:text-[#e0ddd5] rounded-tl-sm"
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2 p-3 border-t border-[#e5dfd5] dark:border-[#363940]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          maxLength={500}
          className="flex-1 px-4 py-2 bg-[#f8f7f4] dark:bg-[#1e2126] border border-[#e5dfd5] dark:border-[#363940] rounded-full text-sm focus:ring-2 focus:ring-[#7c9a72] focus:border-[#7c9a72] outline-none text-[#3d3d3d] dark:text-white"
        />
        <button
          type="submit"
          disabled={!input.trim() || isPending}
          className="w-9 h-9 bg-[#7c9a72] text-white rounded-full flex items-center justify-center hover:bg-[#5e7d54] disabled:opacity-50 transition-colors shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
