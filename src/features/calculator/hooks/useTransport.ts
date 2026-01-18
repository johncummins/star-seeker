import { useQuery } from '@tanstack/react-query';
import { fetchTransport } from '../../../api/requests';

type UseTransportParams = {
  distance: number;
  passengers: number;
  parking: number;
  enabled: boolean;
};

export function useTransport({ distance, passengers, parking, enabled }: UseTransportParams) {
  return useQuery({
    queryKey: ['transport', distance, passengers, parking],
    queryFn: () => fetchTransport(distance, passengers, parking),
    enabled,
    staleTime: 60_000,
    retry: 1,
  });
}
