import logo from '../../assets/logo/logo.svg';
import Wrapper from '../../components/Wrapper/Wrapper';
import NavLink from '../../components/UI/NavLink/NavLink';
import Separator from '../../components/Separator/Separator';

import classes from './Navigation.module.css';

// const unRegistered = ['LOGIN', 'SIGN UP', 'ABOUT', 'CONTACT US'];
// const registered = ['HOME', 'CREATE', 'MY ARTICLES', 'PROFILE', 'ABOUT', 'CONTACT US'];

export default function Navigation() {

    return (
        <header className={classes.header}>
            <Wrapper addClass='flex'>
                <div className={classes.logo}>
                    <NavLink href='/' ><img src={logo} alt="logo" /></NavLink>
                </div>
                <nav>
                    <ul className={classes.navbar}>
                        <li>
                            <NavLink href='/login' addClass={'link'}>LOGIN</NavLink>
                        </li>
                        <li>
                            <NavLink href='/signup' addClass={'link'}>REGISTER</NavLink>
                        </li>
                        <li>
                            <NavLink href='/about' addClass={'link'}>ABOUT</NavLink>
                        </li>
                        <li>
                            <NavLink href='/contact' addClass={'link'}>CONTACTS</NavLink>
                        </li>
                    </ul>
                </nav>
            </Wrapper>
            <Separator />
        </header>
    );
}
