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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
              <div class="week-forecast-date">${day}</div>
              <img
                src="http://openweathermap.org/img/wn/01n@2x.png"
                alt="ball"
                width="60px"
              />
              <div class="week-forecast-temperature">
                <span class="week-forecast-temperature-max">18º</span>
                <span class="week-forecast-temperature-min">12º</span>
              </div>
            </div>  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeather(response) {
  celsiusTemp = response.data.main.temp;
  console.log(response.data);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].main;`);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#situation").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#windSpeed"
  ).innerHTML = `Wind speed: ${response.data.wind.speed} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.wind.speed} %`;
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

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("click", handleCitySubmit);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("São Paulo");
displayForecast();
