import FormCard from '../../components/UI/FormCard/FormCard';
import Title from '../../components/UI/FormCard/Title/Title';
import Message from '../../components/UI/FormCard/Message/Message';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Form from '../../components/UI/FormCard/Form/Form';
import Input from '../../components/UI/FormCard/Input/Input';
import Button from '../../components/UI/FormCard/Button/Button';

export default function SignUp() {
	return (
		<FormCard>
			<Title>Sign Up</Title>
			<Message>Already a member? Login</Message>
			<HiddenMessage>Error Message</HiddenMessage>
			<Form>
				<Input attributes={{ placeholder: 'Email', type: 'text' }} />
				<Input attributes={{ placeholder: 'Password', type: 'text' }} />
				<Input attributes={{ placeholder: 'Confirm Password', type: 'text' }} />
				<Message>* Password must be at least 6 characters long</Message>
				<Button>Sign Up</Button>
			</Form>
		</FormCard>
	);
}
