// app/api/chat-gpt-api/route.ts

import { streamText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY || "",
    })

    const result = await streamText({
      model: openai.chat("gpt-3.5-turbo-1106"),
      messages,
      maxTokens: 150,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("API Error:", error)
    return new Response(JSON.stringify({ error: "API request failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
