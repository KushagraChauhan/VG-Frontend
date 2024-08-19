import React from "react";
import {render, screen} from '@testing-library/react';
import AboutUsPage from '../pages/AboutUsPage';

//Mock the header, LPHeader and Footer
jest.mock('../components/Header', () => () => <div> Header Mock </div>);
jest.mock('../components/LPHeader', () => () => <div> LPHeader Mock </div>);
jest.mock('../components/Footer', () => () => <div> Footer Mock </div>);

describe('AboutUsPage', () => {
    afterEach(()=> {
        // Clear local storage after each test
        localStorage.clear();
    });

    test('renders Header component when user is authenticated', () => {
        // Set the user as authenticated in localStorage
        localStorage.setItem('access_token', 'fake-token');
        localStorage.setItem('email', 'user@example.com');

        render(<AboutUsPage />);

        // Verify that the Header is rendered
        expect(screen.getByText('Header Mock')).toBeInTheDocument();
        });

    test('renders LPHeader component when user is not authenticated', () => {
        // Render without authentication
        render(<AboutUsPage />);

        // Verify that the LPHeader is rendered
        expect(screen.getByText('LPHeader Mock')).toBeInTheDocument();
        });

    test('renders the About Us content', () => {
        render(<AboutUsPage />);
    
        // Verify that the content is rendered
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Why Learn About Sanatan Hindu Sanskriti?')).toBeInTheDocument();
        expect(screen.getByText('Our Team')).toBeInTheDocument();
        });

    test('renders the Footer component', () => {
        render(<AboutUsPage />);
    
        // Verify that the Footer is rendered
        expect(screen.getByText('Footer Mock')).toBeInTheDocument();
        });
});