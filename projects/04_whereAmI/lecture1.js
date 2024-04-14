"use strict";

// ---- ---- AJAX and APIs ---- ----
const baseUrl = "https://countries-api-836d.onrender.com/countries";
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
const getCountryAndNeighbour = function (country) {
  const request = getConuntryData(country);

  // 💡Rely on events and callbacks to handle asynchronous results (Callback hells)
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    const neighbour = data.borders?.[0];
    if (!neighbour) return;

    const request2 = getConuntryData(neighbour, "alpha");
    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, "neighbour");
    });
  });
};

// Parallel AJAX Requests - Reload the page multiple times as a trial
getCountryAndNeighbour("portugal");
getCountryAndNeighbour("usa");
getCountryAndNeighbour("germany");

function getConuntryData(country, type = "name") {
  const request = new XMLHttpRequest();
  request.open("GET", `${baseUrl}/${type}/${country}`);
  request.send();
  return request;
}

function renderCountry(data, className) {
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
