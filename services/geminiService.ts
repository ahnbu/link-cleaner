
import { GoogleGenAI } from "@google/genai";
import { CleansingConfig } from "../types";

export const cleanseText = async (text: string, config: CleansingConfig): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are a professional document refiner specialized in "Markdown Cleansing".
    Your goal is to take a text/markdown document and remove "noise" introduced by AI tools like Perplexity or NotebookLM.
    
    RULES:
    ${config.removeCitationLinks ? '- REMOVE all citation links in the format [title](url) usually found at the ends of sentences.' : ''}
    ${config.removeFootnoteMarkers ? '- REMOVE all numeric footnote markers like [1], [1, 2], or [1-3].' : ''}
    ${config.simplifyFormatting ? '- REMOVE decorative symbols like ⭐ or excessive stars. Reduce redundant bolding if it makes the text look cluttered.' : ''}
    ${config.preserveHeaders ? '- DO NOT modify headings (#, ##, etc.) unless they contain noise markers.' : ''}
    - Preserve the original meaning, paragraph structure, and core content perfectly.
    - Output ONLY the cleansed markdown text. No explanations or meta-talk.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Please cleanse the following text based on your instructions:\n\n${text}`,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for consistent output
      },
    });

    return response.text || '';
  } catch (error) {
    console.error("Gemini Cleansing Error:", error);
    throw new Error("Failed to cleanse text using AI. Please check your connection or try again.");
  }
};
