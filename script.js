let searchInput = document.querySelector('#searchInput');
let todayTemp = document.querySelector('.tempToday');
let city = document.querySelector('.city');
let region = document.querySelector('.region');
let country = document.querySelector('.country');
let userLatitude;
let userLongitude;

// !Geo location

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);

  console.log('location works 🎉✨');
} else {
  console.log('geolocation not supported by your browser');
}

function showPosition(position) {
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;

  console.log(userLatitude, userLongitude);
}

// ! fetch api
async function getUserCurrentWeather(lat = 30.0994522, long = 31.3328633) {
  console.log(userLatitude, userLongitude);

  let weather = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=1689e76bab55400991481619231508&q=${lat},${long}`
  );
  if (weather.status == 200) {
    console.log('status 200');
    console.log(weather.json());
  }
}

async function searchWeather(location) {
  let weather = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=1689e76bab55400991481619231508&q=${location}`
  );
}

searchInput.addEventListener('input', async function () {
  let userInput = this.value;
  let weather = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=1689e76bab55400991481619231508&q=${userInput}&days=3`
  );
  let finalWeather = await weather.json();

  // # day 0

  todayTemp.innerHTML = finalWeather.current.temp_c;
  document.querySelector('.day-0 .sunny').innerHTML =
    finalWeather.current.condition.text;

  document
    .querySelector('.day-0 .today-icon')
    .setAttribute('src', finalWeather.current.condition.icon);
  city.innerHTML = finalWeather.location.name;
  region.innerHTML = finalWeather.location.region;
  country.innerHTML = finalWeather.location.country;

  //  #day 1
  document.querySelector('.day-1 .tempToday').innerHTML =
    finalWeather.forecast.forecastday[1].day.avgtemp_c;
  document.querySelector('.day-1 .city').innerHTML = city.innerHTML;
  //   document.querySelector('.day-1 .region') = city.innerHTML;
  //   document.querySelector('.day-1 .country');

  // #day 2

  console.log(finalWeather);
});
