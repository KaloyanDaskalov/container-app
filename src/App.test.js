import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './state/Auth';
import App from './App';

test('Checking links from registered users', () => {
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ user: false }}>
                <App />
            </AuthContext.Provider>
        </BrowserRouter>
    );
    const title = screen.getByText('Containers');
    expect(title).toBeInTheDocument();
});



