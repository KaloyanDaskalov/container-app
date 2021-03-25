import { useEffect } from 'react';
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

export default function Update(props) {

    const { state: { title, imageUrl, description, error, message, emailError: titleError, passwordError: urlError, confirmPasswordError: descriptionError, loading }, dispatch } = useCommonState();

    useEffect(() => {
        dispatch({ type: 'RESET_ERRORS' });
        dispatch({ type: 'START_LOADING' });
        fetch('https://containers-app-default-rtdb.europe-west1.firebasedatabase.app/articles/' + props.match.params.id + '.json')
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'TITLE', value: data.title });
                dispatch({ type: 'IMAGE_URL', value: data.imageUrl });
                dispatch({ type: 'DESCRIPTION', value: data.description });
            })
            .catch(err => dispatch({ type: 'ASYNC_ERROR', err: (err.message || 'Failed to load') }))
            .finally(() => dispatch({ type: 'END_LOADING' }));
    }, [dispatch, props.match.params.id]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch({ type: 'RESET_ERRORS' });

        if (!checkLength(5, 100, title.length)) {
            return dispatch({ type: 'TITLE_ERROR', err: 'Title must 5 to 100 characters long' });
        }

        if (!isValidURL(imageUrl)) {
            return dispatch({ type: 'IMAGE_ERROR', err: 'Invalid image url' });
        }

        if (!checkLength(50, 1000, description.length)) {
            return dispatch({ type: 'DESCRIPTION_ERROR', err: 'Description must 50 to 1000 characters long' });
        }

        dispatch({ type: 'START_LOADING' });

        fetch(`https://containers-app-default-rtdb.europe-west1.firebasedatabase.app/articles/${props.match.params.id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, imageUrl, description })
        })
            .then(res => res.json())
            .then(_ => props.history.push('/details/' + props.match.params.id))
            .catch(err => dispatch({ type: 'ASYNC_ERROR', err: err.message || 'Failed to update' }))
            .finally(() => dispatch({ type: 'END_LOADING' }));
    };

    const inputHandler = (e) => {
        dispatch({ type: e.target.placeholder, value: e.target.value });
    };

    const updateForm = (
        <Form submit={(e) => submitHandler(e)}>
            <Input
                attributes={{
                    placeholder: 'Title', type: 'text', required: true,
                    value: title
                }}
                getValue={(e) => inputHandler(e)}
                showError={titleError}
            />
            <Input
                attributes={{
                    placeholder: 'Image URL', type: 'text', required: true,
                    value: imageUrl
                }}
                getValue={(e) => inputHandler(e)}
                showError={urlError}
            />
            <TextArea
                attributes={{
                    placeholder: 'Description', type: 'text', required: true,
                    value: description
                }}
                getValue={(e) => inputHandler(e)}
                showError={descriptionError}
            />
            <Button >Update</Button>
        </Form>
    );

    return (
        <FormCard addClass='wide'>
            <Title>Create Article</Title>
            <HiddenMessage showError={error}>{message}</HiddenMessage>
            {loading ? <Loader /> : updateForm}
        </FormCard>
    );
}
