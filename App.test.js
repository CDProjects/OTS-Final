import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock the lazy-loaded components
jest.mock('./Components/Home', () => ({ __esModule: true, default: () => <div>Home Component</div> }));
jest.mock('./Components/News', () => ({ __esModule: true, default: () => <div>News Component</div> }));
jest.mock('./Components/Team', () => ({ __esModule: true, default: () => <div>Team Component</div> }));
// ... mock other components as needed

// Mock the Suspense component to render its children immediately
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Suspense: ({ children }) => children,
}));

describe('App Component', () => {
  test('renders Navbar', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByRole('navigation')).toBeInTheDocument();
  });

  test('renders Footer', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByRole('contentinfo')).toBeInTheDocument();
  });

  test('renders Home component on default route', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText('Home Component')).toBeInTheDocument();
  });

  test('updates title on route change', () => {
    render(
      <MemoryRouter initialEntries={['/news']}>
        <App />
      </MemoryRouter>
    );
    expect(document.title).toBe('Shamrocks | NEWS');
  });
});