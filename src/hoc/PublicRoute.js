import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../state/Auth';

export default function PublicRoute({ component: Component, ...rest }) {
    const { user } = useAuth();

    return (
        <Route {...rest}
            render={(props) => { return !user ? <Component {...props} /> : <Redirect to='/' /> }} />
    );
}
