"use strict";

// ---- ---- Promises and The Fetch API ---- ----
const baseUrl = "https://countries-api-836d.onrender.com/countries";
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
// Building promises: Fetch API returns promises
const request = fetch(`${baseUrl}/name/portugal`);
console.log(request);

// Consuming promises:
const getConuntryData = function (country, type = "name") {
  getJSON(`${baseUrl}/${type}/${country}`, "Country not found")
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = Array.isArray(data[0].borders) && data[0].borders[0];

      if (!neighbour) throw new Error("No neighbour found!");

      // make sure to always return the promise
      return getJSON(`${baseUrl}/alpha/${neighbour}`, "Country not found");
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// getConuntryData("portugal");
// getConuntryData("usa");

btn.addEventListener("click", whereAmI);

///////////////////////////////////////
// functions
function getJSON(url, errMsg = "Something went wrong") {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`${errMsg} (${res.status})`);
    return res.json();
  });
}

function renderCountry(data, className) {
  //  prettier-ignore
  const { flag, name, region, population, languages:[firstLanguage], currencies:[firstCurrency] } = data;
  const { name: languageName } = firstLanguage;
  const { name: currencyName } = firstCurrency;

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
  // countriesContainer.style.opacity = 1;
}

function renderError(msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
}

///////////////////////////////////////
// Challenge #1
function whereAmI() {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
      return fetch(url);
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then((data) =>
      alert(`You are in ${data.address.city}, ${data.address.country}!`)
    )
    .catch((err) => console.error(`${err.message}`));
}

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

///////////////////////////////////////
// Challenge #2
const imgContainer = document.querySelector(".images");

let curImg;

function wait(seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
}

function createImg(path) {
  return new Promise((resolve, reject) => {
    if (typeof curImg === "object") curImg.style.display = "none";
    curImg = document.createElement("img");
    curImg.src = path;

    curImg.addEventListener("load", () => {
      imgContainer.append(curImg);
      resolve(curImg);
    });
    curImg.addEventListener("error", () => {
      reject(new Error("Image not found"));
    });
  });
}

createImg("img/img-1.jpg")
  .then(() => wait(2))
  .then(() => {
    curImg.style.display = "none";
    return createImg("img/img-2.jpg");
  })
  .then(() => wait(2))
  .then(() => {
    curImg.style.display = "none";
    return createImg("img/img-3.jpg");
  })
  .catch((err) => console.error(err));
