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


export default function Login() {
	const { state: { email, password, error, message, emailError, passwordError }, dispatch } = useCommonState();

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch({ type: 'RESET_ERRORS' });

		if (!emailValidation(email)) {
			return dispatch({ type: 'EMAIL_ERROR' });
		}

		if (!checkLength(6, 15, password.length)) {
			return dispatch({ type: 'PASSWORD_ERROR' });
		}

	};

	const inputHandler = (e) => {
		dispatch({ type: e.target.placeholder, value: e.target.value });
	};

	return (
		<FormCard>
			<Title>Login</Title>
			<Message>
				Not a member? <NavLink href='/signup'>Sign Up Now</NavLink>
			</Message>
			<HiddenMessage showError={error}>{message}</HiddenMessage>
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
			<NavLink href='/forgot-password'>Forgot Password?</NavLink>
		</FormCard>
	);
}
