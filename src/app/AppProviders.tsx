import { QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { queryClient } from './queryClient';
import { RootNavigator } from './navigation/RootNavigator';

export function AppProviders() {
  console.log('AppProviders');
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
