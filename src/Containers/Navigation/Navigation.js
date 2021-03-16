import logo from '../../assets/logo/logo.svg';
import Wrapper from '../../components/Wrapper/Wrapper';
import NavLink from '../../components/UI/NavLink/NavLink';
import Separator from '../../components/Separator/Separator';

import classes from './Navigation.module.css';

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
                            <NavLink href='/login' addClass={'link'}>Login</NavLink>
                        </li>
                        <li>
                            <NavLink href='/signup' addClass={'link'}>Register</NavLink>
                        </li>
                    </ul>
                </nav>
            </Wrapper>
            <Separator />
        </header>
    )
}
