export function checkResponse(response: Response): void {
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
}

export function logError(error: unknown): string {
  const message = error instanceof Error ? error.message : 'Unknown API error';
  console.error('API Error:', message);
  return message;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('404')) {
      return "Sorry, we couldn't find any characters matching your search";
    }
    if (error.message.includes('500')) {
      return 'Our servers are having issues, please try again later';
    }
    return error.message.replace('Failed to fetch characters: ', '');
  }
  return 'Something went wrong, please try again';
}

export const ApiErrorHandler = {
  checkResponse,
  logError,
  getErrorMessage,
};
