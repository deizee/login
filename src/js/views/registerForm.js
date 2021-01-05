import register_UI from '../config/register_ui.config';

const { selectCountry, selectCity } = register_UI;

export function renderCountriesList(countries) {
  const template = Object.entries(countries).map(([key, value]) => `<option data-id="${key}" value="${value}">${value}</option>`).join(' ');
  selectCountry.insertAdjacentHTML('beforeend', template);
}

export function renderCytiesList(cities) {
  selectCity.removeAttribute('disabled');
  const template = '<option selected>Choose...</option> ' + Object.values(cities).map((value) => `<option value="${value}">${value}</option>`).join(' ');
  selectCity.innerHTML = template;
}