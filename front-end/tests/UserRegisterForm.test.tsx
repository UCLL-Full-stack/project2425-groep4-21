// UserRegisterForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserRegisterForm from '../components/user/UserRegisterForm';
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

describe('UserRegisterForm', () => {
    const mockPush = jest.fn();
    const mockRegisterUser = jest.fn();
    const mockTranslate = jest.fn((key) => {
        const translations: { [key: string]: string } = {
            registerTitle: 'Register',
            voornaam: 'First Name',
            naam: 'Last Name',
            gebruikersnaam: 'Username',
            rol: 'Role',
            emailadres: 'Email Address',
            portfolio: 'Portfolio',
            niveau: 'Level',
            bevoegdheden: 'Permissions',
            password: 'Password',
            registerButton: 'Register',
            registrationFailed: 'Registration failed',
            registrationError: 'An error occurred during registration',
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

        // Mock register user service
        (userService.registerUser as jest.Mock).mockClear();
    });

    const renderComponent = () => {
        return render(<UserRegisterForm />);
    };

    test('renders registration form correctly', () => {
        renderComponent();

        // Controleer op alle labels en invoervelden
        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Role')).toBeInTheDocument();
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
        expect(screen.getByLabelText('Portfolio')).toBeInTheDocument();
        expect(screen.getByLabelText('Level')).toBeInTheDocument();
        expect(screen.getByLabelText('Permissions')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();

        // Controleer op de verzendknop
        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    });

    test('updates form fields on user input', () => {
        renderComponent();

        // Vul de invoervelden in
        fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'user' } });
        fireEvent.change(screen.getByLabelText('Email Address'), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Portfolio'), {
            target: { value: 'Portfolio Link' },
        });
        fireEvent.change(screen.getByLabelText('Level'), { target: { value: 'Intermediate' } });
        fireEvent.change(screen.getByLabelText('Permissions'), { target: { value: 'Read-Only' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

        // Controleer of de waarden correct zijn bijgewerkt
        expect((screen.getByLabelText('First Name') as HTMLInputElement).value).toBe('John');
        expect((screen.getByLabelText('Last Name') as HTMLInputElement).value).toBe('Doe');
        expect((screen.getByLabelText('Username') as HTMLInputElement).value).toBe('johndoe');
        expect((screen.getByLabelText('Role') as HTMLInputElement).value).toBe('user');
        expect((screen.getByLabelText('Email Address') as HTMLInputElement).value).toBe(
            'john@example.com'
        );
        expect((screen.getByLabelText('Portfolio') as HTMLInputElement).value).toBe(
            'Portfolio Link'
        );
        expect((screen.getByLabelText('Level') as HTMLInputElement).value).toBe('Intermediate');
        expect((screen.getByLabelText('Permissions') as HTMLInputElement).value).toBe('Read-Only');
        expect((screen.getByLabelText('Password') as HTMLInputElement).value).toBe('password123');
    });

    test('successful registration redirects to login page', async () => {
        // Mock succesvolle registratie
        (userService.registerUser as jest.Mock).mockResolvedValue({
            status: 201,
        });

        renderComponent();

        // Vul de invoervelden in
        fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'user' } });
        fireEvent.change(screen.getByLabelText('Email Address'), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Portfolio'), {
            target: { value: 'Portfolio Link' },
        });
        fireEvent.change(screen.getByLabelText('Level'), { target: { value: 'Intermediate' } });
        fireEvent.change(screen.getByLabelText('Permissions'), { target: { value: 'Read-Only' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

        // Verstuur het formulier
        const registerButton = screen.getByRole('button', { name: 'Register' });
        fireEvent.click(registerButton);

        // Wacht op de router.push aanroep
        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/login');
        });

        // Controleer dat er geen foutmeldingen zijn weergegeven
        expect(screen.queryByText('Registration failed')).not.toBeInTheDocument();
        expect(screen.queryByText('An error occurred during registration')).not.toBeInTheDocument();
    });

    test('registration failure displays error message', async () => {
        // Mock registratie mislukking met een foutbericht
        (userService.registerUser as jest.Mock).mockResolvedValue({
            status: 400,
            json: () => Promise.resolve({ message: 'Username already exists' }),
        });

        renderComponent();

        // Vul de invoervelden in
        fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'user' } });
        fireEvent.change(screen.getByLabelText('Email Address'), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Portfolio'), {
            target: { value: 'Portfolio Link' },
        });
        fireEvent.change(screen.getByLabelText('Level'), { target: { value: 'Intermediate' } });
        fireEvent.change(screen.getByLabelText('Permissions'), { target: { value: 'Read-Only' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

        // Verstuur het formulier
        const registerButton = screen.getByRole('button', { name: 'Register' });
        fireEvent.click(registerButton);

        // Wacht op de foutmelding
        await waitFor(() => {
            expect(screen.getByText('Username already exists')).toBeInTheDocument();
        });

        // Controleer dat router.push niet is aangeroepen
        expect(mockPush).not.toHaveBeenCalled();
    });

    test('registration error displays general error message', async () => {
        // Mock een netwerkfout
        (userService.registerUser as jest.Mock).mockRejectedValue(new Error('Network Error'));

        renderComponent();

        // Vul de invoervelden in
        fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'user' } });
        fireEvent.change(screen.getByLabelText('Email Address'), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Portfolio'), {
            target: { value: 'Portfolio Link' },
        });
        fireEvent.change(screen.getByLabelText('Level'), { target: { value: 'Intermediate' } });
        fireEvent.change(screen.getByLabelText('Permissions'), { target: { value: 'Read-Only' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

        // Verstuur het formulier
        const registerButton = screen.getByRole('button', { name: 'Register' });
        fireEvent.click(registerButton);

        // Wacht op de algemene foutmelding
        await waitFor(() => {
            expect(screen.getByText('An error occurred during registration')).toBeInTheDocument();
        });

        // Controleer dat router.push niet is aangeroepen
        expect(mockPush).not.toHaveBeenCalled();
    });
});
