import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const text = "I am running in Offline Demo Mode since the OPENAI_API_KEY is missing! 🕊️\n\nBlessed are the peacemakers, for they will be called children of God. (Matthew 5:9)\n\nKeep up your amazing Bible reading streak!";
        const chunks = text.split(" ");
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(`0:{"type":"text","value":"${chunk} "}\n`));
          await new Promise(r => setTimeout(r, 100));
        }
        controller.close();
      }
    });
    return new Response(stream, { headers: { "Content-Type": "text/plain" } });
  }

  const result = streamText({
    model: openai('gpt-4o'),
    system: `You are the "Mini Pastor", an AI assistant embedded in a social Bible reading app. You help users understand scripture, provide spiritual guidance, and encourage their faith journey. Always be warm, encouraging, and biblically grounded. Reference specific Bible verses when relevant.`,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
