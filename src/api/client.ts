const BASE_URL = 'https://hstc-api.testing.keyholding.com/';
const API_KEY = '94962B9A-966C-43FC-8E1A-145DEAA5970C';

async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.json()
}

export const apiClient = {
  get,
};
