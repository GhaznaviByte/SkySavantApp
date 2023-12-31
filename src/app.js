function updateContent(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchButton = document.querySelector("#submit-input");
searchButton.addEventListener("click", updateContent);

function searchCity(city) {
  let apiKey = "a8b8d02a8ccd7d0ta93931494eef0o1b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemperature);
}

function getForecast(city) {
  let apiKey = "a8b8d02a8ccd7d0ta93931494eef0o1b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function updateTemperature(response) {
  let date = new Date(response.data.time * 1000);

  let currentCityElement = document.querySelector("#current-city");
  let currentTimeElement = document.querySelector("#current-time");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let currentIconElement = document.querySelector("#icon");
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );

  currentCityElement.innerHTML = response.data.city;
  currentTimeElement.innerHTML = updateDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}Km/h`;
  currentIconElement.innerHTML = `<img
                    class="current-icon"
                    src="${response.data.condition.icon_url}"
                  />`;
  currentTemperatureElement.innerHTML = Math.round(
    response.data.temperature.current
  );

  getForecast(response.data.city);
}

function updateDate(date) {
  let days = [
    `Monday`,
    `Tuesday`,
    `wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
    `Sunday`,
  ];

  let day = days[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [`Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-day">
                  <div class="forecast-date">${formatDay(day.time)}</div>
                  <div ><img src="${
                    day.condition.icon_url
                  }" class="forecast-icon"/></div>
                  <div class="forecast-temperatures"><div class="forecast-temperature-min">${Math.round(
                    day.temperature.minimum
                  )}°</div>
                  <div class="forecast-temperature-max">${Math.round(
                    day.temperature.maximum
                  )}°</div>
                  </div>
              </div>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

//Dark mode & Light mode switch toggle
let switchToggle = document.getElementById("switch-toggle");
switchToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

searchCity("Washington");
