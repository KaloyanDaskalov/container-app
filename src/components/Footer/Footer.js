import classes from './Footer.module.css';

export default function Footer() {

    const date = new Date().getFullYear();

    return (
        <footer className={classes.footer}>
            <p className={classes.footerText}>Copyright &copy; {date} Containers.bg. All rights reserved</p>
        </footer>
    )
}
