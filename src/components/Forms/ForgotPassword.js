import { useAuth } from '../../state/Auth';
import useCommonState from '../../state/useCommonState';
import { emailValidation } from '../../Utility/index';

import FormCard from '../../components/UI/FormCard/FormCard';
import Title from '../../components/UI/FormCard/Title/Title';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Form from '../../components/UI/FormCard/Form/Form';
import Input from '../../components/UI/FormCard/Input/Input';
import Button from '../../components/UI/FormCard/Button/Button';
import NavLink from '../UI/NavLink/NavLink';
import Loader from "../UI/Loader/Loader";

export default function ForgotPassword() {

	const { state: { email, error, message, emailError, loading }, dispatch } = useCommonState();

	const { resetPassword } = useAuth();

	const submitHandler = async (e) => {
		e.preventDefault();

		dispatch({ type: 'RESET_ERRORS' });

		if (!emailValidation(email)) {
			return dispatch({ type: 'EMAIL_ERROR' });
		}

		try {
			dispatch({ type: 'START_LOADING' });
			await resetPassword(email);
			dispatch({ type: 'SUCCESS', success: 'Success! Check your mailbox for further instructions' });
		} catch (error) {
			dispatch({ type: 'ASYNC_ERROR', err: (error.message || 'Failed to reset') });
		}

		dispatch({ type: 'END_LOADING' });

	};

	const inputHandler = (e) => {
		dispatch({ type: e.target.placeholder, value: e.target.value });
	};

	const resetForm = (
		<Form submit={(e) => submitHandler(e)}>
			<Input
				attributes={{ placeholder: 'Email', type: 'text', required: true }}
				getValue={(e) => inputHandler(e)}
				showError={emailError}
			/>
			<Button attributes={{ type: 'submit' }}>Reset</Button>
		</Form>
	);

	return (
		<FormCard>
			<Title>Password Reset</Title>
			<HiddenMessage showError={error}>
				{message}
			</HiddenMessage>
			{loading ? <Loader /> : resetForm}
			<NavLink href='/login' addClass='nested'>Cancel</NavLink>
		</FormCard>
	);
}
