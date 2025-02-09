import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { command, prompt } = await req.json();

    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: `${command}: ${prompt}`,
      max_tokens: 150,
    });

    return NextResponse.json({ result: completion.choices[0].text });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error processing AI command", error: errorMessage },
      { status: 500 }
    );
  }
}
