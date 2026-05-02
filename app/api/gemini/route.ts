import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export default async function (content: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a README.md file for the content provided to you. Make sure to return everything in Markdown format and do not change, add, or remove anything from the content. Your task is to create a complete, easy-to-understand README.md file. ${content}`,
  });
  return response.text;
}
