import Background from '../../Background/Background';

import classes from './FormCard.module.css';

export default function FormCard({ children, addClass }) {

    const classList = [classes.formCard];

    if (addClass) {
        addClass.split(' ').forEach(c => classList.push(classes[c]));
    }


    return (
        <Background>
            <div className={classList.join(' ')}>
                {children}
            </div>
        </Background>
    )
}
