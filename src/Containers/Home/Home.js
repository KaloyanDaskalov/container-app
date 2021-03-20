import { Link } from 'react-router-dom';

import { useAuth } from '../../state/Auth';

import Wrapper from '../../components/Wrapper/Wrapper';

import image from '../../assets/images/pexels-pixabay-163726.jpg';

import classes from './Home.module.css';

export default function Home() {

    const { user } = useAuth();



    return (
        <main className={classes.main}>
            <Wrapper>
                <h3 className={classes.greeting}>Hello {user.email}</h3>
                <Link>
                    <article className={classes.article}>
                        <figure className={classes.imgContainer}>
                            <img
                                className={classes.img}
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Star_wars2.svg/1200px-Star_wars2.svg"
                                alt="article img"
                                onError={(e) => { e.target.src = image }}
                            />
                        </figure>
                        <article className={classes.text}>
                            <h4>Star Wars</h4>
                            <p>test@test.com</p>
                            <p>The original film (Star Wars), retroactively subtitled Episode IV: A New Hope (1977), was followed by the sequels Episode V: The Empire Strikes Back (1980) and Episode VI: Return of the Jedi (1983), forming the original Star Wars trilogy. Lucas later returned to filmmaking to direct a prequel trilogy, consisting of Episode I: The Phantom Menace (1999), Episode II: Attack of the Clones (2002), and Episode III: Revenge of the Sith (2005). In 2012, Lucas sold his production company to Disney, relinquishing his ownership of the franchise. The subsequently produced sequel trilogy consists of Episode VII: The Force Awakens (2015), Episode VIII: The Last Jedi (2017), and Episode IX: The Rise of Skywalker (2019). </p>
                        </article>
                    </article>
                </Link>
                <Link>
                    <article className={classes.article}>
                        <figure >
                            <img
                                className={classes.img}
                                src="https://static.posters.cz/image/750/%D0%BF%D0%BB%D0%B0%D0%BA%D0%B0%D1%82/star-wars-the-rise-of-skywalker-galactic-encounter-i81806.jpg"
                                alt="article img"
                                onError={(e) => { e.target.src = image }}
                            />
                        </figure>
                        <article className={classes.text}>
                            <h4>Star Wars</h4>
                            <p>test@test.com</p>
                            <p>The original film (Star Wars), retroactively subtitled Episode IV: A New Hope (1977), was followed by the sequels Episode V: The Empire Strikes Back (1980) and Episode VI: Return of the Jedi (1983), forming the original Star Wars trilogy. Lucas later returned to filmmaking to direct a prequel trilogy, consisting of Episode I: The Phantom Menace (1999), Episode II: Attack of the Clones (2002), and Episode III: Revenge of the Sith (2005). In 2012, Lucas sold his production company to Disney, relinquishing his ownership of the franchise. The subsequently produced sequel trilogy consists of Episode VII: The Force Awakens (2015), Episode VIII: The Last Jedi (2017), and Episode IX: The Rise of Skywalker (2019). </p>
                        </article>
                    </article>
                </Link>
            </Wrapper>
        </main>
    );
}
