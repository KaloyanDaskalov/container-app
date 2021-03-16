import { useAuth } from '../../state/Auth';

import Wrapper from '../../components/Wrapper/Wrapper';
import Button from '../../components/UI/FormCard/Button/Button';

import classes from './Home.module.css';

export default function Home() {

    const { logout } = useAuth();

    const logoutHandler = () => {
        try {
            logout();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main className={classes.main}>
            <Wrapper>Here</Wrapper>
            <Button clicked={() => logoutHandler()} >Log Out</Button>
        </main>
    );
}
