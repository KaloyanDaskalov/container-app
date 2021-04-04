import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../state/Auth';
import useFetch from '../../Hooks/useFetch';
import { converter, helloTitle } from '../../Utility/index';

import Main from '../../components/Main/Main';
import Wrapper from '../../components/Wrapper/Wrapper';
import Title from '../../components/UI/FormCard/Title/Title';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Article from '../../components/Article/Article';
import Loader from '../../components/UI/Loader/Loader';
import WeatherWidget from '../WeatherWidget/WeatherWidget';

import classes from './Home.module.css';

export default function Home() {

    const { user } = useAuth();
    const { fetchQuery, fetchLoading, fetchError, fetchData, fetchErrorMessage } = useFetch();


    useEffect(() => {
        fetchQuery('articles.json');
        window.scrollTo(0, 0);
    }, [fetchQuery]);

    return (
        <Main>
            <Wrapper addClass='card'>
                <Title addClass='crayola'>Hello {helloTitle(user.email)}</Title>
                <HiddenMessage showError={fetchError}>{fetchErrorMessage}</HiddenMessage>
                <WeatherWidget />
            </Wrapper>
            <Wrapper>
                {fetchLoading ? <Loader /> : converter(fetchData)?.map(a =>
                    <Link to={'/details/' + a.id} key={a.id} className={classes.link}>
                        <Article  {...a} />
                    </Link>)}
            </Wrapper>
        </Main>
    );
}
