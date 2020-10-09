const fetch = require("node-fetch");
require("dotenv").config();

const GEONAMES_KEY = process.env.GEONAMES_KEY;

async function fetchResponse(destination, date) {
  const coordinatesData = await fetchGeoCoordinatesData(destination);
  let lat = coordinatesData.lat;
  let long = coordinatesData.lng;

  console.log(lat);

  const currentWeatherData = await fetchCurrentWeatherData(lat, long);
  console.log(currentWeatherData);
  const weatherForecastData = await fetchWeatherForecast(lat, long);
  console.log(weatherForecastData);
  const pixabayData = await fetchPixabayData(destination);
  console.log(pixabayData);
  const countryData = await fetchCountryData(coordinatesData.countryCode);
  console.log(countryData);
  return coordinatesData;
}

async function fetchGeoCoordinatesData(destination) {
  const api_url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${GEONAMES_KEY}`;
  const fetchResponse = await fetch(api_url);
  const json = await fetchResponse.json();
  let coordinatesData = {
    lat: json.geonames[0].lat,
    lng: json.geonames[0].lng,
    countryCode: json.geonames[0].countryCode,
  };

  return coordinatesData;
}

async function fetchCurrentWeatherData(latitude, longitude) {
  const api_url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_KEY}`;
  const fetchResponse = await fetch(api_url);
  const json = await fetchResponse.json();

  let currentWeatherData = {
    description: json.data[0].weather.description,
    airQuality: json.data[0].aqi,
    temperature: `${json.data[0].temp} °C`,
    visibility: `${json.data[0].vis} Km`,
  };
  return currentWeatherData;
}

async function fetchWeatherForecast(latitude, longitude) {
  const api_url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_KEY}`;
  const fetchResponse = await fetch(api_url);
  const json = await fetchResponse.json();
  let jsonArr = json.data;
  let weatherForecaseData = [];
  jsonArr.forEach((obj) => {
    let perDayData = {
      date: obj.valid_date,
      description: obj.weather.description,
      precipitationChances: `${obj.pop}%`,
      temperature: `${obj.temp} °C`,
      visibility: `${obj.vis} Km`,
    };
    weatherForecaseData.push(perDayData);
  });
  return weatherForecaseData;
}

async function fetchPixabayData(destination) {
  const api_url = `https://pixabay.com/api/?q=${destination}&image_type=photo&pretty=true&key=${process.env.PIXABAY_KEY}`;
  const fetchResponse = await fetch(api_url);

  const jsonData = await fetchResponse.json();

  return jsonData.hits[0].webformatURL;
}

async function fetchCountryData(countryCode) {
  const api_url = `https://restcountries.eu/rest/v2/alpha?codes=${countryCode}`;
  const fetchResponse = await fetch(api_url);
  const json = await fetchResponse.json();
  const jsonData = json[0];

  let countryData = {
    countryName: jsonData.name,
    capital: jsonData.capital,
    region: jsonData.region,
    population: jsonData.population,
    currency: jsonData.currencies[0].name,
    primaryLanguage: jsonData.languages[0].name,
    flag: jsonData.flag,
  };
  return countryData;
}

module.exports = {
  fetchResponse,
};
