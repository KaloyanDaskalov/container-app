import classes from './Title.module.css';

export default function Title({ children }) {
    return (
        <h2 className={classes.title}>
            {children}
        </h2>
    );
}
