import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../state/Auth';
import SignUp from './SignUp';

test('Checking links from registered users', () => {
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ user: true }}>
                <SignUp />
            </AuthContext.Provider>
        </BrowserRouter>
    );
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');
    const inputConfirmPassword = screen.getByPlaceholderText('Confirm Password');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputConfirmPassword).toBeInTheDocument();
});
