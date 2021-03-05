import Background from '../../components/Background/Background';

import classes from './Form.module.css';

export default function Login() {
	return (
		<Background>
			<article className={classes.FormCard} >
				<h2 className={classes.Heading}>Login</h2>
				<p className={classes.HeaderMessage}>
					Not a member? Sign Up Now
					</p>
				<p className={[classes.Message, classes.Show].join(' ')}>Error Message</p>
				<form className={classes.Form} >
					<input className={classes.Input} type="text" placeholder="Email" />
					<input className={classes.Input} type="password" placeholder="Password" />
					<button type="submit" className={classes.Btn}>Login</button>
				</form>
				<p className={classes.HeaderMessage} >
					Forgot Password
					</p>
			</article>
		</Background>
	)
}
