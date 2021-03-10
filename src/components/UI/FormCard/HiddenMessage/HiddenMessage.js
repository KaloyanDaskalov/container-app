import classes from './HiddenMessage.module.css';

export default function HiddenMessage({ children }) {
    return (
        <p className={[classes.hiddenMessage, classes.show].join(' ')}>
            {children}
        </p>
    )
}
