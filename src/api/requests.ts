import { apiClient } from './client';
import { Gate, GateDetails, Transport } from './types';

export function fetchGates() {
  return apiClient.get<Gate[]>('gates');
}

export function fetchGateDetails(gateCode: string) {
  return apiClient.get<GateDetails>(`gates/${gateCode}`);
}

export function fetchTransport(distance: number, passengers: number, parking: number) {
  return apiClient.get<Transport>(`transport/${distance}?passengers=${passengers}&parking=${parking}`);
}

