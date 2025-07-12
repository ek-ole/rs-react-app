export type ApiCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: { name: string };
};

export type Character = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type ApiResponse = {
  results: ApiCharacter[];
};

export type AppState = {
  characters: Character[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
};
