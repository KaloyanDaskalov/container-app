import FormCard from '../../components/UI/FormCard/FormCard';
import Title from '../../components/UI/FormCard/Title/Title';
import Message from '../../components/UI/FormCard/Message/Message';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Form from '../../components/UI/FormCard/Form/Form';
import Input from '../../components/UI/FormCard/Input/Input';
import Button from '../../components/UI/FormCard/Button/Button';


export default function Login() {
	return (
		<FormCard>
			<Title>Login</Title>
			<Message>Not a member? Sign Up Now</Message>
			<HiddenMessage>Error Message</HiddenMessage>
			<Form>
				<Input attributes={{ placeholder: 'Email', type: 'text' }} />
				<Input attributes={{ placeholder: 'Password', type: 'password' }} />
				<Button
					attributes={{ type: 'submit' }}
				>Login</Button>
			</Form>
		</FormCard>
	);
}
