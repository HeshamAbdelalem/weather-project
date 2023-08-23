let searchInput = document.querySelector("#searchInput");
let todayTemp = document.querySelector(".tempToday");
let feelsLike = document.querySelector(".feelsLike");
let city = document.querySelector(".city");
let region = document.querySelector(".region");
let country = document.querySelector(".country");
let finalWeather;
let userInput = "";

async function getLongAndLat() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchWeatherAndUpdateUI(location) {
  try {
    let weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=1689e76bab55400991481619231508&q=${location}&days=3`
    );
    let weatherData = await weatherResponse.json();
    finalWeather = weatherData;
    displayHtml();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayHtml() {
  if (finalWeather && finalWeather.current) {
    todayTemp.innerHTML = finalWeather.current.temp_c;
    feelsLike.innerHTML = finalWeather.current.feelslike_c;
    city.innerHTML = finalWeather.location.name + ", ";
    region.innerHTML = finalWeather.location.region + ", ";
    country.innerHTML = finalWeather.location.country;

    if (finalWeather.forecast && finalWeather.forecast.forecastday[1]) {
      document.querySelector(".day-1 .tempToday").innerHTML =
        finalWeather.forecast.forecastday[1].day.avgtemp_c;
      document.querySelector(".day-1 .city").innerHTML = city.innerHTML;
    }
  } else {
    console.error("Weather data is not available or is incomplete.");
  }
}

searchInput.addEventListener("input", async function () {
  const inputValue = this.value.trim();

  if (inputValue.length >= 3) {
    userInput = inputValue;
    await fetchWeatherAndUpdateUI(userInput);
  }
});

async function getUserPositionAndWeather() {
  try {
    let position = await getLongAndLat();
    let userLatitude = position.coords.latitude;
    let userLongitude = position.coords.longitude;
    let userLocation = `${userLatitude},${userLongitude}`;
    userInput = userLocation;
    await fetchWeatherAndUpdateUI(userLocation);
  } catch (error) {
    console.error("Error getting user position:", error);
  }
}

getUserPositionAndWeather();