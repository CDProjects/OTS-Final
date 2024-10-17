import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock the ScrollToTop component
jest.mock('./Components/ScrollToTop', () => () => null);

// Mock the lazy-loaded components
jest.mock('./Components/Home', () => () => <div>Home Component</div>);
jest.mock('./Components/News', () => () => <div>News Component</div>);
jest.mock('./Components/Team', () => () => <div>Team Component</div>);
// ... mock other components as needed

describe('App Component', () => {
  beforeAll(() => {
    // Mock scrollTo
    window.scrollTo = jest.fn();
  });

  test('renders navigation', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  test('renders footer', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  test('renders home component on default route', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Home Component')).toBeInTheDocument();
    });
  });
});