import { useEffect, useState } from 'react';

import { useAuth } from '../../state/Auth';
import useCommonState from '../../state/useCommonState';

import Wrapper from '../../components/Wrapper/Wrapper';
import Title from '../../components/UI/FormCard/Title/Title';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Article from '../../components/Article/Article';
import Loader from '../../components/UI/Loader/Loader';

import classes from './Home.module.css';

export default function Home() {

    const { user } = useAuth();
    const { error, message, loading, dispatch } = useCommonState();
    const [articles, setArticles] = useState(null);

    const converter = (object = {}) => {

        const arrayOfArticles = [];

        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const slicedText = { description: object[key].description.slice(0, 49) + '...' }
                arrayOfArticles.push({ id: key, ...object[key], ...slicedText });
            }
        }

        return arrayOfArticles;
    };

    useEffect(() => {
        dispatch({ type: 'RESET_ERRORS' });
        dispatch({ type: 'START_LOADING' });
        fetch('https://containers-app-default-rtdb.europe-west1.firebasedatabase.app/articles.json')
            .then(res => res.json())
            .then(data => setArticles(converter(data)))
            .catch(err => dispatch({ type: 'ASYNC_ERROR', err: err.message || 'Failed to load' }))
            .finally(() => dispatch({ type: 'END_LOADING' }));
    }, [dispatch]);

    return (
        <main className={classes.main}>
            <Wrapper addClass='card'>
                <Title addClass='crayola'>Hello {user.email}</Title>
                <HiddenMessage showError={error}>{message}</HiddenMessage>
            </Wrapper>
            <Wrapper>
                {loading ? <Loader /> : articles?.map(a => <Article key={a.id} {...a} />)}
            </Wrapper>
        </main>
    );
}
