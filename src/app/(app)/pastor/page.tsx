"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, User as UserIcon, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function PastorPage() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen w-full relative bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex flex-col md:flex-row md:items-center justify-between z-10 shrink-0">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-500" />
            Mini Pastor Assistant
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Ask questions about the Bible, scripture meanings, and spiritual guidance.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto opacity-70">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">How can I help you today?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try asking &quot;What does John 3:16 mean?&quot; or &quot;How can I find peace during hard times?&quot;
            </p>
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-2xl text-center">
            Something went wrong. Please try again.
          </div>
        )}

        {messages.map(m => (
          <div key={m.id} className={`flex gap-4 max-w-3xl ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
              m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-indigo-500'
            }`}>
              {m.role === 'user' ? <UserIcon className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div className={`p-4 rounded-3xl text-sm md:text-base whitespace-pre-wrap leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-sm' 
                : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-tl-sm text-gray-800 dark:text-gray-200'
            }`}>
              {m.parts.map((part, i) =>
                part.type === 'text' ? <span key={i}>{part.text}</span> : null
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 max-w-3xl">
             <div className="w-10 h-10 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-indigo-500 flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5 animate-pulse" />
             </div>
             <div className="p-4 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-tl-sm flex gap-1 items-center h-12">
               <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
               <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0.2s"}} />
               <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0.4s"}} />
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shrink-0">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (input.trim() && !isLoading) {
              sendMessage({ text: input });
              setInput("");
            }
          }}
          className="max-w-3xl mx-auto relative group"
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask the pastor anything about faith..."
            className="w-full pl-6 pr-16 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none shadow-sm"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 w-12 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-md shadow-indigo-500/20"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
