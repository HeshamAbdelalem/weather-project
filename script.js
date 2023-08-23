let searchInput = document.querySelector('#searchInput');
let todayTemp = document.querySelector('.tempToday');
let feelsLike = document.querySelector('.feelsLike');
let city = document.querySelector('.city');
let region = document.querySelector('.region');
let country = document.querySelector('.country');
let userLatitude;
let userLongitude;
let finalWeather;
let userInput = `${userLatitude},${userLongitude}`;

// !Geo location

function getLongAndLat() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

let userPosition = async () => {
  try {
    let position = await getLongAndLat();
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;

    console.log(userLatitude, userLongitude);

    await getUserCurrentWeather(userLatitude, userLongitude, displayHtml);
  } catch {
    console.log(e.message);
  }
};

if (userInput.length == 0) {
  userInput = searchInput.value || `${userLatitude},${userLongitude}`;
}

// ! fetch api
async function getUserCurrentWeather(userLatitude, userLongitude, callback) {
  console.log('this is the user current weather func');

  let weather = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=1689e76bab55400991481619231508&q=${userLatitude},${userLongitude}`
  );
  if (weather.status == 200) {
    console.log('status 200');
    console.log('from getusercurrentweather func', userLatitude, userLongitude);
  }
}

userInput = `${userLatitude},${userLongitude}`;
console.log('userInput: ', userInput);

searchInput.addEventListener('input', async function () {
  console.log('userInput: ', userLatitude, userLongitude);

  userInput = this.value || `${userLatitude},${userLongitude}`;
  console.log('userInput: ', userInput);

  let weather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1689e76bab55400991481619231508&q=${userInput}&days=3`
  );
  finalWeather = await weather.json();

  console.log('final weather:', finalWeather);
  callback = displayHtml();
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

userPosition();
