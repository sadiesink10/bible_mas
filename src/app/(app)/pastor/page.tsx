"use client";

import { Send, User as UserIcon, Sparkles, BookOpen, Heart, Shield, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_QUESTIONS = [
  { icon: BookOpen, text: "What does John 3:16 mean?", color: "text-pink-400" },
  { icon: Heart, text: "What does the Bible say about love?", color: "text-rose-400" },
  { icon: Shield, text: "How can I find peace?", color: "text-blue-400" },
  { icon: Zap, text: "I need strength today", color: "text-amber-400" },
];

export default function PastorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!res.ok) throw new Error("Failed");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const assistantId = (Date.now() + 1).toString();
      let assistantContent = "";

      // Add empty assistant message
      setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter(l => l.trim());
        
        for (const line of lines) {
          // Parse Vercel AI SDK data stream format: 0:"text content"
          if (line.startsWith('0:')) {
            const jsonStr = line.slice(2);
            try {
              const text = JSON.parse(jsonStr);
              assistantContent += text;
              const captured = assistantContent;
              setMessages(prev => 
                prev.map(m => m.id === assistantId ? { ...m, content: captured } : m)
              );
            } catch {
              // skip non-text events
            }
          }
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        content: "Sorry, something went wrong. Please try again. 🙏" 
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen w-full relative bg-gradient-to-b from-pink-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-pink-100 dark:border-slate-700 p-6 flex flex-col md:flex-row md:items-center justify-between z-10 shrink-0">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <Sparkles className="w-6 h-6 text-pink-400" />
            Mini Pastor Assistant
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ask about Bible verses, faith topics, and spiritual guidance.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 text-pink-500 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-700 dark:text-white">How can I help you today?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Ask about any Bible verse, topic, or spiritual question.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {SUGGESTED_QUESTIONS.map((q, i) => {
                const Icon = q.icon;
                return (
                  <button
                    key={i}
                    onClick={() => sendMessage(q.text)}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 border border-pink-100 dark:border-slate-700 rounded-2xl text-left hover:shadow-md hover:shadow-pink-100/30 transition-all text-sm text-slate-700 dark:text-slate-200"
                  >
                    <Icon className={`w-5 h-5 ${q.color} shrink-0`} />
                    {q.text}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {messages.map(m => (
          <div key={m.id} className={`flex gap-4 max-w-3xl ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
              m.role === 'user' ? 'bg-gradient-to-br from-pink-400 to-rose-500 text-white' : 'bg-white dark:bg-slate-800 border border-pink-100 dark:border-slate-700 text-pink-400'
            }`}>
              {m.role === 'user' ? <UserIcon className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div className={`p-4 rounded-3xl text-sm md:text-base whitespace-pre-wrap leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-tr-sm' 
                : 'bg-white dark:bg-slate-800 border border-pink-100 dark:border-slate-700 rounded-tl-sm text-slate-700 dark:text-slate-200'
            }`}>
              {m.content || (
                <div className="flex gap-1 items-center h-5">
                  <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "0.2s"}} />
                  <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "0.4s"}} />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-t border-pink-100 dark:border-slate-700 shrink-0">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative group">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask the pastor anything about faith..."
            className="w-full pl-6 pr-16 py-4 bg-pink-50/50 dark:bg-slate-700 border border-pink-100 dark:border-slate-600 rounded-full focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all outline-none shadow-sm text-slate-700 dark:text-white"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 w-12 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-full flex items-center justify-center hover:from-pink-500 hover:to-rose-600 disabled:opacity-50 transition-colors shadow-md shadow-pink-300/20"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
