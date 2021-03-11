import classes from './Form.module.css';

export default function Form({ children, submit }) {
    return (
        <form className={classes.form} onSubmit={submit}>
            {children}
        </form>
    );
}
