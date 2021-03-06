import classes from './HiddenMessage.module.css';

export default function HiddenMessage({ children = 'Message', showError }) {
    const classList =
        [
            classes.hiddenMessage,
            showError ? classes.show : '',
            children.includes('Success') ? classes.success : ''
        ].join(' ');

    return (
        <p className={classList}>
            {children}
        </p>
    )
}
