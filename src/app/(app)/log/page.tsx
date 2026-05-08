"use client";

import { useState } from "react";
import { PlusCircle, Loader2, Award } from "lucide-react";
import { motion } from "framer-motion";
import { logReading } from "@/app/actions/reading";

const BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];

export default function LogReadingPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const book = formData.get("book") as string;
    const chapter = formData.get("chapter") as string;
    const startVerse = formData.get("startVerse") as string;
    const endVerse = formData.get("endVerse") as string;
    const testament = BIBLE_BOOKS.indexOf(book) < 39 ? "Old Testament" : "New Testament";

    const res = await logReading({
      testament,
      book,
      chapter: parseInt(chapter),
      startVerse: startVerse ? parseInt(startVerse) : undefined,
      endVerse: endVerse ? parseInt(endVerse) : undefined,
    });

    setLoading(false);
    if (res.error) {
      setMessage({ type: "error", text: res.error });
    } else {
      setMessage({ type: "success", text: `Success! You earned +${res.pointsEarned} Jesus Points!` });
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7c9a72] to-[#5e7d54]">
          Log Offline Reading
        </h1>
        <p className="text-[#7a7a7a] dark:text-[#9e9b93] mt-2">
          Read from your physical Bible? Log your progress here to keep your streak alive and earn points.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] rounded-3xl p-6 md:p-8 shadow-sm"
      >
        {message && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`p-4 rounded-2xl mb-6 text-sm flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-600 border border-green-200 dark:bg-green-900/20 dark:border-green-800/50' 
                : 'bg-red-50 text-red-500 border border-red-200 dark:bg-red-900/20 dark:border-red-800/50'
            }`}
          >
            {message.type === 'success' ? <Award className="w-5 h-5" /> : null}
            <span className="font-medium">{message.text}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#6b6b6b] dark:text-[#b0ada5] mb-2">Book</label>
              <select 
                name="book" 
                required
                defaultValue=""
                className="w-full pl-4 pr-10 py-3 bg-[#eef3ed]/50 dark:bg-[#1e2126]/50 border border-[#e5dfd5] dark:border-[#363940] rounded-2xl focus:ring-2 focus:ring-[#7c9a72] focus:border-[#7c9a72] transition-all outline-none appearance-none text-[#4a4a4a] dark:text-white"
              >
                <option value="" disabled>Select a book</option>
                <optgroup label="📜 Old Testament">
                  {BIBLE_BOOKS.slice(0, 39).map(b => <option key={b} value={b}>{b}</option>)}
                </optgroup>
                <optgroup label="✝️ New Testament">
                  {BIBLE_BOOKS.slice(39).map(b => <option key={b} value={b}>{b}</option>)}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#6b6b6b] dark:text-[#b0ada5] mb-2">Chapter</label>
              <input 
                type="number" 
                name="chapter" 
                min="1" 
                required
                className="w-full px-4 py-3 bg-[#e8f0f5]/50 dark:bg-[#1e2126]/50 border border-[#e5dfd5] dark:border-[#363940] rounded-2xl focus:ring-2 focus:ring-[#6a9ab8] focus:border-[#6a9ab8] transition-all outline-none text-[#4a4a4a] dark:text-white"
                placeholder="e.g. 3"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#f0ece3] dark:border-[#363940]">
            <label className="block text-sm font-medium text-[#9a9a9a] dark:text-[#6b6860] mb-4">Verses (Optional)</label>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="number" 
                name="startVerse" 
                min="1"
                className="w-full px-4 py-3 bg-[#f5f0e8]/30 dark:bg-[#1e2126]/50 border border-[#e5dfd5] dark:border-[#363940] rounded-xl focus:ring-2 focus:ring-[#7c9a72] focus:border-[#7c9a72] transition-all outline-none text-[#4a4a4a] dark:text-white"
                placeholder="Start"
              />
              <input 
                type="number" 
                name="endVerse" 
                min="1"
                className="w-full px-4 py-3 bg-[#f5f0e8]/30 dark:bg-[#1e2126]/50 border border-[#e5dfd5] dark:border-[#363940] rounded-xl focus:ring-2 focus:ring-[#7c9a72] focus:border-[#7c9a72] transition-all outline-none text-[#4a4a4a] dark:text-white"
                placeholder="End"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center py-4 px-4 rounded-2xl text-white bg-gradient-to-r from-[#7c9a72] to-[#5e7d54] hover:from-[#6d8b63] hover:to-[#4f6e45] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c9a72] transition-all shadow-lg shadow-[#7c9a72]/20 disabled:opacity-70 mt-8 font-semibold text-lg"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                <PlusCircle className="mr-2 w-6 h-6" />
                Log Reading
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
