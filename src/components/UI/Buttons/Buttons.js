import classes from './Buttons.module.css';

export default function Buttons({ children }) {
    return (
        <div className={classes.buttons}>
            {children}
        </div>
    );
}

