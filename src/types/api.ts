export type ApiCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: { name: string };
};

export type ApiResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ApiCharacter[];
};
