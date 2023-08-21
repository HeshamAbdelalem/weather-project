let searchInput = document.querySelector('#searchInput');
let todayTemp = document.querySelector('.tempToday');
let feelsLike = document.querySelector('.feelsLike');
let city = document.querySelector('.city');
let region = document.querySelector('.region');
let country = document.querySelector('.country');
let userLatitude;
let userLongitude;
let finalWeather;
let userInput;

// !Geo location

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(showPosition);

//   console.log('location works 🎉✨');
// } else {
//   console.log('geolocation not supported by your browser');
// }

function showPosition(position) {
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;

  console.log(userLatitude, userLongitude);
}

async function getLocation() {
  return new Promise(function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log('location works 🎉✨');
    } else {
      console.log('geolocation not supported by your browser');
    }
  });
}

// ! fetch api
async function getUserCurrentWeather() {
  console.log('this is the user current weather func');
  await getLocation();

  let weather = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=1689e76bab55400991481619231508&q=${userInput}`
  );
  displayHtml();
  console.log(weather.json());
  if (weather.status == 200) {
    console.log('status 200');
    console.log('from getusercurrentweather func', userLatitude, userLongitude);
  }
}

searchInput.addEventListener('input', async function () {
  userInput = searchInput.value || `${userLatitude},${userLongitude}`;

  let weather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1689e76bab55400991481619231508&q=${userInput}&days=3`
  );
  finalWeather = await weather.json();

  console.log('final weather:', finalWeather);
  displayHtml();
});

function displayHtml() {
  // # day 0

  todayTemp.innerHTML = finalWeather.current.temp_c;
  document.querySelector('.day-0 .sunny').innerHTML =
    finalWeather.current.condition.text;

  document
    .querySelector('.day-0 .today-icon')
    .setAttribute('src', finalWeather.current.condition.icon);
  feelsLike.innerHTML = finalWeather.current.feelslike_c;
  city.innerHTML = finalWeather.location.name + ', ';
  region.innerHTML = finalWeather.location.region + ', ';
  country.innerHTML = finalWeather.location.country;

  //  #day 1
  document.querySelector('.day-1 .tempToday').innerHTML =
    finalWeather.forecast.forecastday[1].day.avgtemp_c;
  document.querySelector('.day-1 .city').innerHTML = city.innerHTML;
  // document.querySelector('.day-1 .region') = city.innerHTML;

  // #day 2
}

async function doAll() {
  await getLocation();
  await getUserCurrentWeather();
}

doAll();

getUserCurrentWeather();
