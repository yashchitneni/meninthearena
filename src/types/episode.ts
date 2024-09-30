interface Episode {
  id: string;
  title: string;
  uri: string;
  description: string;
  releaseDate: string;
  durationMs: number;
  imageUrl: string;
}

export type { Episode }