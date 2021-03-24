import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../state/Auth';
import useCommonState from '../../state/useCommonState';

import Main from '../../components/Main/Main';
import Wrapper from '../../components/Wrapper/Wrapper';
import Title from '../../components/UI/FormCard/Title/Title';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Article from '../../components/Article/Article';
import Loader from '../../components/UI/Loader/Loader';

export default function MyArticles() {

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
        fetch('https://containers-app-default-rtdb.europe-west1.firebasedatabase.app/articles.json?orderBy="userId"&equalTo="' + user.uid + '"')
            .then(res => res.json())
            .then(data => setArticles(converter(data)))
            .catch(err => dispatch({ type: 'ASYNC_ERROR', err: (err.message || 'Failed to load') }))
            .finally(() => dispatch({ type: 'END_LOADING' }));
    }, [dispatch, user.uid]);

    return (
        <Main>
            <Wrapper addClass='card'>
                <Title addClass='crayola'>Hello {user.email}</Title>
                <HiddenMessage showError={error}>{message}</HiddenMessage>
            </Wrapper>
            <Wrapper >
                {loading ? <Loader /> : articles?.map(a =>
                    <Link to={'/details/' + a.id} key={a.id}>
                        <Article  {...a} />
                    </Link>)}
            </Wrapper>
        </Main>
    );
}