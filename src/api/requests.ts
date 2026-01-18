import { apiClient } from './client';
import { Gate, GateDetails } from './types';

export function fetchGates() {
  return apiClient.get<Gate[]>('gates');
}

export function fetchGateDetails(gateCode: string) {
  return apiClient.get<GateDetails>(`gates/${gateCode}`);
}

