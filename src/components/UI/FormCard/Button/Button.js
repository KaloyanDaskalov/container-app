import classes from './Button.module.css';

export default function Button({ clicked, attributes, children, addClass }) {

    const classList = [classes.btn];

    if (addClass) {
        addClass.split(' ').forEach(c => classList.push(classes[c]));
    }

    return (
        <button
            className={classList.join(' ')}
            onClick={clicked}
            {...attributes}>
            {children}
        </button>
    );
}
