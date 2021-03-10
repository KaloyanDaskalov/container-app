import Background from '../../Background/Background';

import classes from './FormCard.module.css';

export default function FormCard({ children }) {
    return (
        <Background>
            <div className={classes.formCard}>
                {children}
            </div>
        </Background>
    )
}
