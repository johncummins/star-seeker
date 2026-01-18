import React from 'react';
import { render } from '@testing-library/react-native';
import ResultCard from '../ResultCard';

describe('ResultCard', () => {
  it('renders title and cost', () => {
    const { getByText } = render(
      <ResultCard title="Test Route" cost="$100" />
    );
    
    expect(getByText('Test Route')).toBeTruthy();
    expect(getByText('$100')).toBeTruthy();
  });

  it('renders breakdown when provided', () => {
    const { getByText } = render(
      <ResultCard 
        title="Test Route" 
        cost="$100" 
        breakdown="Distance: 50km"
      />
    );
    
    expect(getByText('Distance: 50km')).toBeTruthy();
  });

  it('renders label when provided', () => {
    const { getByText } = render(
      <ResultCard 
        title="Test Route" 
        cost="$100" 
        label="Best Option"
      />
    );
    
    expect(getByText('Best Option')).toBeTruthy();
  });
});
