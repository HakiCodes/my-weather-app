import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the initial empty-state prompt', () => {
  render(<App />);
  const message = screen.getByText(/search for a city to see the weather/i);
  expect(message).toBeInTheDocument();
});
