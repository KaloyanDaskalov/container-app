import { useEffect, useState, useCallback } from 'react';

import useFetch from '../../Hooks/useFetch';
import { useAuth } from '../../state/Auth';
import useCommonState from '../../state/useCommonState';

import Main from '../../components/Main/Main';
import Wrapper from '../../components/Wrapper/Wrapper';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Article from '../../components/Article/Article';
import Loader from '../../components/UI/Loader/Loader';
import Button from '../../components/UI/FormCard/Button/Button';
import Buttons from '../../components/UI/Buttons/Buttons';

export default function Details(props) {

	const { user } = useAuth();
	const { state: { error, message, loading }, dispatch } = useCommonState();
	const [article, setArticle] = useState(null);
	const fetchData = useFetch();
	const currentId = props.match.params.id;

	const getData = useCallback(() => {
		dispatch({ type: 'RESET_ERRORS' });
		dispatch({ type: 'START_LOADING' });

		fetchData(`articles/${currentId}.json`)
			.then(setArticle)
			.catch((err) => dispatch({ type: 'ASYNC_ERROR', err: (err.message || err) }));

		dispatch({ type: 'END_LOADING' });
	}, [dispatch, fetchData, currentId]);

	useEffect(() => {
		getData()
	}, [getData]);

	const deleteHandler = async (id) => {
		dispatch({ type: 'RESET_ERRORS' });

		try {
			dispatch({ type: 'START_LOADING' });
			await fetchData(`articles/${id}.json`, { method: 'DELETE' });
			props.history.push('/my-articles');
		} catch (err) {
			dispatch({ type: 'ASYNC_ERROR', err: (err.message || err) });
		}

		dispatch({ type: 'END_LOADING' });
	}

	const likeHandler = async () => {

		dispatch({ type: 'START_LOADING' });

		const likes = { [user.uid]: user.uid, ...article.likes }

		try {
			dispatch({ type: 'START_LOADING' });

			const response = await fetchData(`articles/${currentId}.json`, {
				method: 'PATCH',
				body: JSON.stringify({ likes })
			});

			setArticle({ ...article, likes: response.likes });
			dispatch({ type: 'SUCCESS', success: `Success! You liked ${article.title}` });
		} catch (err) {
			dispatch({ type: 'ASYNC_ERROR', err: (err.message || err) });
		}

		dispatch({ type: 'END_LOADING' });
	};

	let userButtons = (
		<>
			<Button
				clicked={() => props.history.push('/update/' + currentId)}
				addClass='border' >
				Update
			</Button>
			<Button
				clicked={() => deleteHandler(currentId)}
				addClass='border' >
				Delete
			</Button>
		</>
	);

	if (article && article.userId !== user.uid) {
		const isDisabled = article.likes.hasOwnProperty(user.uid);
		userButtons = <Button clicked={likeHandler} attributes={{ disabled: isDisabled }}>Like</Button>
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
