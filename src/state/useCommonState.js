import { useReducer } from 'react';
import { actionType, updateObject } from '../Utility/index';

const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    error: false,
    message: 'Message',
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    name: '',
    communication: '',
    title: '',
    imageUrl: '',
    description: ''
};

function reducer(state, action) {
    switch (actionType(action.type)) {
        case 'EMAIL':
            return updateObject(state, { email: action.value });
        case 'PASSWORD':
            return updateObject(state, { password: action.value });
        case 'CONFIRM_PASSWORD':
            return updateObject(state, { confirmPassword: action.value });
        case 'RESET_ERRORS':
            return updateObject(state, { error: false, emailError: false, passwordError: false, confirmPasswordError: false });
        case 'EMAIL_ERROR':
            return updateObject(state, { error: true, message: 'Invalid email', emailError: true });
        case 'PASSWORD_ERROR':
            return updateObject(state, { error: true, message: 'Password must be 6 to 15 characters long', passwordError: true });
        case 'ASYNC_ERROR':
            return updateObject(state, { error: true, message: action.err });
        case 'CONFIRM_PASSWORD_ERROR':
            return updateObject(state, { error: true, message: 'Password confirmation invalid', confirmPasswordError: true });
        case 'START_LOADING':
            return updateObject(state, { loading: true });
        case 'END_LOADING':
            return updateObject(state, { loading: false });
        case 'SUCCESS':
            return updateObject(state, { error: true, message: action.success });
        case 'NAME':
            return updateObject(state, { name: action.value });
        case 'COMMUNICATION':
            return updateObject(state, { communication: action.value });
        case 'TITLE':
            return updateObject(state, { title: action.value });
        case 'IMAGE_URL':
            return updateObject(state, { imageUrl: action.value });
        case 'DESCRIPTION':
            return updateObject(state, { description: action.value });
        case 'TITLE_ERROR':
            return updateObject(state, { error: true, message: action.err, emailError: true });
        case 'IMAGE_ERROR':
            return updateObject(state, { error: true, message: action.err, passwordError: true });
        case 'NAME_ERROR':
            return updateObject(state, { error: true, message: action.err, passwordError: true });
        case 'DESCRIPTION_ERROR':
            return updateObject(state, { error: true, message: action.err, confirmPasswordError: true });
        default:
            throw new Error('Unhandled action' + action.type);
    }
}

export default function useCommonState() {

    const [state, dispatch] = useReducer(reducer, initialState);

    return { state, dispatch };
}
