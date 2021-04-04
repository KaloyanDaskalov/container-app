const patternEmail = /^[\w!#$%&'*+\-=?^_`{|}~]+(\.[\w!#$%&'*+\-=?^_`{|}~]+)*@((([-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))/;

const patternUrl = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&=]*)/g);

export const emailValidation = (email) => {
    return patternEmail.test(email);
};

export function actionType(type) {
    return type.toUpperCase().replace(/ /g, '_');
}

export function checkLength(min = 0, max = 1000, length = 0) {
    return (min <= length) && (length <= max);
}

export function updateObject(obj = {}, props = {}) {
    return { ...obj, ...props };
}

export function isEqual(a, b) {
    return a === b;
}

export function isValidURL(string = '') {
    return patternUrl.test(string);
}

export const converter = (object = {}) => {

    const arrayOfArticles = [];

    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const slicedText = { description: object[key].description.slice(0, 49) + '...' }
            arrayOfArticles.push({ id: key, ...object[key], ...slicedText });
        }
    }

    return arrayOfArticles;
};

export const setMessage = (stateErr = false, fetchErr = false, stateMessage = 'State Message', fetchMessage = 'Fetch Message', fetchSuccess = false, fetchSuccessMessage = 'Success Message') => {
    if (stateErr) {
        return stateMessage;
    }

    if (fetchErr) {
        return fetchMessage;
    }

    if (fetchSuccess) {
        return fetchSuccessMessage;
    }

    return 'Message';
};

export const helloTitle = (title = '') => {
    return title.slice(0, title.indexOf('@'));
};