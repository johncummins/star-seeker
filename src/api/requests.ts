import { apiClient } from './client';
import { Gate, Transport, Route } from './types';

export function fetchGates() {
  return apiClient.get<Gate[]>('gates');
}

export function fetchGateDetails(gateCode: string) {
  return apiClient.get<Gate>(`gates/${gateCode}`);
}

export function fetchTransport(distance: number, passengers: number, parking: number) {
  return apiClient.get<Transport>(`transport/${distance}?passengers=${passengers}&parking=${parking}`);
}

export function fetchRoute(fromGateCode: string, toGateCode: string) {
  return apiClient.get<Route>(`gates/${fromGateCode}/to/${toGateCode}`);
}

