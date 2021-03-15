import { useState } from 'react';

import { useAuth } from '../../state/Auth';
import useCommonState from '../../state/useCommonState';
import { emailValidation, checkLength, isEqual } from '../../Utility/index';

import FormCard from '../../components/UI/FormCard/FormCard';
import Title from '../../components/UI/FormCard/Title/Title';
import Message from '../../components/UI/FormCard/Message/Message';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Form from '../../components/UI/FormCard/Form/Form';
import Input from '../../components/UI/FormCard/Input/Input';
import Button from '../../components/UI/FormCard/Button/Button';
import NavLink from '../UI/NavLink/NavLink';
import Loader from '../UI/Loader/Loader';

export default function SignUp() {

	const { state: { email, password, confirmPassword, error, message, emailError, passwordError, confirmPasswordError }, dispatch } = useCommonState();

	const { signup } = useAuth();

	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();

		dispatch({ type: 'RESET_ERRORS' });

		if (!emailValidation(email)) {
			return dispatch({ type: 'EMAIL_ERROR' });
		}

		if (!checkLength(6, 15, password.length)) {
			return dispatch({ type: 'PASSWORD_ERROR' });
		}

		if (!isEqual(password, confirmPassword)) {
			return dispatch({ type: 'CONFIRM_PASSWORD_ERROR' });
		}

		try {
			setLoading(true);
			await signup(email, password);
			// history.push('/');
		} catch (error) {
			dispatch({ type: 'ASYNC_ERROR', err: error.message || 'Failed' });
		}
		setLoading(false);
	};

	const inputHandler = (e) => {
		dispatch({ type: e.target.placeholder, value: e.target.value });
	};

	const signUpForm = (
		<Form submit={(e) => submitHandler(e)}>
			<Input
				attributes={{ placeholder: 'Email', type: 'text', required: true }}
				getValue={(e) => inputHandler(e)}
				showError={emailError} />
			<Input
				attributes={{ placeholder: 'Password', type: 'password', required: true }}
				getValue={(e) => inputHandler(e)}
				showError={passwordError} />
			<Input
				attributes={{ placeholder: 'Confirm Password', type: 'password', required: true }}
				getValue={(e) => inputHandler(e)}
				showError={confirmPasswordError} />
			<Message>* Password must be 6 to 15 characters long</Message>
			<Button attributes={{ type: 'submit' }} disabled={loading}>Sign Up</Button>
		</Form>
	);

	return (
		<FormCard>
			<Title>Sign Up</Title>
			<Message>
				Already a member? <NavLink href='/login'>Login</NavLink>
			</Message>
			<HiddenMessage showError={error}>{message}</HiddenMessage>
			{loading ? <Loader /> : signUpForm}
		</FormCard>
	);
}
