import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import * as router from 'react-router';

// Mock the ScrollToTop component
jest.mock('./Components/ScrollToTop', () => () => null);

// Mock the router context
const mockedUsedNavigate = jest.fn();
const mockedUseLocation = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedUsedNavigate);
    jest.spyOn(router, 'useLocation').mockImplementation(() => ({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: '5nvxpbdafa',
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders navigation links', () => {
    render(<App />);
    
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('NEWS')).toBeInTheDocument();
    expect(screen.getByText('TEAM')).toBeInTheDocument();
    expect(screen.getByText('TRAINING')).toBeInTheDocument();
    expect(screen.getByText('JUNIORS')).toBeInTheDocument();
    expect(screen.getByText('RESULTS & FIXTURES')).toBeInTheDocument();
    expect(screen.getByText('MEDIA & RECRUITMENT')).toBeInTheDocument();
    expect(screen.getByText('CONTACT')).toBeInTheDocument();
  });

  test('renders club name and subtitle', () => {
    render(<App />);
    
    expect(screen.getByText('Old Town Shamrocks')).toBeInTheDocument();
    expect(screen.getByText('Porvoo Rugby Club')).toBeInTheDocument();
  });

  test('renders footer with sponsor information', () => {
    render(<App />);
    
    expect(screen.getByText('Proudly sponsored by:')).toBeInTheDocument();
    expect(screen.getByAltText('Lindos')).toBeInTheDocument();
    expect(screen.getByAltText('RockTape')).toBeInTheDocument();
    expect(screen.getByAltText('Paavilainen')).toBeInTheDocument();
    expect(screen.getByAltText('Uudenmaan')).toBeInTheDocument();
    expect(screen.getByAltText('Artomika')).toBeInTheDocument();
  });
});