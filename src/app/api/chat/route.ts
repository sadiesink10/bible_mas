import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

// Cache Bible data in memory
let bibleCache: any[] | null = null;
async function loadBible() {
  if (bibleCache) return bibleCache;
  const filePath = path.join(process.cwd(), "public", "kjv.json");
  const data = await readFile(filePath, "utf-8");
  bibleCache = JSON.parse(data);
  return bibleCache!;
}
const VERSES: Record<string, string> = {
  "john 3:16": `🕊️ **John 3:16** — "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."\n\nThis is the heart of the Gospel:\n• **God's love** — universal, for the whole world\n• **God's gift** — sacrificial, His only Son\n• **God's promise** — eternal life through faith\n\nSalvation is not earned — it's received by believing. 💛`,

  "john 3:17": `📖 **John 3:17** — "For God sent not his Son into the world to condemn the world; but that the world through him might be saved."\n\nJesus didn't come to judge — He came to rescue. God's heart is always redemption, not condemnation. 🙏`,

  "john 14:6": `✝️ **John 14:6** — "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me."\n\nJesus claims to be:\n• **The Way** — the only path to God\n• **The Truth** — absolute reality\n• **The Life** — the source of eternal life\n\nThis is one of the most definitive statements Jesus made about Himself. 🌟`,

  "john 14:27": `🕊️ **John 14:27** — "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid."\n\nJesus offers a peace that the world cannot give — it transcends circumstances. 💛`,

  "john 1:1": `📖 **John 1:1** — "In the beginning was the Word, and the Word was with God, and the Word was God."\n\nThis verse reveals:\n• Jesus (the Word) existed from eternity\n• He was with God — in relationship\n• He was God — fully divine\n\nThe opening of John's Gospel echoes Genesis 1:1. 🌟`,

  "john 11:35": `😢 **John 11:35** — "Jesus wept."\n\nThe shortest verse in the Bible, yet one of the most powerful. Jesus wept at Lazarus' tomb — showing that God feels our pain deeply. He is not distant; He grieves with us. 💛`,

  "john 15:13": `❤️ **John 15:13** — "Greater love hath no man than this, that a man lay down his life for his friends."\n\nJesus modeled the ultimate love — sacrificial, selfless, complete. This is the standard of love we're called to. 🙏`,

  "john 19:23": `📖 **John 19:23-24** — "Then the soldiers, when they had crucified Jesus, took his garments, and made four parts, to every soldier a part; and also his coat: now the coat was without seam, woven from the top throughout. They said therefore among themselves, Let us not rend it, but cast lots for it, whose it shall be: that the scripture might be fulfilled."\n\nThis happened at the crucifixion:\n• The Roman soldiers divided Jesus' clothing\n• His seamless tunic was gambled for, fulfilling Psalm 22:18\n• Even in His darkest hour, prophecy was being fulfilled\n\nThis shows that nothing — not even the cruelty of the cross — was outside God's sovereign plan. 🙏✝️`,

  "john 19:30": `✝️ **John 19:30** — "When Jesus therefore had received the vinegar, he said, It is finished: and he bowed his head, and gave up the ghost."\n\n"It is finished" (Tetelestai) means:\n• The debt of sin is PAID IN FULL\n• The work of salvation is COMPLETE\n• Nothing more needs to be added\n\nThree of the most powerful words ever spoken. 🙏`,

  "psalm 23": `🐑 **Psalm 23** — The Shepherd's Psalm\n\n"The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul..."\n\nDavid paints God as:\n• **Provider** — "I shall not want"\n• **Comforter** — "He restoreth my soul"\n• **Protector** — "I will fear no evil"\n• **Host** — "Thou preparest a table before me"\n\nNo matter your valley, the Shepherd walks with you. 🙏`,

  "psalm 91": `🛡️ **Psalm 91** — The Psalm of Protection\n\n"He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty."\n\nThis psalm promises:\n• God is your refuge and fortress (v.2)\n• He covers you with His feathers (v.4)\n• No evil shall befall you (v.10)\n• Angels guard your steps (v.11)\n• When you call, He answers (v.15)\n\nA powerful psalm to pray over yourself and loved ones. 🙏`,

  "psalm 46:10": `🕊️ **Psalm 46:10** — "Be still, and know that I am God."\n\nIn the chaos of life, God invites us to:\n• **Be still** — stop striving, stop worrying\n• **Know** — trust deeply, with certainty\n• **That I am God** — He is sovereign over everything\n\nSometimes the most powerful thing you can do is simply rest in His presence. 💛`,

  "psalm 139": `🌟 **Psalm 139** — God Knows You Completely\n\n"O LORD, thou hast searched me, and known me. Thou knowest my downsitting and mine uprising, thou understandest my thought afar off."\n\nKey truths:\n• God knows everything about you (v.1-6)\n• You cannot escape His presence (v.7-12)\n• You are fearfully and wonderfully made (v.14)\n• He saw you before you were born (v.16)\n\nYou are not an accident — you are God's masterpiece. 💛`,

  "romans 8:28": `✨ **Romans 8:28** — "And we know that all things work together for good to them that love God, to them who are the called according to his purpose."\n\nThis doesn't say all things ARE good — but they WORK TOGETHER for good. Even your hardest season is being woven into something beautiful. 🌟`,

  "romans 8:38": `💛 **Romans 8:38-39** — "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord."\n\nNOTHING can separate you from God's love. Nothing. 🙏`,

  "jeremiah 29:11": `🌅 **Jeremiah 29:11** — "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end."\n\nGod has plans for you — plans for peace, hope, and a future. Your current chapter is not your final chapter. 🙏`,

  "philippians 4:13": `💪 **Philippians 4:13** — "I can do all things through Christ which strengtheneth me."\n\nPaul wrote this from prison! It's about divine strength in every circumstance — not superhuman ability, but Christ's power flowing through your weakness. 🔥`,

  "proverbs 3:5": `🧭 **Proverbs 3:5-6** — "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths."\n\nWhen life is confusing, choose trust over worry. God sees the full picture. 🌟`,

  "proverbs 31": `👑 **Proverbs 31:10-31** — The Virtuous Woman\n\n"Who can find a virtuous woman? for her price is far above rubies."\n\nShe is described as:\n• Trustworthy (v.11) • Hardworking (v.13-19)\n• Generous (v.20) • Wise (v.26)\n• Feared of the LORD (v.30)\n\n"Favour is deceitful, and beauty is vain: but a woman that feareth the LORD, she shall be praised." 🌸`,

  "genesis 1": `🌍 **Genesis 1** — The Creation\n\n"In the beginning God created the heaven and the earth."\n\nSeven days:\n• Day 1: Light • Day 2: Sky\n• Day 3: Land & vegetation • Day 4: Sun, moon, stars\n• Day 5: Sea creatures & birds • Day 6: Animals & humanity\n• Day 7: God rested\n\n"And God saw every thing that he had made, and, behold, it was very good." 🙏`,

  "matthew 5": `⛰️ **Matthew 5** — Sermon on the Mount\n\nThe Beatitudes:\n• Blessed are the poor in spirit, the meek, the merciful, the peacemakers...\n\nKey teachings:\n• "Ye are the salt of the earth" (5:13)\n• "Love your enemies" (5:44)\n• "Turn the other cheek" (5:39)\n\nJesus laid out a radically different way of living. 🌟`,

  "matthew 6:34": `🌅 **Matthew 6:34** — "Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof."\n\nJesus says: don't borrow tomorrow's worries. Focus on today. God's got tomorrow covered. 💛`,

  "matthew 28:20": `🌟 **Matthew 28:20** — "Lo, I am with you always, even unto the end of the world."\n\nJesus' final promise — He never leaves. In every season, every struggle, every joy — He is there. 🙏`,

  "1 corinthians 13": `💕 **1 Corinthians 13:4-7** — The Love Chapter\n\n"Love suffereth long, and is kind; love envieth not; love vaunteth not itself, is not puffed up, doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; rejoiceth not in iniquity, but rejoiceth in the truth; beareth all things, believeth all things, hopeth all things, endureth all things."\n\nThis is the standard of love — patient, kind, selfless. 🌟`,

  "isaiah 40:31": `🦅 **Isaiah 40:31** — "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint."\n\nWaiting on God isn't passive — it's trusting actively. And the reward is supernatural strength. 🔥`,

  "isaiah 41:10": `💪 **Isaiah 41:10** — "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness."\n\nThree promises: I will strengthen you. I will help you. I will uphold you. 🙏`,

  "ephesians 2:8": `✝️ **Ephesians 2:8-9** — "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast."\n\nSalvation is:\n• By GRACE — God's unmerited favor\n• Through FAITH — not works\n• A GIFT — you can't earn it\n\nThis is the beauty of the Gospel. 🕊️`,

  "revelation 21:4": `🌈 **Revelation 21:4** — "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away."\n\nThe ultimate promise — a day is coming when every tear, every pain, every loss will be erased forever. Hold on to this hope. 💛`,

  "song of solomon 1": `🌹 **Song of Solomon 1-7** — The Song of Love\n\nThis book is a poetic celebration of love between a bridegroom and his bride:\n\n• Ch 1-2: The beloved speaks of her lover with admiration\n• Ch 3: She searches for him and finds him\n• Ch 4: He describes her beauty — "Thou art all fair, my love; there is no spot in thee"\n• Ch 5: The beloved opens the door but he has gone\n• Ch 6: "I am my beloved's, and my beloved is mine"\n• Ch 7: "How fair and how pleasant art thou, O love, for delights!"\n\nThis book celebrates love as God designed it — passionate, faithful, beautiful. Many see it as a picture of Christ's love for His church. 🤍`,
};

// Topic responses
const TOPICS: Record<string, string> = {
  peace: `🕊️ **Finding Peace**\n\n"Peace I leave with you, my peace I give unto you." — John 14:27\n\nKey verses:\n• Philippians 4:6-7 — Pray, and God's peace will guard your heart\n• Isaiah 26:3 — Perfect peace for those who trust\n• Psalm 46:10 — "Be still, and know that I am God"\n\nGod's peace isn't the absence of storms — it's His presence IN the storm. 💛`,
  anxiety: `🤗 **Overcoming Anxiety**\n\n"Cast all your anxiety on him because he cares for you." — 1 Peter 5:7\n\n• Matthew 6:25-34 — Don't worry about tomorrow\n• Philippians 4:6-7 — Prayer is the antidote\n• Isaiah 41:10 — "Fear not; I am with thee"\n\nIt's okay to feel anxious — bring it honestly to God. You are held. 💛`,
  forgiveness: `❤️ **Forgiveness**\n\n"If we confess our sins, he is faithful and just to forgive us." — 1 John 1:9\n\n• Psalm 103:12 — He removes sin as far as east from west\n• Ephesians 4:32 — Forgive as God forgave you\n• Matthew 6:14 — Forgiving others frees YOU\n\nForgiveness releases the burden to God. 🙏`,
  love: `💕 **What the Bible Says About Love**\n\n"God is love." — 1 John 4:16\n\n• 1 Corinthians 13:4-7 — Love is patient, kind, enduring\n• Romans 8:38-39 — Nothing separates us from God's love\n• John 15:13 — Greatest love = laying down your life\n• Jeremiah 31:3 — "I have loved thee with an everlasting love"\n\nYou are deeply, unconditionally loved. 🌟`,
  strength: `💪 **Finding Strength**\n\n"They that wait upon the LORD shall renew their strength." — Isaiah 40:31\n\n• Philippians 4:13 — "I can do all things through Christ"\n• 2 Corinthians 12:9 — "My strength is made perfect in weakness"\n• Psalm 46:1 — God is a very present help in trouble\n\nLet God be your strength today. 🔥`,
  faith: `⛪ **Growing in Faith**\n\n"Faith is the substance of things hoped for." — Hebrews 11:1\n\n• Romans 10:17 — Faith comes by hearing God's Word\n• Mark 9:24 — "Lord, I believe; help mine unbelief"\n• Hebrews 11 — The Hall of Faith heroes\n\nFaith isn't the absence of doubt — it's choosing to trust despite doubt. 🙏`,
  prayer: `🙏 **About Prayer**\n\n"Ask, and it shall be given you." — Matthew 7:7\n\nThe Lord's Prayer pattern (Matthew 6:9-13):\n1. Worship — "Hallowed be thy name"\n2. Surrender — "Thy will be done"\n3. Ask — "Give us our daily bread"\n4. Confess — "Forgive us our debts"\n5. Protection — "Lead us not into temptation"\n\nPrayer isn't about perfect words — it's about an honest heart. 💛`,
  salvation: `✝️ **The Gospel**\n\n"By grace are ye saved through faith." — Ephesians 2:8\n\nThe Romans Road:\n1. Romans 3:23 — All have sinned\n2. Romans 6:23 — Wages of sin is death, but gift is eternal life\n3. Romans 5:8 — Christ died for us while we were sinners\n4. Romans 10:9 — Confess and believe = saved\n5. Romans 10:13 — Whoever calls on the Lord SHALL be saved\n\nSalvation is a free gift. 🕊️`,
  suffering: `💔 **In Times of Suffering**\n\n"Weeping may endure for a night, but joy cometh in the morning." — Psalm 30:5\n\n• Romans 8:28 — God works all things for good\n• Psalm 34:18 — The LORD is near the brokenhearted\n• 2 Corinthians 4:17 — Momentary affliction → eternal glory\n• John 11:35 — Jesus wept. He feels your pain.\n\nYour pain is not the end of your story. 🙏`,
};

function parseVerseRef(text: string): string | null {
  const lower = text.toLowerCase().replace(/['']/g, "'").trim();
  // Normalize: "john 19 23" → "john 19:23", "1 corinthians 13" stays
  // Handle patterns like "john 3 16", "john 3:16", "psalm 23", "genesis 1"
  const bookMap: Record<string, string> = {
    gen: "genesis", ex: "exodus", lev: "leviticus", num: "numbers", deut: "deuteronomy",
    josh: "joshua", judg: "judges", ruth: "ruth", "1 sam": "1 samuel", "2 sam": "2 samuel",
    "1 kings": "1 kings", "2 kings": "2 kings", "1 chr": "1 chronicles", "2 chr": "2 chronicles",
    neh: "nehemiah", esth: "esther", ps: "psalm", psa: "psalm", prov: "proverbs",
    eccl: "ecclesiastes", song: "song of solomon", isa: "isaiah", jer: "jeremiah",
    lam: "lamentations", ezek: "ezekiel", dan: "daniel", hos: "hosea", joel: "joel",
    amos: "amos", obad: "obadiah", jon: "jonah", mic: "micah", nah: "nahum",
    hab: "habakkuk", zeph: "zephaniah", hag: "haggai", zech: "zechariah", mal: "malachi",
    matt: "matthew", mat: "matthew", mk: "mark", lk: "luke", jn: "john",
    acts: "acts", rom: "romans", "1 cor": "1 corinthians", "2 cor": "2 corinthians",
    gal: "galatians", eph: "ephesians", phil: "philippians", col: "colossians",
    "1 thess": "1 thessalonians", "2 thess": "2 thessalonians",
    "1 tim": "1 timothy", "2 tim": "2 timothy", tit: "titus", phlm: "philemon",
    heb: "hebrews", jas: "james", "1 pet": "1 peter", "2 pet": "2 peter",
    "1 jn": "1 john", "2 jn": "2 john", "3 jn": "3 john", jude: "jude", rev: "revelation",
  };

  // Try to match: [book] [chapter] [verse] or [book] [chapter]:[verse]
  const verseMatch = lower.match(/^(?:what (?:does|is|about) )?(?:the )?(\d?\s?[a-z]+(?:\s+of\s+[a-z]+)?)\s+(\d+)[\s:]+(\d+)/);
  if (verseMatch) {
    let book = verseMatch[1].trim();
    for (const [abbr, full] of Object.entries(bookMap)) {
      if (book === abbr || book.startsWith(abbr + " ")) { book = full; break; }
    }
    return `${book} ${verseMatch[2]}:${verseMatch[3]}`;
  }

  // Just book + chapter: "psalm 23", "genesis 1"
  const chapterMatch = lower.match(/^(?:what (?:does|is|about) )?(?:the )?(\d?\s?[a-z]+(?:\s+of\s+[a-z]+)?)\s+(\d+)$/);
  if (chapterMatch) {
    let book = chapterMatch[1].trim();
    for (const [abbr, full] of Object.entries(bookMap)) {
      if (book === abbr || book.startsWith(abbr + " ")) { book = full; break; }
    }
    return `${book} ${chapterMatch[2]}`;
  }

  return null;
}

// Extended topics
const MORE_TOPICS: Record<string, string> = {
  marriage: `💍 **Marriage & Relationships**\n\n"Whoso findeth a wife findeth a good thing, and obtaineth favour of the LORD." — Proverbs 18:22\n\nGod's design for marriage:\n• **Genesis 2:24** — "A man shall leave his father and mother, and shall cleave unto his wife"\n• **Ephesians 5:25** — "Husbands, love your wives, even as Christ loved the church"\n• **1 Corinthians 13:4-7** — Love is patient, love is kind\n• **Ecclesiastes 4:9** — "Two are better than one"\n• **Proverbs 31:10** — "Who can find a virtuous woman? For her price is far above rubies"\n\nWhether you're single, dating, or married — God has a beautiful plan for your love story. Trust His timing. 🤍`,

  patience: `⏳ **Patience & Waiting on God**\n\n"Wait on the LORD: be of good courage, and he shall strengthen thine heart." — Psalm 27:14\n\n• **Isaiah 40:31** — "They that wait upon the LORD shall renew their strength"\n• **James 1:4** — "Let patience have her perfect work, that ye may be perfect and entire"\n• **Psalm 37:7** — "Rest in the LORD, and wait patiently for him"\n• **Habakkuk 2:3** — "Though it tarry, wait for it; because it will surely come"\n• **Lamentations 3:25** — "The LORD is good unto them that wait for him"\n\nGod's delays are not denials. He's working even when you can't see it. 🌱`,

  purpose: `🎯 **Finding Your Purpose**\n\n"For we are his workmanship, created in Christ Jesus unto good works." — Ephesians 2:10\n\n• **Jeremiah 29:11** — God has plans for your hope and future\n• **Romans 8:28** — Everything works together for good\n• **Proverbs 3:5-6** — Trust Him and He directs your paths\n• **Psalm 139:16** — Your days were written before they began\n• **Esther 4:14** — "For such a time as this"\n\nYou are not an accident. God placed you here, right now, for a reason. Walk boldly into what He's called you to do. 🌟`,

  gratitude: `🙏 **Gratitude & Thanksgiving**\n\n"In every thing give thanks: for this is the will of God." — 1 Thessalonians 5:18\n\n• **Psalm 100:4** — "Enter into his gates with thanksgiving"\n• **Colossians 3:15** — "Be ye thankful"\n• **Psalm 136:1** — "O give thanks unto the LORD; for he is good"\n• **Philippians 4:6** — "With thanksgiving let your requests be made known"\n\nGratitude shifts your focus from what's missing to what's present. Start counting blessings — you'll lose count. 💛`,

  anger: `😤 **Dealing with Anger**\n\n"Be ye angry, and sin not: let not the sun go down upon your wrath." — Ephesians 4:26\n\n• **Proverbs 15:1** — "A soft answer turneth away wrath"\n• **James 1:19-20** — "Be swift to hear, slow to speak, slow to wrath"\n• **Proverbs 14:29** — "He that is slow to wrath is of great understanding"\n• **Psalm 37:8** — "Cease from anger, and forsake wrath"\n\nAnger isn't always sin — even Jesus was angry. But how we handle it matters. Breathe. Pray. Release it to God. 🕊️`,

  temptation: `⚔️ **Overcoming Temptation**\n\n"There hath no temptation taken you but such as is common to man." — 1 Corinthians 10:13\n\n• **James 4:7** — "Resist the devil, and he will flee from you"\n• **Matthew 26:41** — "Watch and pray, that ye enter not into temptation"\n• **Hebrews 2:18** — "He is able to succour them that are tempted"\n• **1 John 4:4** — "Greater is he that is in you, than he that is in the world"\n\nTemptation is not sin — giving in is. Jesus was tempted too (Matthew 4). You're stronger than you think. 💪`,

  wisdom: `🦉 **Seeking Wisdom**\n\n"If any of you lack wisdom, let him ask of God, that giveth to all men liberally." — James 1:5\n\n• **Proverbs 4:7** — "Wisdom is the principal thing; therefore get wisdom"\n• **Proverbs 9:10** — "The fear of the LORD is the beginning of wisdom"\n• **Colossians 3:16** — "Let the word of Christ dwell in you richly"\n• **Psalm 119:105** — "Thy word is a lamp unto my feet"\n\nWisdom isn't just knowledge — it's knowing how to apply truth to life. Read the Word daily and it becomes your compass. 📖`,

  family: `👨‍👩‍👧‍👦 **Family & Parenting**\n\n"As for me and my house, we will serve the LORD." — Joshua 24:15\n\n• **Proverbs 22:6** — "Train up a child in the way he should go"\n• **Ephesians 6:1-4** — Children obey, fathers provoke not\n• **Psalm 127:3** — "Children are an heritage of the LORD"\n• **Colossians 3:13** — "Forbearing one another, and forgiving one another"\n\nFamily is God's first institution. It's not always easy, but it's always worth investing in. 🏡`,

  loneliness: `🫂 **When You Feel Alone**\n\n"I will never leave thee, nor forsake thee." — Hebrews 13:5\n\n• **Psalm 68:6** — "God setteth the solitary in families"\n• **Deuteronomy 31:8** — "He will not fail thee, neither forsake thee"\n• **Matthew 28:20** — "Lo, I am with you always"\n• **Psalm 25:16** — "Turn thee unto me, and have mercy upon me; for I am desolate and afflicted"\n• **Isaiah 41:10** — "Fear thou not; for I am with thee"\n\nLoneliness is not a sign that God has left — sometimes it's an invitation to draw closer. You are never truly alone. 💛`,

  hope: `🌅 **Holding On to Hope**\n\n"Now the God of hope fill you with all joy and peace in believing." — Romans 15:13\n\n• **Jeremiah 29:11** — Plans for hope and a future\n• **Romans 5:5** — "Hope maketh not ashamed"\n• **Psalm 42:11** — "Hope thou in God"\n• **Lamentations 3:22-23** — "His mercies are new every morning"\n• **Hebrews 6:19** — "Hope as an anchor of the soul"\n\nHope is not wishful thinking — it's anchored in God's character. Your story isn't over. The best is yet to come. 🌈`,

  work: `💼 **Work & Money**\n\n"Whatsoever ye do, do it heartily, as to the Lord." — Colossians 3:23\n\n• **Proverbs 10:4** — "The hand of the diligent maketh rich"\n• **Matthew 6:33** — "Seek ye first the kingdom of God"\n• **Philippians 4:19** — "My God shall supply all your need"\n• **Proverbs 3:9** — "Honour the LORD with thy substance"\n• **1 Timothy 6:10** — "The love of money is the root of all evil"\n\nWork is worship when done for God's glory. He is your ultimate provider. 🙏`,
};

async function fetchBibleVerse(bookName: string, chapter: number, verse?: number): Promise<string | null> {
  try {
    const bible = await loadBible();
    // Find book (case-insensitive, handle psalms/psalm)
    const searchName = bookName.toLowerCase().replace("psalms", "psalm");
    const book = bible.find((b: any) => b.name.toLowerCase() === searchName || b.name.toLowerCase().replace("psalms", "psalm") === searchName);
    if (!book) return null;
    if (chapter < 1 || chapter > book.chapters.length) return null;
    
    const chapterVerses = book.chapters[chapter - 1];
    
    if (verse && verse > 0) {
      if (verse > chapterVerses.length) return null;
      return `📖 **${book.name} ${chapter}:${verse}** (KJV)\n\n"${chapterVerses[verse - 1]}"\n\nThis verse is from ${book.name}, chapter ${chapter}. 🙏`;
    }
    
    // Return first few verses of the chapter as a preview
    const preview = chapterVerses.slice(0, Math.min(5, chapterVerses.length));
    const versesText = preview.map((v: string, i: number) => `**${i + 1}.** ${v}`).join("\n\n");
    const remaining = chapterVerses.length - preview.length;
    
    return `📖 **${book.name} ${chapter}** (KJV)\n\n${versesText}${remaining > 0 ? `\n\n_...and ${remaining} more verses. Open "Read Bible" to read the full chapter!_` : ""}\n\nThis chapter has ${chapterVerses.length} verses total. 🙏`;
  } catch {
    return null;
  }
}

// Also handle verse ranges like "song of solomon 4 1-7"
function parseVerseRange(text: string): { book: string; chapter: number; startVerse: number; endVerse: number } | null {
  const lower = text.toLowerCase().replace(/['']/g, "'").trim();
  const rangeMatch = lower.match(/^(?:explain\s+(?:about\s+)?|what (?:does|is|about) )?(?:the )?([\d]?\s?[a-z]+(?:\s+of\s+[a-z]+)?)\s+(\d+)\s+(\d+)\s*[-–]\s*(\d+)/);
  if (rangeMatch) {
    let book = rangeMatch[1].trim();
    const bookMap: Record<string, string> = {
      gen: "genesis", ex: "exodus", lev: "leviticus", num: "numbers", deut: "deuteronomy",
      ps: "psalms", psa: "psalms", prov: "proverbs", song: "song of solomon",
      isa: "isaiah", jer: "jeremiah", matt: "matthew", mk: "mark", lk: "luke", jn: "john",
      rom: "romans", rev: "revelation",
    };
    for (const [abbr, full] of Object.entries(bookMap)) {
      if (book === abbr) { book = full; break; }
    }
    return { book, chapter: parseInt(rangeMatch[2]), startVerse: parseInt(rangeMatch[3]), endVerse: parseInt(rangeMatch[4]) };
  }
  return null;
}

async function fetchVerseRange(bookName: string, chapter: number, startVerse: number, endVerse: number): Promise<string | null> {
  try {
    const bible = await loadBible();
    const searchName = bookName.toLowerCase();
    const book = bible.find((b: any) => b.name.toLowerCase() === searchName);
    if (!book || chapter < 1 || chapter > book.chapters.length) return null;

    const chapterVerses = book.chapters[chapter - 1];
    const start = Math.max(1, startVerse);
    const end = Math.min(chapterVerses.length, endVerse);

    const selected = chapterVerses.slice(start - 1, end);
    const versesText = selected.map((v: string, i: number) => `**${start + i}.** ${v}`).join("\n\n");
    return `📖 **${book.name} ${chapter}:${start}-${end}** (KJV)\n\n${versesText}\n\n🙏`;
  } catch {
    return null;
  }
}

async function findResponse(userMessage: string, conversationHistory: string[] = []): Promise<string> {
  const lower = userMessage.toLowerCase().trim();

  // 0. Check for verse range like "song of solomon 4 1-7"
  const range = parseVerseRange(lower);
  if (range) {
    const result = await fetchVerseRange(range.book, range.chapter, range.startVerse, range.endVerse);
    if (result) return result;
  }

  // 1. Try parsing as a verse reference and fetch from REAL Bible data
  const ref = parseVerseRef(lower);
  if (ref) {
    // Parse "book chapter:verse" or "book chapter"
    const parts = ref.match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
    if (parts) {
      const bookName = parts[1];
      const chapter = parseInt(parts[2]);
      const verse = parts[3] ? parseInt(parts[3]) : undefined;
      
      // Try real Bible data first
      const realVerse = await fetchBibleVerse(bookName, chapter, verse);
      if (realVerse) return realVerse;
    }
    
    // Fall back to enriched hardcoded responses  
    if (VERSES[ref]) return VERSES[ref];
    const chapterOnly = ref.replace(/:\d+$/, "");
    if (VERSES[chapterOnly]) return VERSES[chapterOnly];
    for (const [key, val] of Object.entries(VERSES)) {
      if (key.startsWith(chapterOnly) || ref.startsWith(key)) return val;
    }
    
    return `📖 I couldn't find that exact reference. Try:\n• A specific verse like "John 3:16" or "Psalm 23:1"\n• A chapter like "Genesis 1" or "Romans 8"\n• A topic like "love", "faith", or "prayer"\n\nThe full Bible is available in the "Read Bible" section! 📖`;
  }

  // 2. Check if message contains a book name + chapter mentioned naturally
  // e.g. "explain about sin" won't match, but "tell me about genesis 3" will
  const naturalRef = lower.match(/(?:tell me about|explain|read|show me|what is|what does)\s+([\d]?\s?[a-z]+(?:\s+of\s+[a-z]+)?)\s+(\d+)(?:[:\s]+(\d+))?/);
  if (naturalRef) {
    const bookName = naturalRef[1].trim();
    const chapter = parseInt(naturalRef[2]);
    const verse = naturalRef[3] ? parseInt(naturalRef[3]) : undefined;
    const realVerse = await fetchBibleVerse(bookName, chapter, verse);
    if (realVerse) return realVerse;
  }

  // 3. Direct key lookup in hardcoded verses
  for (const [key, response] of Object.entries(VERSES)) {
    if (lower.includes(key)) return response;
  }

  // 4. Enhanced topic matching
  const topicMap: Record<string, string[]> = {
    peace: ["peace", "calm", "rest", "tranquil", "serene", "still", "quiet", "silence"],
    anxiety: ["anxiety", "anxious", "worried", "worry", "stress", "nervous", "fear", "afraid", "overwhelmed", "panic", "scared", "terrified"],
    forgiveness: ["forgive", "forgiveness", "guilt", "guilty", "ashamed", "shame", "regret", "sorry", "mistake"],
    love: ["love", "loved", "loving", "caring", "true love"],
    marriage: ["marriage", "marry", "married", "wife", "husband", "spouse", "wedding", "dating", "girlfriend", "boyfriend", "relationship", "romance", "romantic", "soulmate", "partner"],
    strength: ["strength", "strong", "weak", "tired", "exhausted", "give up", "hopeless", "can't go on", "burnout", "burned out"],
    faith: ["faith", "believe", "doubt", "trust", "uncertain", "unbelief"],
    prayer: ["prayer", "pray", "praying", "how to pray", "talk to god"],
    salvation: ["salvation", "saved", "born again", "gospel", "eternal life", "heaven", "hell", "repent", "baptism", "accept jesus"],
    suffering: ["suffering", "pain", "hurt", "struggle", "loss", "grief", "depressed", "depression", "sad", "death", "die", "dying", "funeral"],
    patience: ["patience", "patient", "waiting", "wait", "how long", "when will", "timing"],
    purpose: ["purpose", "calling", "destiny", "meaning", "why am i", "what should i", "direction", "confused about life", "lost in life"],
    gratitude: ["grateful", "gratitude", "thankful", "thanksgiving", "blessed", "blessings", "count"],
    anger: ["anger", "angry", "furious", "mad", "rage", "frustrated", "frustration", "annoyed", "irritated"],
    temptation: ["temptation", "tempted", "resist", "lust", "addicted", "addiction", "craving"],
    wisdom: ["wisdom", "wise", "decision", "choose", "discernment", "guidance", "confused"],
    family: ["family", "parent", "parents", "mother", "father", "children", "child", "son", "daughter", "sibling", "brother", "sister"],
    loneliness: ["lonely", "alone", "isolated", "nobody", "no friends", "no one", "friendless"],
    hope: ["hope", "hopeless", "no hope", "it's over", "done", "finished"],
    work: ["work", "job", "career", "money", "financial", "finances", "business", "salary", "debt", "broke"],
    sin: ["sin", "sinful", "sinning", "sinner", "transgression", "iniquity", "wickedness", "evil", "wrong"],
  };

  for (const [topic, keywords] of Object.entries(topicMap)) {
    if (keywords.some(kw => lower.includes(kw))) {
      if (TOPICS[topic]) return TOPICS[topic];
      if (MORE_TOPICS[topic]) return MORE_TOPICS[topic];
    }
  }

  // 5. Emotional crisis detection
  if (/kill myself|suicide|want to die|end it all|not worth living|self harm/i.test(lower)) {
    return `🤍 **Please hear this:** You are deeply loved, valued, and seen — by God and by people around you.\n\n"For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end." — Jeremiah 29:11\n\n🆘 **Please reach out for help:**\n• **988 Suicide & Crisis Lifeline** — Call or text **988**\n• **Crisis Text Line** — Text HOME to **741741**\n\nYour life matters. God is not done with your story. 💛`;
  }

  // 6. Greetings
  if (/^(hi|hello|hey|good morning|good evening|good night|greetings|yo|sup|what's up)/i.test(lower)) {
    return `Hello! 🌟 I'm Mini Pastor — connected to the full KJV Bible!\n\nYou can ask me:\n• 📖 **Any verse** — "John 3:16", "Genesis 1:1", "Psalm 23"\n• 📚 **Any chapter** — "Romans 8", "Matthew 5"\n• 📖 **Verse ranges** — "Song of Solomon 4 1-7"\n• 💬 **Topics** — love, faith, prayer, sin, marriage, anxiety\n• 💪 **Encouragement** — when you need strength\n\nWhat's on your heart? 💛`;
  }

  // 7. Thank you
  if (/thank|thanks|appreciate|blessed|amen/i.test(lower)) {
    return `You're so welcome! 🙏\n\n"Give thanks unto the LORD; for he is good." — Psalm 136:1\n\nKeep reading, keep praying, keep growing. God is with you! 💛🕊️`;
  }

  // 8. Who are you
  if (/who are you|what are you|what can you do|help me|how does this work/i.test(lower)) {
    return `🌟 **I'm Mini Pastor** — connected to the full KJV Bible!\n\nI can look up:\n📖 **Any verse** in the entire Bible (e.g., "John 3:16", "Genesis 1:1")\n📚 **Full chapters** (e.g., "Psalm 23", "Romans 8")\n📖 **Verse ranges** (e.g., "Song of Solomon 4 1-7")\n💬 **20+ topics** — love, marriage, sin, anxiety, forgiveness, patience, purpose, anger, hope, work, and more\n\nJust type your question! 💛`;
  }

  // 9. General Bible/spiritual question
  if (/bible|scripture|verse|god|jesus|christ|lord|church|sin|heaven|spirit|holy|worship|commandment/i.test(lower)) {
    return `🙏 Here are some key Scriptures:\n\n• **John 3:16** — God's love for the world\n• **Proverbs 3:5-6** — Trust in the LORD\n• **Romans 8:28** — All things work for good\n• **Psalm 23** — The Lord is my shepherd\n\nI can look up **any verse** in the entire Bible! Just type a reference like "Genesis 1:1" or "Revelation 21:4". 📖✨`;
  }

  // 10. Follow-ups
  if (/tell me more|explain|go deeper|more about|continue|what else|another|more verses/i.test(lower)) {
    return `📖 Here are more powerful Scriptures:\n\n• **Psalm 46:10** — "Be still, and know that I am God"\n• **2 Timothy 1:7** — "God hath not given us the spirit of fear"\n• **Hebrews 11:1** — "Faith is the substance of things hoped for"\n• **Matthew 11:28** — "Come unto me, all ye that labour"\n\nI can fetch **any verse** from the Bible! Try typing a reference. 💛`;
  }

  // 11. Default
  return `🕊️ I'd love to help!\n\nI'm connected to the **full KJV Bible** — I can look up any verse!\n\n📖 **Verses** — "John 3:16", "Genesis 1:1", "Psalm 119:105"\n📚 **Chapters** — "Matthew 5", "Romans 8"\n💬 **Topics** — love, faith, sin, prayer, anxiety, marriage, hope\n\nJust type a verse reference or question! 💛`;
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const userMessages = messages.filter((m: any) => m.role === "user");
  const lastUserMsg = userMessages[userMessages.length - 1];
  let userText = "";
  if (lastUserMsg) {
    userText = lastUserMsg.parts
      ? lastUserMsg.parts.filter((p: any) => p.type === "text").map((p: any) => p.text).join(" ")
      : lastUserMsg.content || "";
  }

  const history = userMessages.slice(0, -1).map((m: any) => m.content || "");
  const response = await findResponse(userText, history);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = response.split(" ");
      for (let i = 0; i < words.length; i++) {
        const text = i === 0 ? words[i] : " " + words[i];
        const escaped = text.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
        controller.enqueue(encoder.encode(`0:"${escaped}"\n`));
        await new Promise(r => setTimeout(r, Math.min(20 + words[i].length * 3, 60)));
      }
      controller.enqueue(encoder.encode(`e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
      controller.enqueue(encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Vercel-AI-Data-Stream": "v1" },
  });
}
