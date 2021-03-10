import classes from './Input.module.css';

export default function Input({ showError, getValue, attributes }) {
    const classList = [classes.input];

    if (showError) {
        classList.push(classes.error);
    }

    return (
        <input className={classList.join(' ')} onChange={getValue}  {...attributes} />
    );
}
