import React from "react";
import {render, screen} from '@testing-library/react';
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage";

//Mock the header, LPHeader and Footer
jest.mock('../components/Header', () => () => <div> Header Mock </div>);
jest.mock('../components/LPHeader', () => () => <div> LPHeader Mock </div>);
jest.mock('../components/Footer', () => () => <div> Footer Mock </div>);

describe('TermsAndConditionsPage', () => {
    afterEach(()=> {
        // Clear local storage after each test
        localStorage.clear();
    });

    test('renders Header component when user is authenticated', () => {
        // Set the user as authenticated in localStorage
        localStorage.setItem('access_token', 'fake-token');
        localStorage.setItem('email', 'user@example.com');

        render(<TermsAndConditionsPage />);

        // Verify that the Header is rendered
        expect(screen.getByText('Header Mock')).toBeInTheDocument();
        });

    test('renders LPHeader component when user is not authenticated', () => {
        // Render without authentication
        render(<TermsAndConditionsPage />);

        // Verify that the LPHeader is rendered
        expect(screen.getByText('LPHeader Mock')).toBeInTheDocument();
        });

    test('renders the terms and conditions content', () => {
        render(<TermsAndConditionsPage />);
    
        // Verify that the content is rendered
        expect(screen.getByText('Terms and Conditions')).toBeInTheDocument();
        expect(screen.getByText('Welcome to Vibe Gurukul!')).toBeInTheDocument();
        expect(screen.getByText('These terms and conditions outline the rules and regulations for the use of Vibe Gurukul\'s Website, located at vibegurukul.com')).toBeInTheDocument();
        expect(screen.getByText('These terms and conditions were last updated on 15 July, 2024.')).toBeInTheDocument();
        });

    test('renders the Footer component', () => {
        render(<TermsAndConditionsPage />);
    
        // Verify that the Footer is rendered
        expect(screen.getByText('Footer Mock')).toBeInTheDocument();
        });
});