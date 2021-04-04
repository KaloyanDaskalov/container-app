import { useEffect } from 'react';
import useCommonState from '../../state/useCommonState';
import useFetch from '../../Hooks/useFetch';
import { checkLength, isValidURL, setMessage } from '../../Utility/index';

import FormCard from '../../components/UI/FormCard/FormCard';
import Title from '../../components/UI/FormCard/Title/Title';
import HiddenMessage from '../../components/UI/FormCard/HiddenMessage/HiddenMessage';
import Form from '../../components/UI/FormCard/Form/Form';
import Input from '../../components/UI/FormCard/Input/Input';
import Button from '../../components/UI/FormCard/Button/Button';
import TextArea from '../../components/UI/FormCard/TextArea/TextArea';
import Loader from '../../components/UI/Loader/Loader';

export default function Update(props) {

    const { state: { title, imageUrl, description, error, message, emailError: titleError, passwordError: urlError, confirmPasswordError: descriptionError }, dispatch } = useCommonState();
    const { fetchQuery, fetchLoading, fetchError, fetchSuccess, fetchErrorMessage, fetchSuccessMessage, fetchData } = useFetch();
    const currentId = props.match.params.id;

    useEffect(() => {
        fetchQuery(`articles/${currentId}.json`);
    }, [fetchQuery, currentId]);

    useEffect(() => {
        if (fetchData) {
            dispatch({ type: 'SET_UPDATE', ...fetchData });
        }

        return () => dispatch({ type: 'SET_UPDATE', imageUrl: '', description: '', title: '' });
    }, [fetchData, dispatch])

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

        fetchQuery(`articles/${currentId}.json`, {
            method: 'PATCH',
            body: JSON.stringify({ title, imageUrl, description })
        }, '', `/details/${currentId}`);
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
            <HiddenMessage showError={error || fetchError || fetchSuccess}>
                {setMessage(error, fetchError, message, fetchErrorMessage, fetchSuccess, fetchSuccessMessage)}
            </HiddenMessage>
            {fetchLoading ? <Loader /> : updateForm}
            <Button clicked={() => props.history.push(`/details/${currentId}`)}>Back</Button>
        </FormCard>
    );
}
