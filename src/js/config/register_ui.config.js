const register_UI = {
    registerForm: document.forms['registerForm'],
    inputRegisterEmail: document.getElementById('inputEmail'),
    inputRegisterPassword: document.getElementById('inputPassword'),
    inputNickname: document.getElementById('inputNickname'),
    inputFirstName: document.getElementById('inputFirstName'),
    inputLastName: document.getElementById('inputLastName'),
    inputPhone: document.getElementById('inputPhone'),
    radios: [...document.querySelectorAll('input[type="radio"]')],
    selectCountry: document.getElementById('selectCountry'),
    selectCity: document.getElementById('selectCity'),
    inputBirthDate: document.getElementById('inputBirthDate'),
}

export default register_UI;