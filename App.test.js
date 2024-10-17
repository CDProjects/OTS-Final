import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the window.scrollTo function to avoid errors in the test environment
beforeAll(() => {
  window.scrollTo = jest.fn();
});

test('renders team member image', () => {
  // Render the App component
  render(<App />);
  
  // Look for an image with the alt text "Akseli" (or any other member from the Home component)
  const imageElement = screen.getByAltText(/Akseli/i);
  
  // Check that the image is in the document
  expect(imageElement).toBeInTheDocument();
});
