import codes from "./codes.js"

const currencyCodesRef = document.querySelector("#currencyCodesRef");
const btnCheckCurrencyRef = document.querySelector("#checkCurrency");

codes.forEach((code) => {
  const optTag = document.createElement("option");
  const optText = document.createTextNode(code);
  optTag.appendChild(optText);

  optTag.setAttribute("value", code);
  currencyCodesRef.appendChild(optTag);
});

const getExchangeRate = async (code) => {
  const url = "http://api.nbp.pl/api/exchangerates/rates/a/";
  return await fetch(`${url}${code}/`)
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
        return response.text();
        })
      
      .catch((e)=>e);
};

const result = await getExchangeRate("hrk");
console.log(result);

btnCheckCurrencyRef.addEventListener("click",function (event){
   // usuwa domyślne działanie przeglądarki (w tym przypadku przeładaowanie strony po wysławniu formularza)
  event.preventDefault();
  // console.log(event.target);

  const code = currencyCodesRef.value;

  const result = getExchangeRate(code);
  const cardResult =cardRef.cloneNode(true);
  cardResult.classList.remove("hidden");
  
  const cardHolder = cardResult.qu
  result.then((r)=>console.log(r));
});
