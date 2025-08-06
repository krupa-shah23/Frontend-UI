const countryList = {
  AED: "AE", AFN: "AF", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO", ARS: "AR",
  AUD: "AU", AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", BGN: "BG", BHD: "BH",
  BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR", BSD: "BS", CAD: "CA", CHF: "CH",
  CLP: "CL", CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU", CVE: "CV", CZK: "CZ",
  DJF: "DJ", DKK: "DK", DOP: "DO", DZD: "DZ", EGP: "EG", ETB: "ET", EUR: "FR",
  FJD: "FJ", FKP: "FK", GBP: "GB", GEL: "GE", GHS: "GH", GIP: "GI", GMD: "GM",
  GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK", HNL: "HN", HRK: "HR", HTG: "HT",
  HUF: "HU", IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS",
  JMD: "JM", JOD: "JO", JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM",
  KPW: "KP", KRW: "KR", KWD: "KW", KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB",
  LKR: "LK", LRD: "LR", LSL: "LS", LTU: "LT", LTL: "LT", LVL: "LV", LYD: "LY",
  MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN", MOP: "MO",
  MUR: "MU", MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ", NAD: "NA",
  NGN: "NG", NIO: "NI", NOK: "NO", NPR: "NP", NZD: "NZ", OMR: "OM", PAB: "PA",
  PEN: "PE", PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA",
  RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC",
  SDG: "SD", SEK: "SE", SGD: "SG", SHP: "SH", SLL: "SL", SOS: "SO", SRD: "SR",
  STD: "ST", SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ", TMT: "TM", TND: "TN",
  TRY: "TR", TTD: "TT", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US",
  UYU: "UY", UZS: "UZ", VEF: "VE", VND: "VN", VUV: "VU", YER: "YE", ZAR: "ZA",
  ZMK: "ZM", ZMW: "ZM", ZWD: "ZW",
};

const fromSelect = document.querySelector("select[name='from']");
const toSelect = document.querySelector("select[name='to']");
const amountInput = document.querySelector(".amount input");
const msg = document.querySelector(".msg");
const swapIcon = document.getElementById("swap");
const form = document.querySelector("form");

// Populate the dropdowns with currency codes
function populateDropdowns() {
  for (const currCode in countryList) {
    const fromOption = document.createElement("option");
    fromOption.value = currCode;
    fromOption.innerText = currCode;
    if (currCode === "USD") fromOption.selected = true;
    fromSelect.appendChild(fromOption);

    const toOption = document.createElement("option");
    toOption.value = currCode;
    toOption.innerText = currCode;
    if (currCode === "INR") toOption.selected = true;
    toSelect.appendChild(toOption);
  }
  updateFlag(fromSelect);
  updateFlag(toSelect);
}

// Update flag images based on selected currency
function updateFlag(selectElement) {
  const currCode = selectElement.value;
  const countryCode = countryList[currCode] || "US";
  const parentDiv = selectElement.closest(".select-container");
  const img = parentDiv.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  img.alt = `${currCode} flag`;
}

// Fetch exchange rate from exchangerate.host and display result
async function updateExchangeRate() {
  let amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount < 1) {
    amount = 1;
    amountInput.value = "1";
  }

  const fromCur = fromSelect.value.toUpperCase();
  const toCur = toSelect.value.toUpperCase();

  const url = `https://api.exchangerate.host/convert?from=${fromCur}&to=${toCur}`;


  try {
    msg.innerText = "Fetching exchange rate...";
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error?.info || "API error");
    }

    const rate = data.result;
    const converted = (amount * rate).toFixed(4);

    msg.innerText = `${amount} ${fromCur} = ${converted} ${toCur}`;
  } catch (err) {
    msg.innerText = "Failed to get exchange rate. Try again later.";
    console.error(err);
  }
}

// Event listeners
fromSelect.addEventListener("change", (e) => {
  updateFlag(e.target);
});

toSelect.addEventListener("change", (e) => {
  updateFlag(e.target);
});

swapIcon.addEventListener("click", () => {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  updateFlag(fromSelect);
  updateFlag(toSelect);
  updateExchangeRate();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

// Initialize on page load
window.addEventListener("load", () => {
  populateDropdowns();
  updateExchangeRate();
});
