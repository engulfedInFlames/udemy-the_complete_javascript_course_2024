"use strict";

// TODO
// 1. Feature to edit a workout message
// 2. Feature to sort workouts
// 3. Feature to show all workouts

class Workout {
  // If you want to make sure this code valid at least in ES6, you must have to declare this variables inside the constructor.
  date = new Date();
  // In real-world, use 3rd-party like UUID
  id = Date.now().toString(36) + Math.random().toString(36).substring(2);

  constructor(coords, distance, duration) {
    // this.date = ...
    // this.id = ...
    this.coords = coords; // {lat, lng}
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.type = "running";
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.type = "cycling";
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
const btnDelete = document.querySelector(".btn--delete");

class App {
  MARKER_DEFAULT_HEIGHT = 36;

  #map; // _map;
  #mapEvent; // _mapEvent;
  #markers = []; //
  #workouts = [];

  _icons = {
    defaultIcon: "icon.png",
  };
  _texts = {
    current: "👋You are here!",
    running: "🏃‍♂️Running",
    cycling: "🚴‍♂️Cycling",
  };

  constructor() {
    this._init();

    form.addEventListener("submit", this._placeMarkerAndPanTo.bind(this));
    inputType.addEventListener("change", this._toggleElevationField.bind(this));
    containerWorkouts.addEventListener("click", this._clickWorkout.bind(this));
    btnDelete.addEventListener("click", this._removeAllWorkouts.bind(this));
    this._getLocalStorage();
  }

  _init() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const currentLatlng = { lat, lng };

        const currentPosition = new Workout(currentLatlng, 0, 0);
        this._loadMap(currentPosition.coords);
        this._placeMarker(currentPosition);
      },
      (err) => alert(`Error: ${err.message}`)
    );
  }

  async _loadMap(latLng, zoom = 15) {
    const { Map } = await google.maps.importLibrary("maps");
    this.#map = new Map(document.getElementById("map"), {
      zoom,
      center: latLng,
      mapId: "Mapty",
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        mapTypeIds: ["roadmap"],
        position: google.maps.ControlPosition.TOP_RIGHT,
      },
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      gestureHandling: "cooperative", // greedy, auto, none
    });

    this.#map.addListener("click", (mapE) => {
      this.#mapEvent = mapE;
      this._showForm();
    });
  }

  async _placeMarker(workout) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const marker = new AdvancedMarkerElement({
      map: this.#map,
      position: workout.coords,
      content: this._buildContent(workout?.type),
      gmpDraggable: true,
    });
    marker.addListener("click", (e) => {
      this._panTo(marker.position);
    });
    marker.id = workout.id;

    if (!workout.hasOwnProperty("type")) return;

    this.#markers.push(marker);
  }

  _placeMarkerAndPanTo(e) {
    e.preventDefault();

    const workout = this._createWorkout();
    if (!workout) return;

    this._placeMarker(workout);
    this._renderWorkout(workout);
    this._panTo(workout.coords);
    this._hideForm();
    this.#workouts.push(workout);
    this._setLocalStorage(workout);
  }

  _centerMarker(workout) {
    const { coords } = this.#workouts.find((w) => w.id === workout.dataset.id);

    if (!coords) return;

    this._panTo(coords);
  }

  _createWorkout() {
    const validatePositiveNumbers = (...values) =>
      values.every((val) => val > 0 && Number.isFinite(val));

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const metric =
      type === "running" ? +inputCadence.value : +inputElevation.value;

    if (!validatePositiveNumbers(distance, duration, metric)) {
      alert("The input must be a positive number");
      return null;
    }

    return type === "running"
      ? new Running(this.#mapEvent.latLng, distance, duration, metric)
      : new Cycling(this.#mapEvent.latLng, distance, duration, metric);
  }

  _renderWorkout(workout) {
    // prettier-ignore
    const [icon1, icon2, rate, metric, rateUnit, metricUnit] =
      workout.type === "running"
        ? ["🏃‍♂️", "🦶🏼", workout.pace.toFixed(1), workout.cadence, "min/km", "spm"]
        : ["🚴‍♀️", "⛰", workout.speed.toFixed(1), workout.elevation, "km/h", "m"];

    const html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <div class="workout__header">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__close">❌</div>
        </div>
        <div class="workout__details">
          <span class="workout__icon">${icon1}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${rate}</span>
          <span class="workout__unit">${rateUnit}</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">${icon2}</span>
          <span class="workout__value">${metric}</span>
          <span class="workout__unit">${metricUnit}</span>
        </div>
      </li>
    `;

    btnDelete.insertAdjacentHTML("afterend", html);
  }

  _panTo(latLng) {
    this.#map.panTo(latLng);
  }

  _buildContent(type = "current") {
    const content = document.createElement("div");
    content.classList.add("popup");
    content.innerHTML = `
    <img class="popup__icon" src=${this._icons.defaultIcon} alt="Marker" aria-hidden="true">
    <div class="popup-detail">
      <span class="popup-detail__text">${this._texts[type]}</span>
    </div>
    `;

    return content;
  }

  _removeWorkout(workout) {
    const isConfirmed = window.confirm("Are you sure to delete this workout?");
    if (!isConfirmed) return;

    const { id } = workout.dataset;

    this._removeWorkoutById(id);
    this._removeMarkerById(id);
    this._setLocalStorage();
    workout.remove();
  }

  _removeAllWorkouts() {
    const isConfirmed = window.confirm("Are you sure to delete all workouts?");

    if (!isConfirmed) return;

    this.#markers.forEach((m) => m.setMap(null));
    this.#markers = [];
    this.#workouts = [];
    containerWorkouts.innerHTML = "";
    this._setLocalStorage();
  }

  _removeWorkoutById(id) {
    this.#workouts = this.#workouts.filter((w) => {
      w.id !== id;
    });
  }

  _removeMarkerById(id) {
    const marker = this.#markers.find((m) => m.id === id);
    if (marker) {
      marker.setMap(null);
      this.#markers = this.#markers.filter((m) => m.id !== id);
    }
  }

  // HANDLE FORM
  _showForm() {
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _hideForm() {
    this._clearInputValues();
    this.#mapEvent = null;
    form.classList.add("hidden");
  }

  _clickWorkout(e) {
    const { target } = e;
    const workout = target.closest(".workout");

    if (!workout) return;

    // Action for clicking ❌
    if (target.classList.contains("workout__close")) {
      this._removeWorkout(workout);
      return;
    }

    // Action for clicking workout
    this._centerMarker(workout);
  }

  _toggleElevationField() {
    this._clearInputValues();
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _clearInputValues() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
  }

  // HANDLE LOCAL STORAGE
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach((w) => {
      const _w =
        w.type === "running"
          ? Object.assign(
              new Running(w.coords, w.distance, w.duration, w.cadence),
              w
            )
          : Object.assign(
              new Cycling(w.coords, w.distance, w.duration, w.elevation),
              w
            );
      this._renderWorkout(_w);
      this._placeMarker(_w);
    });
  }

  _setLocalStorage() {
    // Local Storage is very simple API only used for small amount of data
    // Fundamentally, it works as a blocking method

    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  _resetLocalStorage() {
    localStorage.removeItem("workouts");
    location.reload();
  }
}

const app = new App();
