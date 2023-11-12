const form = document.querySelector('#signup');

const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPwdEl = document.querySelector('#confirm-password');

//submit event handler
form.addEventListener('submit', function(e){
    //prevent form from submitting
    e.preventDefault();

    //validate forms
    let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

    if (isFormValid) {

    }
});



// const isRequired = value => value === '' ? false : true;

const isRequired = (value) => {
    if (value === '') {
        return false;
    } else {
        return true;
    }
};

// const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isBetween = (length, min, max) => {
    if (length < min || length > max) {
        return false;
    }
    else {
        return true;
    }
};

// To check if email is valid
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// To check if a password is strong and matches a specified pattern
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

// Develop functions that show the error
const showError = (input, message) => {
    //get the form-field element
    const formField = input.parentElement;
    //add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    //show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

// Develop functions that show the success
const showSuccess = (input) => {
    //get the form-field element
    const formField = input.parentElement;

    //remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    //hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
};

// Validate username field
const checkUsername = () => {
    let valid = false;
    const min = 3, max = 25;
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

//Validate email field
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();

    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, `Email is not valid`);
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

//Validate the password field
const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, `Password  must have at least 8 characters which includes at least 1 upper case letter, 1 lower case letter, 1 number and 1 special character`);
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

//Validate confirm password field
const checkConfirmPassword = () => {
    let valid = false;

    const confirmPassword = confirmPwdEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPwdEl, `Please enter the password again`);
    } else if (password != confirmPassword) {
        showError(confirmPwdEl, `Password and Confirm Password must match`);
    } else {
        showSuccess(confirmPwdEl);
        valid = true;
    }

    return valid;
}
