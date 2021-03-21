import { useAuth } from '../../state/Auth'

import logo from '../../assets/logo/logo.svg';
import Wrapper from '../../components/Wrapper/Wrapper';
import NavLink from '../../components/UI/NavLink/NavLink';
import Separator from '../../components/Separator/Separator';

import classes from './Navigation.module.css';

const unRegistered = [
    { name: 'LOGIN', path: '/login' },
    { name: 'SIGN UP', path: '/signup' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACTS', path: '/contact' },
];

const registered = [
    { name: 'CREATE', path: '/create' },
    { name: 'MY ARTICLES', path: '/my-articles' },
    { name: 'PROFILE', path: '/profile' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACTS', path: '/contact' },
];


export default function Navigation() {

    const { user } = useAuth();
    let links = null;

    if (user) {
        links = registered;
    } else {
        links = unRegistered;
    }

    return (
        <header className={classes.header}>
            <Wrapper addClass='flex'>
                <div className={classes.logo}>
                    <NavLink href='/' ><img src={logo} alt="logo" /></NavLink>
                </div>
                <nav>
                    <ul className={classes.navbar}>
                        {
                            links.map(l => {
                                return (
                                    <li key={l.name}>
                                        <NavLink href={l.path} addClass={'link'}>{l.name}</NavLink>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </nav>
            </Wrapper>
            <Separator />
        </header>
    );
}
