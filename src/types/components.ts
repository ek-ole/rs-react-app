import type { Character } from './character';

export type ResultsProps = {
  characters: Character[];
};

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};
