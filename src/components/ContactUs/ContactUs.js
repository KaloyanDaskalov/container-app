import { useRef } from 'react';
import useCommonState from '../../state/useCommonState';
import { emailValidation } from '../../Utility/index';

import FormCard from '../../components/UI/FormCard/FormCard';
import Title from '../../components/UI/FormCard/Title/Title';
import Message from '../../components/UI/FormCard/Message/Message';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Form from '../../components/UI/FormCard/Form/Form';
import Input from '../../components/UI/FormCard/Input/Input';
import Button from '../../components/UI/FormCard/Button/Button';
import TextArea from '../UI/FormCard/TextArea/TextArea';
import Loader from '../UI/Loader/Loader';
import { MdEmail, MdPhone, MdMap } from "react-icons/md";

import classes from './ContactUs.module.css';

export default function ContactUs() {
    const { state: { email, error, message, emailError, loading }, dispatch } = useCommonState();

    const name = useRef('');
    const question = useRef('');

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch({ type: 'RESET_ERRORS' });

        if (!emailValidation(email)) {
            return dispatch({ type: 'EMAIL_ERROR' });
        }

        console.log(name.current.value, email, question.current.value);

        dispatch({ type: 'START_LOADING' });

        fetch('https://containers-app-default-rtdb.europe-west1.firebasedatabase.app/messages.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name.current.value, email, question: question.current.value })
        })
            .then(res => res.json)
            .then(console.log)
            .catch(err => dispatch({ type: 'ASYNC_ERROR', err: err.message || 'Failed to send' }))
            .finally(() => dispatch({ type: 'END_LOADING' }));
    };

    const inputHandler = (e) => {
        dispatch({ type: e.target.placeholder, value: e.target.value });
    };

    const loginForm = (
        <Form
            submit={(e) => submitHandler(e)}
            addClass='mt'>
            <Input
                attributes={{ placeholder: 'Name', type: 'text', required: true, ref: name }} />
            <Input
                attributes={{ placeholder: 'Email', type: 'text', required: true }}
                getValue={(e) => inputHandler(e)}
                showError={emailError} />
            <TextArea
                attributes={{ placeholder: 'Message', required: true, ref: question }}
                ref={question}>
            </TextArea>
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
