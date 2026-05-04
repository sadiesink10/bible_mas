"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { logReading } from "@/app/actions/reading";

type BibleData = { abbrev: string; chapters: string[][]; name: string; }[];

const OT_COUNT = 39; // First 39 books are Old Testament

export default function BibleReader() {
  const [bible, setBible] = useState<BibleData | null>(null);
  const [testament, setTestament] = useState<"old" | "new">("old");
  const [selectedBookIndex, setSelectedBookIndex] = useState<number>(0);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [loggingProgress, setLoggingProgress] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    fetch("/kjv.json")
      .then(r => r.json())
      .then(data => {
        setBible(data);
        setLoading(false);
      })
      .catch(e => {
        console.error("Failed to load bible data", e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-10 h-10 text-pink-400 animate-spin" />
      </div>
    );
  }

  if (!bible) return <div className="p-10 text-center text-red-500">Failed to load Bible data.</div>;

  const otBooks = bible.slice(0, OT_COUNT);
  const ntBooks = bible.slice(OT_COUNT);
  const filteredBooks = testament === "old" ? otBooks : ntBooks;
  const globalIndex = testament === "old" ? selectedBookIndex : selectedBookIndex + OT_COUNT;
  const currentBook = bible[globalIndex];
  const currentChapter = currentBook.chapters[selectedChapterIndex];

  async function handleMarkAsRead() {
    setLoggingProgress(true);
    const res = await logReading({
      testament: globalIndex < OT_COUNT ? "Old Testament" : "New Testament",
      book: currentBook.name,
      chapter: selectedChapterIndex + 1,
    });
    setLoggingProgress(false);
    if (res.success) {
      setLogged(true);
      setTimeout(() => setLogged(false), 3000);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen w-full relative">
      {/* Reader Nav */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-pink-100 dark:border-slate-700 p-4 sticky top-0 z-10 flex flex-col gap-4">
        {/* Testament Toggle */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => { setTestament("old"); setSelectedBookIndex(0); setSelectedChapterIndex(0); setLogged(false); }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              testament === "old"
                ? "bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-md shadow-pink-300/30"
                : "bg-pink-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-pink-100"
            }`}
          >
            Old Testament
          </button>
          <button
            onClick={() => { setTestament("new"); setSelectedBookIndex(0); setSelectedChapterIndex(0); setLogged(false); }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              testament === "new"
                ? "bg-gradient-to-r from-blue-400 to-sky-500 text-white shadow-md shadow-blue-300/30"
                : "bg-blue-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-100"
            }`}
          >
            New Testament
          </button>
        </div>

        {/* Book + Chapter Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <select 
              value={selectedBookIndex}
              onChange={(e) => {
                setSelectedBookIndex(Number(e.target.value));
                setSelectedChapterIndex(0);
                setLogged(false);
              }}
              className="px-3 py-2 bg-pink-50 dark:bg-slate-700 border border-pink-100 dark:border-slate-600 rounded-xl font-medium outline-none appearance-none cursor-pointer text-slate-700 dark:text-white"
            >
              {filteredBooks.map((b, i) => (
                <option key={b.name} value={i}>{b.name}</option>
              ))}
            </select>
            <ChevronRight className="w-4 h-4 text-pink-300" />
            <select 
              value={selectedChapterIndex}
              onChange={(e) => {
                setSelectedChapterIndex(Number(e.target.value));
                setLogged(false);
              }}
              className="px-3 py-2 bg-blue-50 dark:bg-slate-700 border border-blue-100 dark:border-slate-600 rounded-xl font-medium outline-none appearance-none cursor-pointer text-slate-700 dark:text-white"
            >
              {currentBook.chapters.map((_, i) => (
                <option key={i} value={i}>Ch. {i + 1}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleMarkAsRead}
            disabled={loggingProgress || logged}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all ${
              logged 
                ? "bg-green-50 text-green-600 border border-green-200" 
                : "bg-gradient-to-r from-pink-400 to-rose-500 text-white hover:from-pink-500 hover:to-rose-600 shadow-md shadow-pink-300/20"
            }`}
          >
            {loggingProgress ? <Loader2 className="w-5 h-5 animate-spin" /> 
             : logged ? <><CheckCircle2 className="w-5 h-5" /> Completed</>
             : <><CheckCircle2 className="w-5 h-5" /> Mark as Read</>
            }
          </button>
        </div>
      </div>

      {/* Reader Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-16 lg:px-32 relative scroll-smooth selection:bg-pink-200 dark:selection:bg-pink-900">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-12 text-center font-serif text-slate-800 dark:text-white tracking-tight">
            {currentBook.name} {selectedChapterIndex + 1}
          </h1>
          
          <div className="space-y-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-serif">
            {currentChapter.map((verseText, vIndex) => (
              <p key={vIndex} className="group relative">
                <sup className="text-sm font-semibold text-pink-400 dark:text-pink-400 mr-2 -top-1 opacity-70 group-hover:opacity-100 transition-opacity select-none">
                  {vIndex + 1}
                </sup>
                {verseText}
              </p>
            ))}
          </div>
          
          <div className="mt-16 pt-8 border-t border-pink-100 dark:border-slate-700 flex justify-between">
            <button 
              disabled={selectedChapterIndex === 0}
              onClick={() => setSelectedChapterIndex(prev => prev - 1)}
              className="px-4 py-2 text-slate-400 hover:text-pink-500 font-medium disabled:opacity-30 flex items-center transition-colors"
            >
              Previous
            </button>
            <button 
              disabled={selectedChapterIndex === currentBook.chapters.length - 1}
              onClick={() => {
                setSelectedChapterIndex(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-pink-50 dark:bg-slate-700 hover:bg-pink-100 dark:hover:bg-slate-600 text-slate-700 dark:text-pink-300 font-medium rounded-xl flex items-center transition-colors"
            >
              Next Chapter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
