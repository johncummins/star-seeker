import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GateDetailsScreen from '../GateDetailsScreen';
import { fetchGateDetails } from '../../../../api/requests';
import type { Gate } from '../../../../api/types';

// mock the api
jest.mock('../../../../api/requests', () => ({
  fetchGateDetails: jest.fn(),
}));

// mock navigation
jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({
    params: { gateCode: 'SOL' },
  }),
}));

describe('GateDetailsScreen Integration Test', () => {
  it('displays gate details from api', async () => {
    // mock api response
    const mockGate: Gate = {
      uuid: '9078a706-1584-45a3-a8f3-93e65a0bd5c9',
      code: 'SOL',
      name: 'Sol',
      links: [
        { code: 'RAN', hu: '100' },
        { code: 'PRX', hu: '90' },
      ],
    };

    jest.mocked(fetchGateDetails).mockResolvedValue(mockGate);

    // create a fresh query client just for this test
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: Infinity,
        },
      },
    });

    // render the screen inc react query provider
    const { getByText, unmount } = render(
      <QueryClientProvider client={queryClient}>
        <GateDetailsScreen />
      </QueryClientProvider>
    );

    // wait for api call then check text
    await waitFor(() => {
      expect(getByText('Sol')).toBeTruthy();
      expect(getByText('SOL')).toBeTruthy();
      expect(getByText('RAN - 100 HU')).toBeTruthy();
    });

    unmount();
    queryClient.clear();
  });
});
