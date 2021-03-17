import classes from './Title.module.css';

export default function Title({ children, addClass }) {

    const classList = [classes.title];

    if (addClass) {
        addClass.split(' ').forEach(c => classList.push(classes[c]));
    }

    return (
        <h2 className={classList.join(' ')}>
            {children}
        </h2>
    );
}





