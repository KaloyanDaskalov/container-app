import classes from './Button.module.css';

export default function Button({ clicked, attributes, children, disabled = false }) {
    return (
        <button className={classes.btn} onClick={clicked} {...attributes} disabled={disabled}>{children}</button>
    );
}
