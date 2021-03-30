import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../state/Auth';
import useCommonState from '../../state/useCommonState';
import useFetch from '../../Hooks/useFetch';
import { converter } from '../../Utility/index';

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
    const { error, message, loading, dispatch } = useCommonState();
    const [articles, setArticles] = useState(null);
    const fetchData = useFetch();

    const getData = useCallback(() => {
        dispatch({ type: 'RESET_ERRORS' });
        dispatch({ type: 'START_LOADING' });

        fetchData('articles.json')
            .then(data => setArticles(converter(data)))
            .catch((err) => dispatch({ type: 'ASYNC_ERROR', err: (err.message || err) }));

        dispatch({ type: 'END_LOADING' });
    }, [dispatch, fetchData]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <Main>
            <Wrapper addClass='card'>
                <Title addClass='crayola'>Hello {user.email}</Title>
                <HiddenMessage showError={error}>{message}</HiddenMessage>
                <WeatherWidget />
            </Wrapper>
            <Wrapper>
                {loading ? <Loader /> : articles?.map(a =>
                    <Link to={'/details/' + a.id} key={a.id} className={classes.link}>
                        <Article  {...a} />
                    </Link>)}
            </Wrapper>
        </Main>
    );
}
