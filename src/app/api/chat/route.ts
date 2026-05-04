import { NextRequest } from "next/server";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

// Comprehensive Bible knowledge base for the offline Mini Pastor
const BIBLE_RESPONSES: Record<string, string> = {
  // Key verses
  "john 3:16": "🕊️ **John 3:16** — \"For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.\"\n\nThis is perhaps the most well-known verse in all of Scripture. It reveals the heart of the Gospel:\n\n• **God's love** is universal — He loves the *whole* world\n• **God's gift** is sacrificial — He gave His only Son\n• **God's promise** is eternal — whoever believes will have everlasting life\n\nThis verse reminds us that salvation is not earned through works, but received through faith. God made the first move out of pure love. 💛",
  
  "psalm 23": "🐑 **Psalm 23** — The Shepherd's Psalm\n\n\"The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul...\"\n\nThis beloved psalm, written by King David, paints a beautiful picture of God as our caring Shepherd:\n\n• **Provider** — \"I shall not want\"\n• **Comforter** — \"He restoreth my soul\"\n• **Protector** — \"Though I walk through the valley of the shadow of death, I will fear no evil\"\n• **Host** — \"Thou preparest a table before me\"\n\nNo matter what valley you're walking through, the Good Shepherd is right there with you. 🙏",

  "romans 8:28": "✨ **Romans 8:28** — \"And we know that all things work together for good to them that love God, to them who are the called according to his purpose.\"\n\nThis verse is a powerful promise:\n\n• It doesn't say all things *are* good — but that they *work together* for good\n• It's for those who love God and are called according to His purpose\n• God is sovereign over every circumstance\n\nEven in your hardest seasons, God is weaving something beautiful. Trust the process. 🌟",

  "jeremiah 29:11": "🌅 **Jeremiah 29:11** — \"For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.\"\n\nContext matters here — God spoke this to the Israelites during their exile in Babylon. They were in a difficult season, but God promised:\n\n• He has **plans** for you — not random, but intentional\n• His plans are for **peace**, not harm\n• He promises **hope and a future**\n\nIf you're in a difficult season, remember: your current chapter is not your final chapter. 🙏",

  "philippians 4:13": "💪 **Philippians 4:13** — \"I can do all things through Christ which strengtheneth me.\"\n\nPaul wrote this from *prison*. The context is about contentment in every circumstance:\n\n• It's not about superhuman ability — it's about **divine strength** in weakness\n• Paul had learned to be content whether in plenty or in need\n• The strength comes from *Christ*, not from ourselves\n\nWhatever challenge you face today, you don't face it alone. Christ strengthens you! 🔥",

  "matthew 5": "⛰️ **The Sermon on the Mount (Matthew 5-7)**\n\nThis is Jesus' greatest teaching, covering:\n\n**The Beatitudes (5:3-12):**\n• Blessed are the poor in spirit, the meek, the merciful, the peacemakers...\n\n**Salt & Light (5:13-16):**\n• \"Ye are the salt of the earth... Ye are the light of the world\"\n\n**Key teachings:**\n• Love your enemies (5:44)\n• Turn the other cheek (5:39)\n• Don't worry about tomorrow (6:34)\n• Judge not, that ye be not judged (7:1)\n• The Golden Rule (7:12)\n\nJesus was laying out a radically different way of living — one rooted in love, humility, and faith. 🌟",

  "genesis 1": "🌍 **Genesis 1** — The Creation\n\n\"In the beginning God created the heaven and the earth.\"\n\nThe seven days of creation:\n• Day 1: Light and darkness\n• Day 2: Sky and waters\n• Day 3: Land, seas, and vegetation\n• Day 4: Sun, moon, and stars\n• Day 5: Sea creatures and birds\n• Day 6: Animals and **humanity** (in God's image!)\n• Day 7: God rested\n\n\"And God saw every thing that he had made, and, behold, it was very good.\" (Genesis 1:31)\n\nYou are fearfully and wonderfully made, created in the image of the Almighty! 🙏",

  "proverbs 3:5": "🧭 **Proverbs 3:5-6** — \"Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.\"\n\nThis is one of the most practical verses in the Bible:\n\n• **Trust** — with ALL your heart, not just part\n• **Don't lean** on your own understanding — our perspective is limited\n• **Acknowledge Him** in everything — not just the big decisions\n• **He will direct** — God promises to guide you\n\nWhen life feels confusing, choose trust over worry. God sees the full picture. 🌟",
};

// Topic-based responses
const TOPIC_RESPONSES: Record<string, string> = {
  "peace": "🕊️ Finding Peace in God's Word\n\n**\"Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.\"** — John 14:27\n\nHere are some powerful verses about peace:\n\n• **Philippians 4:6-7** — \"Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.\"\n\n• **Isaiah 26:3** — \"Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.\"\n\n• **Psalm 46:10** — \"Be still, and know that I am God.\"\n\nPractical steps:\n1. 🙏 Pray about what's troubling you\n2. 📖 Meditate on God's promises\n3. 🎵 Worship — it shifts your focus\n4. 🤝 Talk to someone you trust\n\nRemember: God's peace isn't the absence of storms — it's His presence *in* the storm. 💛",

  "anxiety": "🤗 What the Bible Says About Anxiety\n\n**\"Cast all your anxiety on him because he cares for you.\"** — 1 Peter 5:7\n\nAnxiety is something many people face, even people of faith. Here's what Scripture teaches:\n\n• **Matthew 6:25-34** — Jesus said \"Take no thought for your life\" — He tells us not to worry about food, clothing, or tomorrow\n• **Philippians 4:6-7** — The antidote to anxiety is prayer with thanksgiving\n• **Psalm 55:22** — \"Cast thy burden upon the LORD, and he shall sustain thee\"\n• **Isaiah 41:10** — \"Fear thou not; for I am with thee: be not dismayed; for I am thy God\"\n\nRemember:\n- It's okay to feel anxious — even David expressed fear in the Psalms\n- Bring it to God honestly in prayer\n- Take it one day at a time (Matthew 6:34)\n- Consider speaking to a counselor — seeking help is wise, not weak\n\nYou are held by a God who never lets go. 💛",

  "forgiveness": "❤️ What the Bible Says About Forgiveness\n\n**\"If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.\"** — 1 John 1:9\n\n**God's Forgiveness of Us:**\n• Psalm 103:12 — \"As far as the east is from the west, so far hath he removed our transgressions from us\"\n• Romans 8:1 — \"There is therefore now no condemnation to them which are in Christ Jesus\"\n• Micah 7:19 — He will \"cast all their sins into the depths of the sea\"\n\n**Our Forgiveness of Others:**\n• Matthew 6:14-15 — \"If ye forgive men their trespasses, your heavenly Father will also forgive you\"\n• Ephesians 4:32 — \"Be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you\"\n• Colossians 3:13 — \"Forbearing one another, and forgiving one another\"\n\nForgiveness doesn't mean what happened was okay — it means you're releasing the burden to God. 🙏",

  "love": "💕 What the Bible Says About Love\n\n**\"God is love; and he that dwelleth in love dwelleth in God, and God in him.\"** — 1 John 4:16\n\n**The Greatest Commandment:**\n• Matthew 22:37-39 — Love God with all your heart, soul, and mind. Love your neighbor as yourself.\n\n**The Love Chapter — 1 Corinthians 13:4-7:**\n\"Love suffereth long, and is kind; love envieth not; love vaunteth not itself, is not puffed up, doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; rejoiceth not in iniquity, but rejoiceth in the truth; beareth all things, believeth all things, hopeth all things, endureth all things.\"\n\n**God's Love for You:**\n• Romans 8:38-39 — NOTHING can separate you from God's love\n• Jeremiah 31:3 — \"I have loved thee with an everlasting love\"\n• John 15:13 — \"Greater love hath no man than this, that a man lay down his life for his friends\"\n\nYou are deeply, unconditionally loved. 🌟",

  "strength": "💪 Finding Strength in God\n\n**\"But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.\"** — Isaiah 40:31\n\nVerses about God's strength:\n\n• **Philippians 4:13** — \"I can do all things through Christ which strengtheneth me\"\n• **2 Corinthians 12:9** — \"My grace is sufficient for thee: for my strength is made perfect in weakness\"\n• **Psalm 46:1** — \"God is our refuge and strength, a very present help in trouble\"\n• **Nehemiah 8:10** — \"The joy of the LORD is your strength\"\n• **Deuteronomy 31:6** — \"Be strong and of a good courage, fear not... for the LORD thy God... will not fail thee, nor forsake thee\"\n\nYou don't have to be strong enough on your own. Let God be your strength today. 🔥",

  "faith": "⛪ What the Bible Says About Faith\n\n**\"Now faith is the substance of things hoped for, the evidence of things not seen.\"** — Hebrews 11:1\n\n**Building Your Faith:**\n• Romans 10:17 — \"Faith cometh by hearing, and hearing by the word of God\"\n• James 2:17 — \"Faith, if it hath not works, is dead, being alone\"\n• Mark 11:22-24 — Faith as small as a mustard seed can move mountains\n• Hebrews 11 — The Hall of Faith: Abraham, Moses, Noah, Rahab...\n\n**When Faith Feels Weak:**\n• Mark 9:24 — \"Lord, I believe; help thou mine unbelief\" — It's okay to be honest!\n• Psalm 42:11 — \"Why art thou cast down, O my soul? Hope thou in God\"\n• Lamentations 3:22-23 — God's mercies are new every morning\n\nFaith isn't the absence of doubt — it's choosing to trust God despite the doubt. 🙏",

  "prayer": "🙏 What the Bible Says About Prayer\n\n**\"Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.\"** — Matthew 7:7\n\n**How to Pray — The Lord's Prayer (Matthew 6:9-13):**\n1. \"Our Father which art in heaven\" — Approach God as Father\n2. \"Hallowed be thy name\" — Worship first\n3. \"Thy kingdom come, thy will be done\" — Surrender to His will\n4. \"Give us this day our daily bread\" — Ask for daily needs\n5. \"Forgive us our debts\" — Confess sins\n6. \"Lead us not into temptation\" — Seek protection\n\n**Encouragement:**\n• 1 Thessalonians 5:17 — \"Pray without ceasing\"\n• Philippians 4:6 — Pray about everything, worry about nothing\n• Jeremiah 33:3 — \"Call unto me, and I will answer thee\"\n• Romans 8:26 — The Spirit helps us when we don't know what to pray\n\nPrayer isn't about perfect words — it's about an honest heart. God hears you. 💛",

  "salvation": "✝️ The Gospel — How to Be Saved\n\n**\"For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.\"** — Ephesians 2:8-9\n\n**The Romans Road to Salvation:**\n1. **Romans 3:23** — \"All have sinned, and come short of the glory of God\" — Everyone needs saving\n2. **Romans 6:23** — \"The wages of sin is death; but the gift of God is eternal life through Jesus Christ\" — Sin has consequences, but God offers a gift\n3. **Romans 5:8** — \"God commendeth his love toward us, in that, while we were yet sinners, Christ died for us\" — Jesus died for us\n4. **Romans 10:9** — \"If thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved\"\n5. **Romans 10:13** — \"Whosoever shall call upon the name of the Lord shall be saved\"\n\nSalvation is a free gift. You can't earn it — you simply receive it by faith. 🕊️",

  "suffering": "💔 What the Bible Says About Suffering\n\n**\"Weeping may endure for a night, but joy cometh in the morning.\"** — Psalm 30:5\n\nSuffering is one of the hardest aspects of life. Here's what Scripture teaches:\n\n• **Romans 8:28** — God works all things for good for those who love Him\n• **2 Corinthians 4:17** — \"Our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory\"\n• **James 1:2-4** — Trials produce patience and maturity\n• **Psalm 34:18** — \"The LORD is nigh unto them that are of a broken heart\"\n• **Revelation 21:4** — One day, God will wipe away every tear\n\n**Jesus understands suffering:**\n• He was betrayed, mocked, beaten, and crucified\n• Hebrews 4:15 — He was \"in all points tempted like as we are\"\n• He weeps with you (John 11:35)\n\nYour pain is not the end of your story. Hold on to hope. 🙏",
};

function findBestResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase().trim();

  // Check specific verses first
  for (const [key, response] of Object.entries(BIBLE_RESPONSES)) {
    if (lower.includes(key)) return response;
  }

  // Check topics
  const topicKeywords: Record<string, string[]> = {
    peace: ["peace", "calm", "rest", "quiet", "still", "tranquil", "serene"],
    anxiety: ["anxiety", "anxious", "worried", "worry", "stress", "stressed", "nervous", "fear", "afraid", "scared", "overwhelmed", "panic"],
    forgiveness: ["forgive", "forgiveness", "forgiving", "sorry", "guilt", "guilty", "ashamed", "shame", "regret"],
    love: ["love", "loved", "loving", "relationship", "marriage", "valentine", "romance", "caring"],
    strength: ["strength", "strong", "weak", "weakness", "tired", "exhausted", "burnout", "can't go on", "give up", "hopeless"],
    faith: ["faith", "believe", "belief", "doubt", "doubting", "trust", "trusting", "uncertain"],
    prayer: ["prayer", "pray", "praying", "how to pray", "talk to god"],
    salvation: ["salvation", "saved", "born again", "accept christ", "gospel", "eternal life", "heaven", "hell", "baptism", "repent"],
    suffering: ["suffering", "pain", "hurt", "hurting", "struggle", "difficult", "hard time", "loss", "grief", "grieving", "depressed", "depression", "sad", "sadness", "lonely", "loneliness", "death", "dying"],
  };

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        return TOPIC_RESPONSES[topic];
      }
    }
  }

  // Check for greetings
  if (/^(hi|hello|hey|good morning|good evening|greetings)/i.test(lower)) {
    return "Hello! 🌟 Welcome to the Mini Pastor. I'm here to help you explore the Bible and grow in your faith.\n\nHere are some things you can ask me:\n\n• 📖 **\"What does John 3:16 mean?\"**\n• 🙏 **\"What does the Bible say about anxiety?\"**\n• ✝️ **\"How can I be saved?\"**\n• 💪 **\"I need strength today\"**\n• ❤️ **\"What does the Bible say about forgiveness?\"**\n• 🕊️ **\"Help me find peace\"**\n\nFeel free to ask anything about faith and Scripture! 💛";
  }

  // Check for thank you
  if (/thank|thanks|thx|appreciate/i.test(lower)) {
    return "You're very welcome! 🙏 It's a blessing to walk alongside you on this journey.\n\n**\"Give thanks unto the LORD; for he is good: for his mercy endureth for ever.\"** — Psalm 136:1\n\nKeep reading, keep praying, and keep growing. God is with you every step of the way! 💛🕊️";
  }

  // Check if it seems like a Bible question
  if (/bible|scripture|verse|god|jesus|christ|spirit|lord|pray|church|faith|sin|heaven/i.test(lower)) {
    return `🙏 That's a wonderful question about faith!\n\nWhile I'm working with a limited knowledge base right now, here are some Scriptures that might speak to you:\n\n• **Proverbs 3:5-6** — \"Trust in the LORD with all thine heart; and lean not unto thine own understanding.\"\n• **Jeremiah 29:11** — \"For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil.\"\n• **Romans 8:28** — \"All things work together for good to them that love God.\"\n\nTry asking me about specific topics like:\n- Prayer, Faith, Love, Forgiveness\n- Anxiety, Peace, Strength, Suffering\n- Salvation, or specific verses like \"John 3:16\"\n\nI'd love to dive deeper with you! 📖✨`;
  }

  // Default: guide them toward Bible topics
  return "🕊️ I'm the Mini Pastor, here to help you explore the Bible and grow in your faith!\n\nI can help you with questions about:\n\n• 📖 **Bible verses** — Ask about John 3:16, Psalm 23, Romans 8:28, etc.\n• 🙏 **Topics** — Prayer, faith, love, forgiveness, salvation, peace, anxiety, strength\n• ✝️ **The Gospel** — How to be saved, what Jesus taught\n• 💪 **Encouragement** — When you need strength or comfort\n\nFor topics outside the Bible, I'll respectfully point you in the right direction, but my focus is on Scripture and spiritual guidance.\n\nWhat's on your heart today? 💛";
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  // Get the last user message
  const lastUserMsg = [...messages].reverse().find((m: any) => m.role === "user");
  let userText = "";
  
  if (lastUserMsg) {
    if (lastUserMsg.parts) {
      userText = lastUserMsg.parts
        .filter((p: any) => p.type === "text")
        .map((p: any) => p.text)
        .join(" ");
    } else if (lastUserMsg.content) {
      userText = lastUserMsg.content;
    }
  }

  const response = findBestResponse(userText);

  // Stream the response word by word for a natural typing effect
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = response.split(" ");
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const text = i === 0 ? word : " " + word;
        // Use the Vercel AI SDK data stream protocol format
        const escaped = text.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
        controller.enqueue(encoder.encode(`0:"${escaped}"\n`));
        // Variable speed: faster for short words, slower for longer
        const delay = Math.min(30 + word.length * 5, 80);
        await new Promise(r => setTimeout(r, delay));
      }
      // Send finish event
      controller.enqueue(encoder.encode(`e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
      controller.enqueue(encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Vercel-AI-Data-Stream": "v1",
    },
  });
}
