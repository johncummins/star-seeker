import { useQuery } from '@tanstack/react-query';
import { fetchRoute } from '../../../api/requests';

type UseRouteParams = {
  fromGateCode: string;
  toGateCode: string;
  enabled: boolean;
};

export function useRoute({ fromGateCode, toGateCode, enabled }: UseRouteParams) {
  return useQuery({
    queryKey: ['route', fromGateCode, toGateCode],
    queryFn: () => fetchRoute(fromGateCode, toGateCode),
    enabled,
    staleTime: 60_000,
    retry: 1,
  });
}
