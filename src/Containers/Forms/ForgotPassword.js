import useCommonState from '../../state/useCommonState';

import FormCard from '../../components/UI/FormCard/FormCard';
import Title from '../../components/UI/FormCard/Title/Title';
import Message from '../../components/UI/FormCard/Message/Message';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Form from '../../components/UI/FormCard/Form/Form';
import Input from '../../components/UI/FormCard/Input/Input';
import Button from '../../components/UI/FormCard/Button/Button';

export default function ForgotPassword() {

	const { state: { email, error, message, emailError }, dispatch } = useCommonState();

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(email, error, message, emailError);
		dispatch({ type: 'CHECK_FORM' });
	};

	const inputHandler = (e) => {
		dispatch({ type: e.target.placeholder, currentEmail: e.target.value });
	};

	return (
		<FormCard>
			<Title>Password Reset</Title>
			<HiddenMessage showError={error}>
				{message}
			</HiddenMessage>
			<Form submit={(e) => submitHandler(e)}>
				<Input
					attributes={{ placeholder: 'Email', type: 'text', required: true }}
					getValue={(e) => inputHandler(e)}
					showError={emailError}
				/>
				<Button>Reset</Button>
			</Form>
			<Message>Cancel</Message>
		</FormCard>
	)
}
