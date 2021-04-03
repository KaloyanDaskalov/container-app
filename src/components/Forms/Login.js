import { useAuth } from '../../state/Auth';
import useCommonState from '../../state/useCommonState';
import { emailValidation, checkLength } from '../../Utility/index';

import FormCard from '../../components/UI/FormCard/FormCard';
import Title from '../../components/UI/FormCard/Title/Title';
import Message from '../../components/UI/FormCard/Message/Message';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Form from '../../components/UI/FormCard/Form/Form';
import Input from '../../components/UI/FormCard/Input/Input';
import Button from '../../components/UI/FormCard/Button/Button';
import NavLink from '../UI/NavLink/NavLink';
import Loader from '../UI/Loader/Loader';

export default function Login() {
	const { state: { email, password, error, message, emailError, passwordError, loading }, dispatch } = useCommonState();

	const { login } = useAuth();

	const submitHandler = async (e) => {
		e.preventDefault();

		dispatch({ type: 'RESET_ERRORS' });

		if (!emailValidation(email)) {
			return dispatch({ type: 'EMAIL_ERROR' });
		}

		if (!checkLength(6, 15, password.length)) {
			return dispatch({ type: 'PASSWORD_ERROR' });
		}

		try {
			dispatch({ type: 'START_LOADING' });
			await login(email, password);
		} catch (error) {
			dispatch({ type: 'ASYNC_ERROR', err: (error.message || 'Failed to login') });
		}

		dispatch({ type: 'END_LOADING' });

	};

	const inputHandler = (e) => {
		dispatch({ type: e.target.placeholder, value: e.target.value });
	};

	const loginForm = (
		<Form submit={(e) => submitHandler(e)}>
			<Input
				attributes={{ placeholder: 'Email', type: 'text', required: true }}
				getValue={(e) => inputHandler(e)}
				showError={emailError} />
			<Input
				attributes={{ placeholder: 'Password', type: 'password', required: true }}
				getValue={(e) => inputHandler(e)}
				showError={passwordError} />
			<Button attributes={{ type: 'submit' }}>Login</Button>
		</Form>
	);

	return (
		<FormCard>
			<Title>Login</Title>
			<Message>
				Not a member? <NavLink href='/signup' addClass='nested'>Sign Up Now</NavLink>
			</Message>
			<HiddenMessage showError={error}>{message}</HiddenMessage>
			{loading ? <Loader /> : loginForm}
			<NavLink href='/forgot-password' addClass='nested'>Forgot Password?</NavLink>
		</FormCard>
	);
}
