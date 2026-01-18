import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button', () => {
  it('renders with the correct label', () => {
    const { getByText } = render(
      <Button onPress={() => {}} label="Click me" />
    );
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock} label="Click me" />
    );
    
    fireEvent.press(getByText('Click me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
