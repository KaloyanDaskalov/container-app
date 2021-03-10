import FormCard from '../../components/UI/FormCard/FormCard';
import Title from '../../components/UI/FormCard/Title/Title';
import Message from '../../components/UI/FormCard/Message/Message';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Form from '../../components/UI/FormCard/Form/Form';
import Input from '../../components/UI/FormCard/Input/Input';
import Button from '../../components/UI/FormCard/Button/Button';

export default function ForgotPassword() {
	return (
		<FormCard>
			<Title>Password Reset</Title>
			<HiddenMessage>Error Message</HiddenMessage>
			<Form>
				<Input attributes={{ placeholder: 'Email', type: 'text' }} />
				<Button>Reset</Button>
			</Form>
			<Message>Cancel</Message>
		</FormCard>
	)
}
