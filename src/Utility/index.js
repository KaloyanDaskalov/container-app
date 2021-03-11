const pattern = /^[\w!#$%&'*+\-=?^_`{|}~]+(\.[\w!#$%&'*+\-=?^_`{|}~]+)*@((([-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))/;

export const emailValidation = (email) => {
    return pattern.test(email);
};

export function actionType(type) {
    return type.toUpperCase().replace(/ /g, '_');
}

export function checkLength(min, max, length) {
    return (min <= length) && (length <= max);
}

export function updateObject(obj, props) {
    return { ...obj, ...props };
}


// export function actionType(e) {
//     return e.target.placeholder.toUpperCase().replace(/ /g, '_');
// }