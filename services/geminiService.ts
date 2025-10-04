import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
// FIX: Removed GroundingChunk from import to resolve type conflict with the SDK.
// The `groundingChunks` variable will have its type inferred from the SDK response.
import type { SearchResult, Source } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function performSearch(query: string): Promise<SearchResult> {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    // FIX: Removed the explicit local `GroundingChunk[]` type. This allows TypeScript to use the
    // inferred type from the SDK, where `source.web.title` is optional, resolving the error.
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // FIX: Added a `.map()` call after filtering. The filter ensures `source.title` exists,
    // and the map creates a new array of objects that strictly conform to the `Source` type,
    // where `title` is a required string.
    const sources: Source[] = groundingChunks
        .map(chunk => chunk.web)
        .filter(source => source && source.uri && source.title)
        .map(source => ({ title: source.title as string, uri: source.uri }));

    return {
      text: text,
      sources: sources,
    };

  } catch (error) {
    console.error("Error performing search with Gemini API:", error);
    throw new Error("Failed to get a response from the search service. Please check your connection or API key.");
  }
}
