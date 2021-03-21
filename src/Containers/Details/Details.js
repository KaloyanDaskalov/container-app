import { useEffect, useState } from 'react';
import useCommonState from '../../state/useCommonState';
// import image from '../../assets/images/pexels-pixabay-163726.jpg';

import Wrapper from '../../components/Wrapper/Wrapper';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage'

// import classes from './Details.module.css';

export default function Details(props) {

	// const { user } = useAuth();
	const { error, message, loading, dispatch } = useCommonState();
	// const [article, setArticle] = useState(null);
	console.log('props:', props)

	useEffect(() => {
		dispatch({ type: 'RESET_ERRORS' });
		dispatch({ type: 'START_LOADING' });
		fetch('https://containers-app-default-rtdb.europe-west1.firebasedatabase.app/articles/-MWK_AyGnYqRe7unzmRd.json')
			.then(res => res.json())
			.then(data => console.log('data:', data))
			.catch(err => dispatch({ type: 'ASYNC_ERROR', err: err.message || 'Failed to load' }))
			.finally(() => dispatch({ type: 'END_LOADING' }));
	}, [dispatch]);

	return (
		<Wrapper addClass='flex height'>
			<HiddenMessage showError={error}>{message}</HiddenMessage>
			Here
		</Wrapper>
	);
}

// <article className={classes.article}>
// 	<figure>
// 		<img
// 			className={classes.img}
// 			src={imageUrl}
// 			alt='article'
// 			onError={(e) => { e.target.src = image }}
// 		/>
// 	</figure>
// 	<article className={classes.info}>
// 		<header className={classes.header}>
// 			<h3 className={classes.title}>{title}</h3>
// 			<address className={classes.author}>by <span className={classes.bold}>{author}</span></address>
// 			<time className={classes.textTime}>on <span className={classes.bold}>{date}</span></time>
// 		</header>
// 		<p>{description}</p>
// 	</article>
// </article>