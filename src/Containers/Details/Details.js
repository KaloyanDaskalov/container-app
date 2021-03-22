import { useEffect, useState } from 'react';
import useCommonState from '../../state/useCommonState';

import Main from '../../components/Main/Main';
import Wrapper from '../../components/Wrapper/Wrapper';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage'
import Article from '../../components/Article/Article';
import Loader from '../../components/UI/Loader/Loader';
import Button from '../../components/UI/FormCard/Button/Button';
// import classes from './Details.module.css';

export default function Details(props) {

	const { error, message, loading, dispatch } = useCommonState();
	const [article, setArticle] = useState(null);

	useEffect(() => {
		dispatch({ type: 'RESET_ERRORS' });
		dispatch({ type: 'START_LOADING' });
		fetch('https://containers-app-default-rtdb.europe-west1.firebasedatabase.app/articles/' + props.match.params.id + '.json')
			.then(res => res.json())
			.then(data => setArticle(data))
			.catch(err => dispatch({ type: 'ASYNC_ERROR', err: (err.message || 'Failed to load') }))
			.finally(() => dispatch({ type: 'END_LOADING' }));
	}, [dispatch, props.match.params.id]);

	return (
		<Main>
			<Wrapper addClass='card'>
				<HiddenMessage showError={error}>{message}</HiddenMessage>
			</Wrapper>
			<Wrapper addClass='details'>
				{loading ? <Loader /> : <Article {...article} />}
				<Button clicked={() => props.history.push('/')}>Home</Button>
				<Button clicked={() => props.history.push('/my-articles')}>My Articles</Button>
			</Wrapper>
		</Main>
	);
}
