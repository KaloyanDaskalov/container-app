import classes from './Navigation.module.css';
import logo from '../../assets/logo/logo.svg';

export default function Navigation() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <img src={logo} alt="" />
            </div>
            <nav>
                <ul className={classes.navbar}>
                    <li>
                        Login
                    </li>
                    <li>
                        Register
                    </li>
                </ul>
            </nav>
        </header>
    )
}
