import Background from '../../components/Background/Background';

import classes from './Form.module.css';

export default function SignUp() {
	return (
		<Background>
			<article className={classes.FormCard} >
				<h2 className={classes.Heading}>Sign Up</h2>
				<p className={classes.HeaderMessage}>
					Already a member? Login
					</p>
				<p className={[classes.Message, classes.Show].join(' ')}>Error Message</p>
				<form className={classes.Form} >
					<input className={classes.Input} type="text" placeholder="Email" />
					<input className={classes.Input} type="password" placeholder="Password" />
					<input className={classes.Input} type="password" placeholder="Password" />
					<p className={classes.Instructions}>Password must be at least 6 characters long</p>
					<button type="submit" className={classes.Btn}>Sign Up</button>
				</form>
			</article>
		</Background>
	)
}
