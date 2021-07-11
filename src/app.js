import codes from './codes.js';
import { postData, getData, removeData } from './currency_crud.js';

const currencyCodesRef = document.querySelector('#currencyCodesRef');
const btnCheckCurrencyRef = document.querySelector('#checkCurrency');
const resultRef = document.querySelector('#resultRef');
const cardRef = document.querySelector('#cardRef');
const alertMessageRef = document.querySelector('#alertMessage');
const listItemtRef = document.querySelector('#listItemtRef');
const listRef = document.querySelector('#listRef');

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

codes.forEach((code) => {
  const optTag = document.createElement('option');
  const optText = document.createTextNode(code);
  optTag.appendChild(optText);

  optTag.setAttribute('value', code);
  currencyCodesRef.appendChild(optTag);
});

const deleteItem = (evt) => {
    const item = evt.target.parentElement
    const id = item.getAttribute("data-id")
    removeData(`http://localhost:3000/currencies/${id}`)
    item.remove();

}

const createElement = (data) => {
    const itemRef = listItemtRef.cloneNode(true);

    itemRef.setAttribute("data-id", data.id)

    const badge = itemRef.querySelector('.badge');
    const code = itemRef.querySelector('.fw-bold');
    const btnDelete = itemRef.querySelector('.btn-danger');
    const rate = code.nextElementSibling;
    badge.innerText = moment(data.date).fromNow();
    code.innerText = data.code;
    rate.innerText = data.rate;

    btnDelete.addEventListener('click', deleteItem)

    itemRef.classList.remove('hidden');
    listRef.appendChild(itemRef);
};

const showResults = () => {
  const result = getData('http://localhost:3000/currencies');
  result.then((r) => {
    r.forEach((item) => {
      console.log(item);
      createElement(item);
    });
  });
};

showResults();

const getExchangeRate = async (code) => {
  const url = 'http://api.nbp.pl/api/exchangerates/rates/a/';
  return await fetch(`${url}${code}/`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
      return response.text();
    })
    .catch((e) => e);
};

// const result = await getExchangeRate("hrk");
// console.log(result);

// btnCheckCurrencyRef.addEventListener("click", function(event){
//   event.preventDefault();
//   console.log(this);
// });

btnCheckCurrencyRef.addEventListener('click', (event) => {
  event.preventDefault();

  const code = currencyCodesRef.value;

  const result = getExchangeRate(code);

  const cardResult = cardRef.cloneNode(true);
  cardResult.classList.remove('hidden');

  const cardHeader = cardResult.querySelector('.card-header');
  const cardTitle = cardResult.querySelector('.card-title');
  const cardText = cardResult.querySelector('.card-text');

  result.then((data) => {
    if (typeof data === 'string') {
      alertMessageRef.innerText = `${code} is not found. Try another currency.`;
      alertMessageRef.classList.remove('hidden-anim');
    } else {
      alertMessageRef.classList.add('hidden-anim');
      cardHeader.innerText = data.code;
      cardText.innerText = data.rates[0].mid;
      cardTitle.innerText = data.currency.capitalize();
      resultRef.prepend(cardResult);

      const db_currency = {
        code: data.code,
        name: data.currency,
        rate: data.rates[0].mid,
        date: new Date(),
      };

      postData('http://localhost:3000/currencies', db_currency);
    }
  });
});
