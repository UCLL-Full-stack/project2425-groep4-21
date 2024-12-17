import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserLoginForm from '../components/user/UserLoginForm';
import userService from '@services/userService';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// Mock dependencies
jest.mock('@services/userService');
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
jest.mock('next-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('UserLoginForm', () => {
    const mockPush = jest.fn();
    const mockLoginUser = jest.fn();
    const mockTranslate = jest.fn((key) => {
        const translations: { [key: string]: string } = {
            usernameRequired: 'Username is required',
            passwordRequired: 'Password is required',
            loginTitle: 'Login',
            loginButton: 'Login',
            loginSuccess: 'Login successful',
            loginError: 'Login failed',
            username: 'Username',
            password: 'Password',
            noAccount: "Don't have an account?",
            registerHere: 'Register here',
        };
        return translations[key] || key;
    });

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();

        // Mock router
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });

        // Mock translation
        (useTranslation as jest.Mock).mockReturnValue({
            t: mockTranslate,
        });

        // Mock login user service
        (userService.loginUser as jest.Mock).mockClear();
    });

    const renderComponent = () => {
        return render(<UserLoginForm />);
    };

    test('renders login form correctly', () => {
        renderComponent();

        // Check if all form elements are present
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    test('shows validation errors for empty fields', async () => {
        renderComponent();

        // Submit form without filling any fields
        const loginButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginButton);

        // Check for validation error messages
        expect(await screen.findByText('Username is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
    });

    test('successful login redirects to home page', async () => {
        // Mock successful login response
        (userService.loginUser as jest.Mock).mockResolvedValue({
            status: 200,
            json: () =>
                Promise.resolve({
                    token: 'fake-token',
                    username: 'testuser',
                    role: 'user',
                    userId: '123',
                }),
        });

        renderComponent();

        // Fill in login credentials
        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        // Check for success message
        await waitFor(() => {
            expect(screen.getByText('Login successful')).toBeInTheDocument();
        });

        // Verify session storage was set
        const storedUser = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
        expect(storedUser).toEqual({
            token: 'fake-token',
            username: 'testuser',
            role: 'user',
            userId: '123',
        });

        // Check if redirected to home page
        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    test('shows error message on login failure', async () => {
        // Mock login failure response
        (userService.loginUser as jest.Mock).mockResolvedValue({
            status: 401,
            json: () =>
                Promise.resolve({
                    message: 'Invalid credentials',
                }),
        });

        renderComponent();

        // Fill in login credentials
        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(loginButton);

        // Check for error message
        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });

    test('register link is present and correct', () => {
        renderComponent();

        const registerLink = screen.getByText('Register here');
        expect(registerLink).toBeInTheDocument();
        expect(registerLink).toHaveAttribute('href', '/register');
    });
});
