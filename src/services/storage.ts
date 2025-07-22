const SEARCH_TERM_KEY = 'rick-and-morty-search';

export class LocalStorageService {
  static getSearchTerm(): string {
    return localStorage.getItem(SEARCH_TERM_KEY) || '';
  }

  static setSearchTerm(term: string): void {
    const trimmedTerm = term.trim();
    return trimmedTerm
      ? localStorage.setItem(SEARCH_TERM_KEY, trimmedTerm)
      : localStorage.removeItem(SEARCH_TERM_KEY);
  }

  static clearSearchTerm(): void {
    localStorage.removeItem(SEARCH_TERM_KEY);
  }
}
