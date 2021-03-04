import classes from './Background.module.css';

export default function Background({ children }) {
    return (
        <div className={classes.Container}>
            {children}
        </div>
    )
}
