import { useEffect } from 'react';
import { useAuth } from '../../state/Auth';
import useCommonState from '../../state/useCommonState';
import { emailValidation, checkLength, isEqual } from '../../Utility/index';

import FormCard from '../../components/UI/FormCard/FormCard';
import Title from '../../components/UI/FormCard/Title/Title';
import Message from '../../components/UI/FormCard/Message/Message';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Form from '../../components/UI/FormCard/Form/Form';
import Input from '../../components/UI/FormCard/Input/Input';
import Button from '../../components/UI/FormCard/Button/Button';
import Loader from '../../components/UI/Loader/Loader';

export default function Profile() {

    const { state: { email, password, confirmPassword, error, message, emailError, passwordError, confirmPasswordError, loading }, dispatch } = useCommonState();

    const { user, updateEmail, updatePassword, logout } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const emailHandler = async (e) => {
        e.preventDefault();

        dispatch({ type: 'RESET_ERRORS' });

        if (!emailValidation(email)) {
            return dispatch({ type: 'EMAIL_ERROR' });
        }

        try {
            dispatch({ type: 'START_LOADING' });
            await updateEmail(email);
            dispatch({ type: 'SUCCESS', success: 'Success! Logout and login with your new email' });
        } catch (error) {
            dispatch({ type: 'ASYNC_ERROR', err: (error.message || 'Failed to update') });
        }
        dispatch({ type: 'END_LOADING' });
    };

    const passwordHandler = async (e) => {
        e.preventDefault();

        dispatch({ type: 'RESET_ERRORS' });

        if (!checkLength(6, 15, password.length)) {
            return dispatch({ type: 'PASSWORD_ERROR' });
        }

        if (!isEqual(password, confirmPassword)) {
            return dispatch({ type: 'CONFIRM_PASSWORD_ERROR' });
        }

        try {
            dispatch({ type: 'START_LOADING' });
            await updatePassword(password);
            dispatch({ type: 'SUCCESS', success: 'Success! Logout and login with your new password' });
        } catch (error) {
            dispatch({ type: 'ASYNC_ERROR', err: (error.message || 'Failed to update') });
        }
        dispatch({ type: 'END_LOADING' });
    };

    const logoutHandler = () => {
        try {
            logout();
        } catch (err) {
            console.error(err);
        }
    }

    const inputHandler = (e) => {
        dispatch({ type: e.target.placeholder, value: e.target.value });
    };

    const signUpForm = (
        <>
            <Form submit={(e) => emailHandler(e)}>
                <Input
                    attributes={{ placeholder: 'Email', type: 'text', required: true }}
                    getValue={(e) => inputHandler(e)}
                    showError={emailError} />
                <Button attributes={{ type: 'submit' }} >Change Email</Button>
            </Form>
            <Form submit={(e) => passwordHandler(e)}>
                <Input
                    attributes={{ placeholder: 'Password', type: 'password', required: true }}
                    getValue={(e) => inputHandler(e)}
                    showError={passwordError} />
                <Input
                    attributes={{ placeholder: 'Confirm Password', type: 'password', required: true }}
                    getValue={(e) => inputHandler(e)}
                    showError={confirmPasswordError} />
                <Message>* Password must be 6 to 15 characters long</Message>
                <Button attributes={{ type: 'submit' }} >Change Password</Button>
            </Form>
        </>
    );

    return (
        <FormCard>
            <Title>{user.email}</Title>
            <Button attributes={{ type: 'submit' }} clicked={() => logoutHandler()}>Log Out</Button>
            <HiddenMessage showError={error}>{message}</HiddenMessage>
            {loading ? <Loader /> : signUpForm}
        </FormCard>
    );
}
