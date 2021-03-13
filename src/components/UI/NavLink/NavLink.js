import { Link } from 'react-router-dom';

import classes from './NavLink.module.css';

export default function NavLink({ href, addClass, children }) {

	const classList = [classes.reset];

	if (addClass) {
		addClass.split(' ').forEach(c => classList.push(classes[c]));
	}

	return (
		<Link to={href} className={classList.join(' ')}>{children}</Link>
	);
}
