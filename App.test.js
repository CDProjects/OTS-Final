import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

// Mock the window.scrollTo function to avoid errors in the test environment
beforeAll(() => {
  window.scrollTo = jest.fn();
});

test('renders team member image', async () => {
  // Use act to ensure suspended resources are resolved
  await act(async () => {
    render(<App />);
  });

  // Look for an image with the alt text "Akseli" (or any other member from the Home component)
  const imageElement = await waitFor(() => screen.getByAltText(/Akseli/i));

  // Check that the image is in the document
  expect(imageElement).toBeInTheDocument();
});
