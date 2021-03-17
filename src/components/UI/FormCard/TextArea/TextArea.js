import classes from './TextArea.module.css';

export default function TextArea({ showError, getValue, attributes }) {
    const classList = [classes.area];

    if (showError) {
        classList.push(classes.error);
    }

    return (
        <textarea className={classList.join(' ')} onChange={getValue}  {...attributes} ></textarea>
    );
}
