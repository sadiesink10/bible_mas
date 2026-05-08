"use client";

import { useState, useEffect } from "react";
import { Heart, Lock, X, KeyRound } from "lucide-react";

export function CreatorNote({ compact = false }: { compact?: boolean }) {
  const [showLock, setShowLock] = useState(false);
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code === "160601") {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setCode("");
    }
  }

  if (!showLock && !unlocked) {
    return (
      <button
        onClick={() => setShowLock(true)}
        className={compact
          ? "flex flex-col items-center justify-center text-[#9a9a9a] hover:text-red-400 transition-colors space-y-0.5"
          : "inline-flex items-center gap-1.5 text-sm text-[#c8c4bc] dark:text-[#6b6860] hover:text-[#c4956a] transition-all hover:scale-110 mx-auto"
        }
      >
        <Heart className={compact ? "w-5 h-5 fill-current text-red-400 animate-pulse" : "w-4 h-4 fill-current text-red-400 hover:text-red-500 animate-pulse"} />
        {compact ? <span className="text-[9px] font-semibold leading-tight">🤍</span> : <span>Made with</span>}
      </button>
    );
  }

  if (showLock && !unlocked) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className={`bg-white dark:bg-[#252830] rounded-3xl p-8 max-w-sm w-full border border-[#e5dfd5] dark:border-[#363940] shadow-2xl relative ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}>
          <button onClick={() => { setShowLock(false); setCode(""); setError(false); }} className="absolute top-4 right-4 text-[#9a9a9a] hover:text-[#3d3d3d] dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f0ece3] to-[#e8dcc8] dark:from-[#3a3028] dark:to-[#302818] flex items-center justify-center mb-4">
              <Lock className="w-7 h-7 text-[#c4956a]" />
            </div>
            <h3 className="text-lg font-bold text-[#3d3d3d] dark:text-white">Private Note</h3>
            <p className="text-xs text-[#9a9a9a] mt-1">Enter the passcode to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 justify-center mb-4">
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all ${
                  code[i]
                    ? "border-[#c4956a] bg-[#f0ece3] dark:bg-[#3a3028] text-[#c4956a]"
                    : error
                    ? "border-red-300 dark:border-red-800"
                    : "border-[#e5dfd5] dark:border-[#363940] text-[#9a9a9a]"
                }`}>
                  {code[i] ? "•" : ""}
                </div>
              ))}
            </div>
            <input
              type="tel"
              value={code}
              onChange={e => { setCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(false); }}
              className="sr-only"
              autoFocus
              inputMode="numeric"
              pattern="[0-9]*"
            />
            {error && <p className="text-xs text-red-500 text-center mb-3">Incorrect passcode</p>}
            <button
              type="submit"
              disabled={code.length !== 6}
              className="w-full py-3 bg-gradient-to-r from-[#c4956a] to-[#a87d55] text-white rounded-2xl font-semibold disabled:opacity-40 transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Unlocked — show the note
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-[#faf8f5] dark:bg-[#1e2126] rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-[#e5dfd5] dark:border-[#363940] shadow-2xl">
        <div className="sticky top-0 bg-[#faf8f5]/95 dark:bg-[#1e2126]/95 backdrop-blur-sm p-5 pb-3 border-b border-[#e5dfd5]/50 dark:border-[#363940]/50 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#c4956a]" />
            <h2 className="text-lg font-bold text-[#3d3d3d] dark:text-white">Note from the Creator</h2>
          </div>
          <button onClick={() => { setUnlocked(false); setShowLock(false); setCode(""); }} className="text-[#9a9a9a] hover:text-[#3d3d3d] dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm leading-relaxed text-[#4a4a4a] dark:text-[#c8c4bc]">
          <p className="italic text-[#7a7a7a] dark:text-[#9e9b93]">
            I know this app may look like just another project to everyone else… but honestly, this was a selfish act of love from me.
          </p>
          <p>
            I built this app for <em className="text-[#c4956a] font-semibold not-italic">her</em> — for the woman God is preparing for me, for my future wife, my answered prayer, my side rib.
          </p>
          <p>
            Some people write letters, some buy flowers… but I built something that could carry my prayers when my hands cannot physically hold yours yet.
          </p>
          <p>
            Reading for you, praying for you, thinking about you — somehow it became my favorite hobby. And honestly… <span className="text-[#c4956a] font-medium">I love it.</span>
          </p>
          <p className="italic text-[#7a7a7a] dark:text-[#9e9b93]">
            And truthfully, I'm not even a very religious guy…
          </p>
          <p>
            but I always dreamed of holding your hand, visiting churches together, sitting beside you, and reading the Bible with you in silence while the world slowed down around us.
          </p>
          <p>
            Not because religion made me do it… but because <span className="text-[#c4956a] font-medium">love</span> made me want those moments with you.
          </p>

          <div className="my-6 border-t border-[#e5dfd5] dark:border-[#363940]" />

          <p className="font-semibold text-[#3d3d3d] dark:text-white">To the woman of Proverbs 31,</p>
          <p>
            I loved you before I even knew your name.<br />
            I prayed for you before I ever knew your presence.<br />
            Before our paths crossed, before our eyes met, before our story began — my heart was already asking God for you.
          </p>
          <p>
            And until the day I finally meet you, I hope every prayer reaches you where my hands cannot.
          </p>

          <div className="my-6 border-t border-[#e5dfd5] dark:border-[#363940]" />

          <p>
            So to everyone using this app, I have only one request:<br />
            <span className="font-semibold text-[#5e7d54] dark:text-[#8fb585]">Please don't pray for me… pray for my girlfriend, my future wife, my future family, my side rib.</span>
          </p>

          <div className="my-6 border-t border-[#e5dfd5] dark:border-[#363940]" />

          <p className="font-semibold text-[#3d3d3d] dark:text-white">And to my Proverbs 31 woman,</p>
          <p className="text-[#9b8dc0] font-medium italic">I dedicate to you Song of Solomon 1–7.</p>

          <div className="mt-6 p-4 bg-[#eef3ed] dark:bg-[#2d3038] rounded-2xl space-y-1.5 text-[#5e7d54] dark:text-[#8fb585] font-medium text-sm">
            <p>🍽️ Eat well.</p>
            <p>💧 Drink lots of water.</p>
            <p>🙏 Pray more.</p>
            <p>🤝 Help people in need.</p>
          </div>

          <p className="text-center text-sm text-[#7a7a7a] dark:text-[#9e9b93] pt-4">
            And never forget that somewhere in this world, there is a man thanking God for your existence every single day. <span className="text-lg">🤍</span>
          </p>
        </div>
      </div>
    </div>
  );
}
