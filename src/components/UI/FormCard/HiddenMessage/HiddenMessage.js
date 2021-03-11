import classes from './HiddenMessage.module.css';

export default function HiddenMessage({ children, showError }) {
    const classList = [classes.hiddenMessage, showError ? classes.show : ''].join(' ');

    return (
        <p className={classList}>
            {children}
        </p>
    )
}
