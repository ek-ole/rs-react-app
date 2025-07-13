const SEARCH_TERM_KEY = 'rick-and-morty-search';

export class LocalStorageService {
  static getSearchTerm(): string {
    return localStorage.getItem(SEARCH_TERM_KEY) || '';
  }

  static setSearchTerm(term: string): void {
    return term.trim()
      ? localStorage.setItem(SEARCH_TERM_KEY, term.trim())
      : localStorage.removeItem(SEARCH_TERM_KEY);
  }
  static clearSearchTerm(): void {
    localStorage.removeItem(SEARCH_TERM_KEY);
  }
}
