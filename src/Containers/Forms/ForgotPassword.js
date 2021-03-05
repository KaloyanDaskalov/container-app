import Background from '../../components/Background/Background';

import classes from './Form.module.css';

export default function ForgotPassword() {
	return (
		<Background>
			<article className={classes.FormCard} >
				<h2 className={classes.Heading}>Password Reset</h2>
				<p className={[classes.Message, classes.Show].join(' ')}>Error Message</p>
				<form className={classes.Form} >
					<input className={classes.Input} type="text" placeholder="Email" />
					<button type="submit" className={classes.Btn}>Reset</button>
				</form>
				<p className={classes.HeaderMessage} >
					Login
					</p>
			</article>
		</Background>
	)
}
