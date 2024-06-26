import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Lets test all different routes available currently
describe('App', () =>{
  test('renders LandingPage on default route', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText('Come Learn With Us')).toBeInTheDocument();
  });
});

