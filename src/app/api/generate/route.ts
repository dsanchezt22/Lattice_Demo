import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are the Lattice workspace generator. Given a user's description of what they need to organize or track, return a JSON object with 2–4 modules that together form a useful workspace.

Each module must have:
- "type": one of "table", "checklist", "budget", "notes", "calendar"
- "title": short, descriptive name
- "data": the module's content (structure depends on type, see below)

Type schemas:
- table: { columns: string[], rows: string[][] }
- checklist: { items: { label: string, checked: boolean }[] }
- budget: { items: { label: string, amount: number, max: number }[], currency: string }
- notes: { content: string }
- calendar: { events: { day: string, title: string }[] }

Rules:
- Return ONLY valid JSON, no markdown, no explanation.
- Use realistic, populated example data — never leave arrays empty.
- Pick module types that genuinely fit the user's request.
- Keep titles concise (2–4 words).

Response format:
{
  "modules": [ ...2 to 4 module objects... ]
}`;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent([
    SYSTEM_PROMPT,
    `User request: ${prompt.trim()}`,
  ]);

  const text = result.response.text().trim();

  // Strip markdown code fences if present
  const cleaned = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    return NextResponse.json({ error: "Failed to parse workspace from AI response.", raw: cleaned }, { status: 500 });
  }

  return NextResponse.json(parsed);
}
