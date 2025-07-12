export class ApiErrorHandler {
  static checkResponse(response: Response): void {
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
  }
  static logError(error: unknown): string {
    const message = error instanceof Error ? error.message : 'Unknown API error';
    console.error('API Error:', message);
    return message;
  }
}
