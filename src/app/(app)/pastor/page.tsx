"use client";

import { Send, User as UserIcon, Sparkles, BookOpen, Heart, Shield, Zap, Church, Cross, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = { id: string; role: "user" | "assistant"; content: string };

const SUGGESTED = [
  { icon: BookOpen, text: "What does John 3:16 mean?", color: "text-[#7c9a72]" },
  { icon: Heart, text: "What does the Bible say about love?", color: "text-[#c4956a]" },
  { icon: Shield, text: "How can I find peace in hard times?", color: "text-[#6a9ab8]" },
  { icon: Zap, text: "I need strength today", color: "text-[#9b8dc0]" },
  { icon: Church, text: "How should I pray?", color: "text-[#7c9a72]" },
  { icon: Star, text: "Explain Psalm 23 to me", color: "text-[#c4956a]" },
];

export default function PastorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const all = [...messages, userMsg];
    setMessages(all);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: all }),
      });
      if (!res.ok) throw new Error("Failed");
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const aId = (Date.now() + 1).toString();
      let content = "";
      setMessages(prev => [...prev, { id: aId, role: "assistant", content: "" }]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value).split("\n").filter(l => l.trim())) {
          if (line.startsWith("0:")) {
            try {
              content += JSON.parse(line.slice(2));
              const c = content;
              setMessages(prev => prev.map(m => m.id === aId ? { ...m, content: c } : m));
            } catch {}
          }
        }
      }
    } catch {
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: "assistant", content: "Sorry, something went wrong. Please try again. 🙏" }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] md:h-screen w-full bg-gradient-to-b from-[#f5f0e8] via-[#f8f7f4] to-[#eef3ed] dark:from-[#1a1d21] dark:via-[#1e2126] dark:to-[#1a1d21]">
      {/* Header */}
      <div className="bg-white/80 dark:bg-[#252830]/80 backdrop-blur-xl border-b border-[#e5dfd5] dark:border-[#363940] px-4 py-3 md:px-6 md:py-4 shrink-0">
        <h1 className="text-lg md:text-2xl font-bold flex items-center gap-2 text-[#3d3d3d] dark:text-white">
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#9b8dc0]" />
          Mini Pastor
        </h1>
        <p className="text-xs md:text-sm text-[#7a7a7a] dark:text-[#9e9b93] mt-0.5">Bible verses, faith topics & spiritual guidance</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 md:px-6 md:py-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#efe9f5] to-[#e6dff0] dark:from-[#302840]/40 dark:to-[#281e38]/40 text-[#9b8dc0] rounded-full flex items-center justify-center mb-4 md:mb-6">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#4a4a4a] dark:text-white">How can I help you today?</h3>
            <p className="text-xs md:text-sm text-[#7a7a7a] dark:text-[#9e9b93] mb-6">Ask about any Bible verse, topic, or spiritual question.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 w-full max-w-xl">
              {SUGGESTED.map((q, i) => {
                const Icon = q.icon;
                return (
                  <button key={i} onClick={() => sendMessage(q.text)}
                    className="flex items-center gap-2 p-3 md:p-4 bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] rounded-xl md:rounded-2xl text-left hover:shadow-md transition-all text-xs md:text-sm text-[#4a4a4a] dark:text-[#c8c4bc]">
                    <Icon className={`w-4 h-4 ${q.color} shrink-0`} />
                    <span className="line-clamp-2">{q.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {messages.map(m => (
          <div key={m.id} className={`flex gap-2 md:gap-3 max-w-2xl ${m.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 ${
              m.role === "user" ? "bg-gradient-to-br from-[#7c9a72] to-[#5e7d54] text-white" : "bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] text-[#9b8dc0]"
            }`}>
              {m.role === "user" ? <UserIcon className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            <div className={`px-3 py-2.5 md:px-4 md:py-3 rounded-2xl text-xs md:text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
              m.role === "user"
                ? "bg-gradient-to-r from-[#7c9a72] to-[#5e7d54] text-white rounded-tr-sm"
                : "bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] rounded-tl-sm text-[#4a4a4a] dark:text-[#c8c4bc]"
            }`}>
              {m.content || (
                <div className="flex gap-1 items-center h-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a8c5a0] animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a8c5a0] animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a8c5a0] animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 md:px-6 md:py-4 bg-white/80 dark:bg-[#252830]/80 backdrop-blur-xl border-t border-[#e5dfd5] dark:border-[#363940] shrink-0 mb-16 md:mb-0">
        <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="max-w-2xl mx-auto relative">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about any verse or topic..."
            className="w-full pl-4 pr-14 py-3 md:py-4 bg-[#f5f0e8]/50 dark:bg-[#1e2126] border border-[#e5dfd5] dark:border-[#363940] rounded-full focus:ring-2 focus:ring-[#7c9a72] outline-none text-sm text-[#4a4a4a] dark:text-white"
          />
          <button type="submit" disabled={!input.trim() || isLoading}
            className="absolute right-1.5 top-1.5 bottom-1.5 w-10 md:w-12 bg-gradient-to-r from-[#7c9a72] to-[#5e7d54] text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-colors">
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
