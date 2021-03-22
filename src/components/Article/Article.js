import image from '../../assets/images/pexels-pixabay-163726.jpg'

import classes from './Article.module.css';

export default function Article({ imageUrl = '', title = '', author = '', date = '', description = '' }) {
	return (
		<article className={classes.article}>
			<figure>
				<img
					className={classes.img}
					src={imageUrl}
					alt='article'
					onError={(e) => { e.target.src = image }}
				/>
			</figure>
			<article className={classes.info}>
				<header className={classes.header}>
					<h3 className={classes.title}>{title}</h3>
					<address className={classes.author}>by <span className={classes.bold}>{author}</span></address>
					<time className={classes.textTime}>on <span className={classes.bold}>{date}</span></time>
				</header>
				<p>{description}</p>
			</article>
		</article>
	);
}
