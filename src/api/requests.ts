import { apiClient } from './client';
import { Gate } from './types';

export function fetchGates() {
  return apiClient.get<Gate[]>('gates');
}

