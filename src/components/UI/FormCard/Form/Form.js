import classes from './Form.module.css';

export default function Form({ children, submit, addClass }) {

    const classList = [classes.form];

    if (addClass) {
        addClass.split(' ').forEach(c => classList.push(classes[c]));
    }

    return (
        <form className={classList.join(' ')} onSubmit={submit}>
            {children}
        </form>
    );
}
