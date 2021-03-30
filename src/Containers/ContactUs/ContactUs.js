import useCommonState from '../../state/useCommonState';
import useFetch from '../../Hooks/useFetch';
import { emailValidation, checkLength } from '../../Utility/index';

import FormCard from '../../components/UI/FormCard/FormCard';
import Title from '../../components/UI/FormCard/Title/Title';
import Message from '../../components/UI/FormCard/Message/Message';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Form from '../../components/UI/FormCard/Form/Form';
import Input from '../../components/UI/FormCard/Input/Input';
import Button from '../../components/UI/FormCard/Button/Button';
import TextArea from '../../components/UI/FormCard/TextArea/TextArea';
import Loader from '../../components/UI/Loader/Loader';
import { MdEmail, MdPhone, MdMap } from "react-icons/md";

import classes from './ContactUs.module.css';

export default function ContactUs() {
    const { state: { email, error, message, emailError, loading, name, communication, passwordError: nameError, confirmPasswordError: descriptionError }, dispatch } = useCommonState();
    const fetchData = useFetch();

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch({ type: 'RESET_ERRORS' });

        if (!emailValidation(email)) {
            return dispatch({ type: 'EMAIL_ERROR' });
        }

        if (!checkLength(2, 50, name.length)) {
            return dispatch({ type: 'NAME_ERROR', err: 'Name must be at least 2 characters long' });
        }

        if (!checkLength(10, 200, communication.length)) {
            return dispatch({ type: 'TITLE_ERROR', err: 'Communication must 10 to 200 characters long' });
        }

        try {
            dispatch({ type: 'START_LOADING' });

            await fetchData('messages.json', {
                method: 'POST',
                body: JSON.stringify({ name, email, communication })
            });
            dispatch({ type: 'SUCCESS', success: 'Success! Your message was send' })
        } catch (err) {
            dispatch({ type: 'ASYNC_ERROR', err: (err.message || err) });
        }

        dispatch({ type: 'END_LOADING' });
    };

    const inputHandler = (e) => {
        dispatch({ type: e.target.placeholder, value: e.target.value });
    };

    const loginForm = (
        <Form
            submit={(e) => submitHandler(e)}
            addClass='mt'>
            <Input
                attributes={{ placeholder: 'Email', type: 'text', required: true }}
                getValue={(e) => inputHandler(e)}
                showError={emailError} />
            <Input
                attributes={{ placeholder: 'Name', type: 'text', required: true }}
                getValue={(e) => inputHandler(e)}
                showError={nameError}
            />
            <TextArea
                attributes={{ placeholder: 'Communication', type: 'text', required: true }}
                getValue={(e) => inputHandler(e)}
                showError={descriptionError} />
            <Button attributes={{ type: 'submit' }}>Send</Button>
        </Form>
    );

    return (
        <FormCard>
            <Title >Contact Us</Title>
            <HiddenMessage showError={error}>{message}</HiddenMessage>
            <Message addClass='tl mb'><MdMap className={classes.icon} /> Sofia, Tsar Samuil 20 </Message>
            <Message addClass='tl mb'><MdEmail className={classes.icon} />some@mail.com</Message>
            <Message addClass='tl'><MdPhone className={classes.icon} />+359888222111</Message>
            {loading ? <Loader /> : loginForm}
        </FormCard>
    );
}
