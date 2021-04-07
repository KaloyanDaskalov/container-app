import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../state/Auth';
import Navigation from './Navigation';

test('Checking links from registered users', () => {
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ user: true }}>
                <Navigation />
            </AuthContext.Provider>
        </BrowserRouter>
    );
    const linkElement = screen.getAllByText(/HOME/i);
    expect(linkElement[0]).toBeInTheDocument();
    expect(linkElement[1]).toBeInTheDocument();
});

test('Checking links from unregistered users', () => {
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ user: false }}>
                <Navigation />
            </AuthContext.Provider>
        </BrowserRouter>
    );
    const linkElement = screen.getAllByText(/LOGIN/i);
    expect(linkElement[0]).toBeInTheDocument();
    expect(linkElement[1]).toBeInTheDocument();
});

// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
