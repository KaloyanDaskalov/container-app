import classes from './Button.module.css';

export default function Button({ clicked, attributes, children }) {
    return (
        <button
            className={classes.btn}
            onClick={clicked}
            {...attributes}>
            {children}
        </button>
    );
}
