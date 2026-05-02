import { generateReadmeService } from "@/features/documents/services/ai-service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { content } = (await request.json()) as { content: string };

    if (!content) {
      return NextResponse.json(
        { error: "No content provided" },
        { status: 400 },
      );
    }

    const readme = await generateReadmeService(content);
    return NextResponse.json({ readme });
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : "Unknown Error";
    console.error(`Error description ${err}`);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
