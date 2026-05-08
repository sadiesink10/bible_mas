import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

let bibleCache: any[] | null = null;

async function loadBible() {
  if (bibleCache) return bibleCache;
  const filePath = path.join(process.cwd(), "public", "kjv.json");
  const data = await readFile(filePath, "utf-8");
  bibleCache = JSON.parse(data);
  return bibleCache!;
}

export async function GET(req: NextRequest) {
  const book = req.nextUrl.searchParams.get("book")?.toLowerCase();
  const chapter = parseInt(req.nextUrl.searchParams.get("chapter") || "0");
  const verse = parseInt(req.nextUrl.searchParams.get("verse") || "0");

  if (!book) return NextResponse.json({ error: "Missing book" }, { status: 400 });

  try {
    const bible = await loadBible();
    const found = bible.find((b: any) => b.name.toLowerCase() === book);
    if (!found) return NextResponse.json({ error: "Book not found" }, { status: 404 });

    if (chapter < 1 || chapter > found.chapters.length) {
      return NextResponse.json({ error: "Chapter not found", totalChapters: found.chapters.length }, { status: 404 });
    }

    const chapterVerses = found.chapters[chapter - 1];

    if (verse > 0) {
      if (verse > chapterVerses.length) {
        return NextResponse.json({ error: "Verse not found", totalVerses: chapterVerses.length }, { status: 404 });
      }
      return NextResponse.json({ book: found.name, chapter, verse, text: chapterVerses[verse - 1] });
    }

    // Return whole chapter
    return NextResponse.json({
      book: found.name,
      chapter,
      totalVerses: chapterVerses.length,
      verses: chapterVerses.map((text: string, i: number) => ({ verse: i + 1, text })),
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load Bible data" }, { status: 500 });
  }
}
