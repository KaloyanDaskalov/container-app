import useCommonState from '../../state/useCommonState';

import FormCard from '../../components/UI/FormCard/FormCard';
import Title from '../../components/UI/FormCard/Title/Title';
import Message from '../../components/UI/FormCard/Message/Message';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Form from '../../components/UI/FormCard/Form/Form';
import Input from '../../components/UI/FormCard/Input/Input';
import Button from '../../components/UI/FormCard/Button/Button';


export default function Login() {
	const { state: { email, password, error, message, emailError, passwordError }, dispatch } = useCommonState();

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(email, password);
		dispatch({ type: 'CHECK_FORM' });
	};

	const inputHandler = (e) => {
		dispatch({ type: e.target.placeholder, value: e.target.value });
	};
	return (
		<FormCard>
			<Title>Login</Title>
			<Message>Not a member? Sign Up Now</Message>
			<HiddenMessage showError={error}>
				{message}
			</HiddenMessage>
			<Form submit={(e) => submitHandler(e)}>
				<Input
					attributes={{ placeholder: 'Email', type: 'text', required: true }}
					getValue={(e) => inputHandler(e)}
					showError={emailError} />
				<Input
					attributes={{ placeholder: 'Password', type: 'password', required: true }}
					getValue={(e) => inputHandler(e)}
					showError={passwordError} />
				<Button
					attributes={{ type: 'submit' }}
				>Login</Button>
			</Form>
		</FormCard>
	);
}
