import { useQuery } from '@tanstack/react-query';
import { fetchGates } from '../../../api/requests';

export function useGates() {
  return useQuery({
    queryKey: ['gates'],
    queryFn: fetchGates,
    staleTime: 60_000,
    retry: 1,
  });
}
