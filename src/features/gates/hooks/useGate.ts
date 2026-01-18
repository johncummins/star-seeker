import { useQuery } from '@tanstack/react-query';
import { fetchGateDetails } from '../../../api/requests';

export function useGate(gateCode: string) {
  return useQuery({
    queryKey: ['gate', gateCode],
    queryFn: () => fetchGateDetails(gateCode),
    staleTime: 60_000,
    retry: 1,
  });
}
