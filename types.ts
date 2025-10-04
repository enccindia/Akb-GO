
export interface Source {
  title: string;
  uri: string;
}

export interface SearchResult {
  text: string;
  sources: Source[];
}

// This interface matches the structure from Gemini's response for a grounding chunk
export interface GroundingChunk {
  web: Source;
}
