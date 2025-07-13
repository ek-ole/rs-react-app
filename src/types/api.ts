export type ApiCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: { name: string };
};

export type ApiResponse = {
  results: ApiCharacter[];
};
