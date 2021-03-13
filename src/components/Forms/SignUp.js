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

export default function SignUp() {

	const { state: { email, password, confirmPassword, error, message, emailError, passwordError, confirmPasswordError }, dispatch } = useCommonState();

	const submitHandler = (e) => {
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

		console.log('Success');
	};

	const inputHandler = (e) => {
		dispatch({ type: e.target.placeholder, value: e.target.value });
	};

	return (
		<FormCard>
			<Title>Sign Up</Title>
			<Message>
				Already a member? <NavLink href='/login'>Login</NavLink>
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
				<Input
					attributes={{ placeholder: 'Confirm Password', type: 'password', required: true }}
					getValue={(e) => inputHandler(e)}
					showError={confirmPasswordError} />
				<Message>* Password must be 6 to 15 characters long</Message>
				<Button attributes={{ type: 'submit' }}>Sign Up</Button>
			</Form>
		</FormCard>
	);
}
