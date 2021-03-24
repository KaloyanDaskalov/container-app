import { useEffect, useState } from 'react';
import { useAuth } from '../../state/Auth';
import useCommonState from '../../state/useCommonState';

import Main from '../../components/Main/Main';
import Wrapper from '../../components/Wrapper/Wrapper';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage'
import Article from '../../components/Article/Article';
import Loader from '../../components/UI/Loader/Loader';
import Button from '../../components/UI/FormCard/Button/Button';
import Buttons from '../../components/UI/Buttons/Buttons';
// import classes from './Details.module.css';

export default function Details(props) {

	const { user } = useAuth();
	const { error, message, loading, dispatch } = useCommonState();
	const [article, setArticle] = useState(null);

	const deleteHandler = (id) => {
		dispatch({ type: 'RESET_ERRORS' });
		dispatch({ type: 'START_LOADING' });
		fetch('https://containers-app-default-rtdb.europe-west1.firebasedatabase.app/articles/' + id + '.json', { method: 'DELETE' })
			.then(res => res.json())
			.then(data => setArticle(data))
			.catch(err => dispatch({ type: 'ASYNC_ERROR', err: (err.message || 'Failed to load') }))
			.finally(() => dispatch({ type: 'END_LOADING' }));

		props.history.push('/my-articles')
	}

	useEffect(() => {
		dispatch({ type: 'RESET_ERRORS' });
		dispatch({ type: 'START_LOADING' });
		fetch('https://containers-app-default-rtdb.europe-west1.firebasedatabase.app/articles/' + props.match.params.id + '.json')
			.then(res => res.json())
			.then(data => setArticle(data))
			.catch(err => dispatch({ type: 'ASYNC_ERROR', err: (err.message || 'Failed to load') }))
			.finally(() => dispatch({ type: 'END_LOADING' }));
	}, [dispatch, props.match.params.id]);

	let userButtons = (
		<>
			<Button
				clicked={() => props.history.push('/update/' + props.match.params.id)}
				addClass='border' >
				Update
			</Button>
			<Button
				clicked={() => deleteHandler(props.match.params.id)}
				addClass='border' >
				Delete
			</Button>
		</>
	);

	if (user.uid !== article?.userId) {
		userButtons = <Button>Like</Button>
	}

	return (
		<Main>
			<Wrapper addClass='card'>
				<HiddenMessage showError={error}>{message}</HiddenMessage>
			</Wrapper>
			<Wrapper>
				{loading ? <Loader /> : <Article {...article} detailedView={true} />}
				<Buttons>
					{userButtons}
				</Buttons>
				<Buttons>
					<Button
						clicked={() => props.history.push('/')}
						addClass='border' >
						Home
					</Button>
					<Button
						clicked={() => props.history.push('/my-articles')}
						addClass='border' >
						My Articles
					</Button>
				</Buttons>
			</Wrapper>
		</Main >
	);
}
