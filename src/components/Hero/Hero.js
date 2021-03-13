import Background from '../Background/Background';

import classes from './Hero.module.css';

export default function Hero() {
    return (
        <Background>
            <div className={classes.banner}>
                <h1 className={classes.title}>Containers</h1>
                <p className={classes.slogan}>
                    <span className={classes.red}>Share</span>, <span className={classes.red}>throw</span> ,  or <span className={classes.red}>dump</span> your thoughts here!
                </p>
            </div>
        </Background>
    );
}
