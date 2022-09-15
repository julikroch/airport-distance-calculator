/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Component title to match with the title provided', () => {
  render(<App />);
  const title = screen.getByText(/🌎 Airport distance calculator 🛫/i);
  expect(title).toBeInTheDocument();
});

test('Error message not to be in the doc on first render', () => {
  const { queryAllByTestId } = render(<App />);
  expect(queryAllByTestId(/error-msg/i)).toHaveLength(0)
});
