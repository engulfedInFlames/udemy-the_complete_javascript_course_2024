// ---- ---- Async Await ---- ----

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
btn.addEventListener("click", whereAmI);

// IIFE + async await
// (async () => {
//   try {
//     const res = await whereAmI();
//     console.log(res);
//   } catch (err) {
//     console.error(`${err.message}`);
//   }
// })();

// Promise.all
get3Countries("portugal", "canada", "tanzania");

// Promise.race
Promise.race([
  getJSON("portugal"),
  getJSON("canada"),
  getJSON("tanzania"),
  timeout(0.01),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Success"),
]).then((res) => console.log(res));

// Promise.any
// Promise.any is fulfilled as soon as one of the promises is fulfilled, and is rejected if all of the promises are rejected
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Success"),
]).then((res) => console.log(res));

async function whereAmI() {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    const url1 = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    const res1 = await fetch(url1);

    if (!res1.ok) throw new Error(`Problem with geocoding ${res1.status}`);
    const {
      address: { country },
    } = await res1.json();
    const url2 = "https://countries-api-836d.onrender.com/countries/name";
    const res2 = await fetch(`${url2}/${country.toLowerCase()}`);

    if (!res2.ok)
      throw new Error(`Problem with getting country ${res2.status}`);
    const [data] = await res2.json();
    renderCountry(data);
    return true;
  } catch (err) {
    console.error(`${err.message}`);
  }
  return false;
}

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function renderCountry(data, className = "") {
  const { flag, name, region, population, languages, currencies } = data;
  const languageName = languages[0].name;
  const currencyName = currencies[0].name;

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${flag}" />
    <div class="country__data">
      <h3 class="country__name">${name}</h3>
      <h4 class="country__region">${region}</h4>
      <p class="country__row"><span>👫</span>${(+population / 1000000).toFixed(
        1
      )}M people</p>
      <p class="country__row"><span>🗣️</span>${languageName}</p>
      <p class="country__row"><span>💰</span>${currencyName}</p>
    </div>
  </article>
`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
}

async function getJSON(c) {
  const url = "https://countries-api-836d.onrender.com/countries/name";
  const res = await fetch(`${url}/${c.toLowerCase()}`);
  if (!res.ok) throw new Error(`Problem with getting country ${res.status}`);
  return (await res.json())?.[0];
}

async function get3Countries(c1, c2, c3) {
  try {
    // When we want to run promises that don't depened one another in parallel, we use Promise.all
    // Promise.all is rejected when one of the promises is rejected
    const data = await Promise.all([getJSON(c1), getJSON(c2), getJSON(c3)]); // try 'race',
    data.map((d) => console.log(d.capital));
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

function timeout(sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request took too long"));
    }, sec * 1000);
  });
}
