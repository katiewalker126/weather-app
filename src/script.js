function defaultSearch(city) {
  let units = "metric";
  let apiKey = "159ab5e75e6ed3b8cb370b2d499a9313";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  defaultSearch(city);
}

function showWeather(response) {
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let mainImage = document.querySelector("#main-image");
  mainImage.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#maximum-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minimum-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  getForecast(response.data.coord);
}

function formatDate(timestamp) {
  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  return `${day} ${date} ${month}, ${hours}:${minutes} GMT`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function getForecast(coordinates) {
  let units = "metric";
  let apiKey = "159ab5e75e6ed3b8cb370b2d499a9313";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let dailyForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
    <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
    <div class="forecast-image">
      <img src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" width="80" />
    </div>
    <div class="forecast-max-temperature">
      ${Math.round(forecastDay.temp.max)}°
      <span class="forecast-min-temperature">${Math.round(
        forecastDay.temp.min
      )}°
    </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

defaultSearch("London");
