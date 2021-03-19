import { useAuth } from '../../state/Auth';
import useCommonState from '../../state/useCommonState';
import { checkLength, isValidURL } from '../../Utility/index';

import FormCard from '../../components/UI/FormCard/FormCard';
import Title from '../../components/UI/FormCard/Title/Title';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Form from '../../components/UI/FormCard/Form/Form';
import Input from '../../components/UI/FormCard/Input/Input';
import Button from '../../components/UI/FormCard/Button/Button';
import TextArea from '../../components/UI/FormCard/TextArea/TextArea';
import Loader from '../../components/UI/Loader/Loader';

export default function Create() {

    const { state: { title, imageUrl, description, error, message, emailError: titleError, passwordError: urlError, confirmPasswordError: descriptionError, loading }, dispatch } = useCommonState();

    const { user } = useAuth();

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch({ type: 'RESET_ERRORS' });

        if (!checkLength(10, 100, title.length)) {
            return dispatch({ type: 'TITLE_ERROR', err: 'Title must 10 to 100 characters long' });
        }

        if (!isValidURL(imageUrl)) {
            return dispatch({ type: 'IMAGE_ERROR', err: 'Invalid image url' });
        }

        if (!checkLength(50, 1000, description.length)) {
            return dispatch({ type: 'DESCRIPTION_ERROR', err: 'Description must 50 to 1000 characters long' });
        }

        fetch('https://containers-app-default-rtdb.europe-west1.firebasedatabase.app/articles.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, imageUrl, description, author: user.email, userId: user.uid })
        })
            .then(res => res.json)
            .then(console.log)
            .catch(err => dispatch({ type: 'ASYNC_ERROR', err: err.message || 'Failed to create' }))
            .finally(() => dispatch({ type: 'END_LOADING' }));
    };

    const inputHandler = (e) => {
        dispatch({ type: e.target.placeholder, value: e.target.value });
    };

    const signUpForm = (
        <Form submit={(e) => submitHandler(e)}>
            <Input
                attributes={{ placeholder: 'Title', type: 'text', required: true }}
                getValue={(e) => inputHandler(e)}
                showError={titleError} />
            <Input
                attributes={{ placeholder: 'Image URL', type: 'text', required: true }}
                getValue={(e) => inputHandler(e)}
                showError={urlError} />
            <TextArea
                attributes={{ placeholder: 'Description', type: 'text', required: true }}
                getValue={(e) => inputHandler(e)}
                showError={descriptionError} />
            <Button attributes={{ type: 'submit' }}>Create</Button>
        </Form>
    );

    return (
        <FormCard addClass='wide'>
            <Title>Create Article</Title>
            <HiddenMessage showError={error}>{message}</HiddenMessage>
            {loading ? <Loader /> : signUpForm}
        </FormCard>
    );
}
