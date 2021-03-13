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
    confirmPasswordError: false
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
            return updateObject(state, { error: true, message: 'Confirm password don\'t match', confirmPasswordError: true });
        case 'START_LOADING':
            return updateObject(state, { loading: true });
        case 'END_LOADING':
            return updateObject(state, { loading: false });
        default:
            throw new Error('Unhandled action' + action.type);
    }
}

export default function useCommonState() {

    const [state, dispatch] = useReducer(reducer, initialState);

    return { state, dispatch };
}
