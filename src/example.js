import codes from "./codes.js"

const currencyCodesRef = document.querySelector("#currencyCodesRef");
codes.forEach((code) => {
  const optTag = document.createElement("option");
  const optText = document.createTextNode(code);
  optTag.appendChild(optText);

  optTag.setAttribute("value", code);
  currencyCodesRef.appendChild(optTag);
});

const getExchangeRate = async (code) => {
  const url = "http://api.nbp.pl/api/exchangerates/rates/a/";
  return await fetch(`${url}${code}/`).then((r) => r.json());
};

const result = await getExchangeRate("hrk");
console.log(result);

console.log(codes);
