let searchInput = document.querySelector('#searchInput');
let todayTemp = document.querySelector('#tempToday');
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

async function getUserCurrentWeather(lat = userLatitude, long = userLongitude) {
  console.log(userLatitude, userLongitude);

  let weather = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=1689e76bab55400991481619231508&q=${lat},${long}`
  );
  if (weather.status == 200) {
    console.log('status 200');
  }
}

// getUserCurrentWeather(userLatitude, userLongitude);
getUserCurrentWeather();
