import { useEffect } from 'react';

import useFetch from '../../Hooks/useFetch';
import { useAuth } from '../../state/Auth';
import { setMessage } from '../../Utility/index';

import Main from '../../components/Main/Main';
import Wrapper from '../../components/Wrapper/Wrapper';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Article from '../../components/Article/Article';
import Loader from '../../components/UI/Loader/Loader';
import Button from '../../components/UI/FormCard/Button/Button';
import Buttons from '../../components/UI/Buttons/Buttons';

export default function Details(props) {

	const { user } = useAuth();
	const { fetchQuery, queryDispatch, fetchLoading, fetchError, fetchSuccess, fetchErrorMessage, fetchSuccessMessage, fetchData } = useFetch();
	const currentId = props.match.params.id;

	useEffect(() => {
		fetchQuery(`articles/${currentId}.json`);

		return () => queryDispatch({ type: 'RESET' });

	}, [fetchQuery, currentId, queryDispatch]);

	const deleteHandler = (id) => {
		fetchQuery(`articles/${id}.json`, { method: 'DELETE' }, '', '/my-articles');
	}

	const likeHandler = () => {
		const likes = { [user.uid]: user.uid, ...fetchData.likes };

		fetchQuery(`articles/${currentId}.json`, {
			method: 'PUT',
			body: JSON.stringify({ ...fetchData, likes })
		},
			`Success! You liked ${fetchData.title}`);
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

	if (fetchData && fetchData.userId !== user.uid) {
		const isDisabled = fetchData.likes.hasOwnProperty(user.uid);
		userButtons = <Button clicked={likeHandler} attributes={{ disabled: isDisabled }}>Like</Button>
	}

	return (
		<Main>
			<Wrapper addClass='card'>
				<HiddenMessage showError={fetchError || fetchSuccess}>
					{setMessage(fetchError, fetchSuccess, fetchErrorMessage, fetchSuccessMessage)}
				</HiddenMessage>
			</Wrapper>
			<Wrapper>
				{fetchLoading ? <Loader /> : <Article {...fetchData} detailedView={true} />}
				<Buttons>
					{fetchLoading ? <Loader /> : userButtons}
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
