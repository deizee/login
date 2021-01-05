import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../css/style.css';

import login_UI from './config/login_ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/loginForm';
import { login } from './services/auth.service';
import { notify } from './views/notifications';
import { getNews } from './services/news.service';

import register_UI from './config/register_ui.config';
import { register } from './services/register.auth.service';
import { getCountries } from './services/country.service';
import { getCities } from './services/cities.service';
import { renderCountriesList, renderCytiesList } from './views/registerForm';

const { loginForm, inputEmail, inputPassword } = login_UI;
const inputs = [inputEmail, inputPassword];

const { 
    registerForm, 
    inputRegisterEmail, 
    inputRegisterPassword, 
    inputNickname, 
    inputFirstName, 
    inputLastName, 
    inputPhone, 
    radios, 
    selectCountry, 
    selectCity,
    inputBirthDate,
} = register_UI;
const registerInputs = [inputRegisterEmail, inputRegisterPassword];

let gender, birthDay, birthMonth, birthYear;

// Events
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit();
});
inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    onRegisterSubmit();
});
registerInputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));

document.addEventListener('DOMContentLoaded', onLoad);
selectCountry.addEventListener('change', onSelectCountryChange);

// Handlers
async function onSubmit() {
    const isValidForm = inputs.every(el => {
        const isValidInput = validate(el);
        if (!isValidInput) {
            showInputError(el);
        }
        return isValidInput;
    });

    if (!isValidForm) return;

    try {
        await login(inputEmail.value, inputPassword.value);
        await getNews();
        // show success notify
        notify({ msg: 'Login success', className: 'alert-success' });
    } catch (error) {
        // show error notify
        notify({ msg: 'Login faild', className: 'alert-danger' });
    }

    loginForm.reset();
}


async function onRegisterSubmit() {
    const isValidForm = registerInputs.every(el => {
        const isValidInput = validate(el);
        if (!isValidInput) {
            showInputError(el);
        }
        return isValidInput;
    });

    if (!isValidForm) return;

    radios.forEach(radio => {
        if (radio.checked) {
            gender = radio.value;
        };
    })

    const birthDate = inputBirthDate.value;
    birthDay = birthDate.slice(-2);
    birthMonth = birthDate.slice(5, 7);
    birthYear = birthDate.slice(0, 4);

    try {
        await register(
            inputRegisterEmail.value, 
            inputRegisterPassword.value, 
            inputNickname.value, 
            inputFirstName.value, 
            inputLastName.value, 
            inputPhone.value, 
            gender, 
            selectCity.value,
            selectCountry.value,  
            birthDay, 
            birthMonth, 
            birthYear
        );
        // show success notify
        notify({ msg: 'Register success', className: 'alert-success' });
    } catch (error) {
        // show error notify
        notify({ msg: 'Register faild', className: 'alert-danger' });
    }

    registerForm.reset();
}

async function onLoad() {
    try {
        const countries = await getCountries();
        renderCountriesList(countries);
    } catch (error) {
        console.log(error);
    };
}

async function onSelectCountryChange() {
    if (selectCountry.value === 'Choose...') {
        selectCity.innerHTML = '';
        selectCity.setAttribute('disabled', 'disabled');
        return;
    };

    const country = selectCountry.value;
    const counrtyId = selectCountry.querySelector(`option[value="${country}"]`).dataset.id;
    
    try {
        const cities = await getCities(counrtyId);
        renderCytiesList(cities);
    } catch (error) {
        console.log(error);
    };
}