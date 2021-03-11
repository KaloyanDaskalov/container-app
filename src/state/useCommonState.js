import { useReducer } from 'react';
import { emailValidation, checkLength, actionType, updateObject } from '../Utility/index';

const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    error: false,
    message: '',
    emailError: false,
    passwordError: false,
    confirmPasswordError: false
};

function checkForm(state) {
    console.log(state.email);
    if (!emailValidation(state.email)) {
        return updateObject(state, { error: true, message: 'Invalid email', emailError: true });
    }
    return updateObject(state, { error: false, message: 'Message', emailError: false });
}

function reducer(state, action) {
    switch (actionType(action.type)) {
        case 'EMAIL':
            return updateObject(state, { email: action.currentEmail });
        case 'CHECK_FORM':
            return checkForm(state);
        default:
            throw new Error('Unhandled action' + action.type);
    }
}

export default function useCommonState() {

    const [state, dispatch] = useReducer(reducer, initialState);

    return { state, dispatch };
}



// const initialState = {
//     email: '',
//     password: '',
//     confirm: '',
//     error: false,
//     errorMessage: ''
// };

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'EMAIL':
//             return { ...state, email: action.payload };
//         case 'PASSWORD':
//             return { ...state, password: action.payload };
//         case 'CONFIRM_PASSWORD':
//             return { ...state, confirm: action.payload };
//         case 'ERROR':
//             return { ...state, error: true, errorMessage: action.payload };
//         case 'INIT_ERROR':
//             return { ...state, error: false, errorMessage: '' };
//         default:
//             throw new Error('Unhandled action' + action.type);
//     }
// };

// function useFormState() {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     return {
//         email: state.email,
//         password: state.password,
//         dispatch: dispatch,
//         confirm: state.confirm,
//         error: state.error,
//         errorMessage: state.errorMessage
//     };
// }