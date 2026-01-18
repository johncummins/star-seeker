import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // Keep data fresh for 1 minute
      gcTime: 5 * 60 * 1000, // Keep cached data for 5 minutes
    },
  },
});
