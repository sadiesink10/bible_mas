"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, BookOpen, Loader2 } from "lucide-react";
import { logReading } from "@/app/actions/reading";

type BibleData = { abbrev: string; chapters: string[][]; name: string; }[];

export default function BibleReader() {
  const [bible, setBible] = useState<BibleData | null>(null);
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
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!bible) return <div className="p-10 text-center text-red-500">Failed to load Bible data.</div>;

  const currentBook = bible[selectedBookIndex];
  const currentChapter = currentBook.chapters[selectedChapterIndex];

  async function handleMarkAsRead() {
    setLoggingProgress(true);
    const res = await logReading({
      testament: selectedBookIndex < 39 ? "Old Testament" : "New Testament",
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
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 sticky top-0 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <select 
            value={selectedBookIndex}
            onChange={(e) => {
              setSelectedBookIndex(Number(e.target.value));
              setSelectedChapterIndex(0);
              setLogged(false);
            }}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl font-medium outline-none appearance-none cursor-pointer"
          >
            {bible.map((b, i) => (
              <option key={b.name} value={i}>{b.name}</option>
            ))}
          </select>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <select 
            value={selectedChapterIndex}
            onChange={(e) => {
              setSelectedChapterIndex(Number(e.target.value));
              setLogged(false);
            }}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl font-medium outline-none appearance-none cursor-pointer"
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
              ? "bg-green-100 text-green-700 border border-green-200" 
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
          }`}
        >
          {loggingProgress ? <Loader2 className="w-5 h-5 animate-spin" /> 
           : logged ? <><CheckCircle2 className="w-5 h-5" /> Completed</>
           : <><CheckCircle2 className="w-5 h-5" /> Mark as Read</>
          }
        </button>
      </div>

      {/* Reader Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-16 lg:px-32 relative scroll-smooth selection:bg-indigo-200 dark:selection:bg-indigo-900">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-12 text-center font-serif text-gray-900 dark:text-gray-100 tracking-tight">
            {currentBook.name} {selectedChapterIndex + 1}
          </h1>
          
          <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-serif">
            {currentChapter.map((verseText, vIndex) => (
              <p key={vIndex} className="group relative">
                <sup className="text-sm font-semibold text-indigo-500 dark:text-indigo-400 mr-2 -top-1 opacity-70 group-hover:opacity-100 transition-opacity select-none">
                  {vIndex + 1}
                </sup>
                {verseText}
              </p>
            ))}
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between">
            <button 
              disabled={selectedChapterIndex === 0}
              onClick={() => setSelectedChapterIndex(prev => prev - 1)}
              className="px-4 py-2 text-gray-500 hover:text-indigo-600 font-medium disabled:opacity-30 flex items-center"
            >
              Previous
            </button>
            <button 
              disabled={selectedChapterIndex === currentBook.chapters.length - 1}
              onClick={() => {
                setSelectedChapterIndex(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-700 dark:text-indigo-300 font-medium rounded-xl flex items-center transition-colors"
            >
              Next Chapter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
