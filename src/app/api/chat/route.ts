import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response("OpenAI API Key is missing", { status: 401 });
  }

  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    system: `You are the "Mini Pastor", an AI assistant embedded in a social Bible reading app.
Your strict domain constraint: You may ONLY answer questions related to the Bible, Christian theology, scripture meanings, and providing spiritual encouragement. 
If a user asks about anything unrelated (e.g., recipes, programming, politics, general knowledge), you must respectfully decline and gently guide the conversation back to faith and scripture.
Tone: Warm, encouraging, respectful, and simple to understand. Don't be overly academic; be pastoral.`,
    messages,
  });

  return result.toDataStreamResponse();
}
