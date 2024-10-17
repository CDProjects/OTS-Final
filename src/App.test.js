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
jest.mock('./Components/Training', () => () => <div>Training Component</div>);
jest.mock('./Components/Juniors', () => () => <div>Juniors Component</div>);
jest.mock('./Components/Fixtures', () => () => <div>Fixtures Component</div>);
jest.mock('./Components/MedRec', () => () => <div>Media & Recruitment Component</div>);
jest.mock('./Components/Contact', () => () => <div>Contact Component</div>);

describe('App Component', () => {
  beforeAll(() => {
    // Mock scrollTo
    window.scrollTo = jest.fn();
  });

  test('renders navigation links', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('HOME')).toBeInTheDocument();
      expect(screen.getByText('NEWS')).toBeInTheDocument();
      expect(screen.getByText('TEAM')).toBeInTheDocument();
      expect(screen.getByText('TRAINING')).toBeInTheDocument();
      expect(screen.getByText('JUNIORS')).toBeInTheDocument();
      expect(screen.getByText('RESULTS & FIXTURES')).toBeInTheDocument();
      expect(screen.getByText('MEDIA & RECRUITMENT')).toBeInTheDocument();
      expect(screen.getByText('CONTACT')).toBeInTheDocument();
    });
  });

  test('renders club name and subtitle', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Old Town Shamrocks')).toBeInTheDocument();
      expect(screen.getByText('Porvoo Rugby Club')).toBeInTheDocument();
    });
  });

  test('renders footer with sponsor information', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Proudly sponsored by:')).toBeInTheDocument();
      expect(screen.getByAltText('Lindos')).toBeInTheDocument();
      expect(screen.getByAltText('RockTape')).toBeInTheDocument();
      expect(screen.getByAltText('Paavilainen')).toBeInTheDocument();
      expect(screen.getByAltText('Uudenmaan')).toBeInTheDocument();
      expect(screen.getByAltText('Artomika')).toBeInTheDocument();
    });
  });
});