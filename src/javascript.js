let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();

let todayDate = document.querySelector("#date");
todayDate.innerHTML = `${
  days[now.getDay()]
}, ${now.getHours()}:${now.getMinutes()}`;

function displayWeather(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#situation").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = `a6ecfc60d56decea519885f1b97d34fd`;
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(displayWeather);
}

function handleCitySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = `a6ecfc60d56decea519885f1b97d34fd`;
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlLocation).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("click", handleCitySubmit);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("São Paulo");
