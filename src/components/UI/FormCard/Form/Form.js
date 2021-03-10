import classes from './Form.module.css';

export default function Form({ children }) {
    return (
        <form className={classes.form}>
            {children}
        </form>
    );
}
