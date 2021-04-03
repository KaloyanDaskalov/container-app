import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../state/Auth';
import useFetch from '../../Hooks/useFetch';
import { converter } from '../../Utility/index';

import Main from '../../components/Main/Main';
import Wrapper from '../../components/Wrapper/Wrapper';
import Title from '../../components/UI/FormCard/Title/Title';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Article from '../../components/Article/Article';
import Loader from '../../components/UI/Loader/Loader';

export default function MyArticles() {

    const { user } = useAuth();
    const { fetchQuery, fetchLoading, fetchError, fetchData, fetchErrorMessage } = useFetch();

    useEffect(() => {
        fetchQuery(`articles.json?orderBy="userId"&equalTo="${user.uid}"`);
    }, [fetchQuery, user.uid]);

    return (
        <Main>
            <Wrapper addClass='card'>
                <Title addClass='crayola'>Hello {user.email}</Title>
                <HiddenMessage showError={fetchError}>{fetchErrorMessage}</HiddenMessage>
            </Wrapper>
            <Wrapper >
                {fetchLoading ? <Loader /> : converter(fetchData)?.map(a =>
                    <Link to={'/details/' + a.id} key={a.id}>
                        <Article  {...a} />
                    </Link>)}
            </Wrapper>
        </Main>
    );
}