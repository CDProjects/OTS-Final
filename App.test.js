import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';

// Mock the window.scrollTo function to avoid errors in the test environment
beforeAll(() => {
  window.scrollTo = jest.fn();
});

test('renders team member image', async () => {
  // Use act to manually handle Suspense
  await act(async () => {
    render(<App />);
  });

  // Wait for the image to load (due to lazy loading)
  const imageElement = await waitFor(() => screen.getByAltText(/Akseli/i));

  // Check that the image is in the document
  expect(imageElement).toBeInTheDocument();
});
