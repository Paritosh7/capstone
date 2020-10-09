const fetch = require("node-fetch");
require("dotenv").config();

const GEONAMES_KEY = process.env.GEONAMES_KEY;

async function fetchResponse(destination, date) {
  const coordinatesData = await fetchGeoCoordinatesData(destination);
  console.log(coordinatesData.geonames[0].lng);
  let lat = coordinatesData.geonames[0].lat;
  let long = coordinatesData.geonames[0].lng;

  const currentWeatherData = await fetchCurrentWeatherData(lat, long);
  console.log(currentWeatherData);
  const weatherForecastData = await fetchWeatherForecast(lat, long);
  console.log(weatherForecastData);
  return coordinatesData;
}

async function fetchGeoCoordinatesData(destination) {
  const api_url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${GEONAMES_KEY}`;
  const fetchResponse = await fetch(api_url);
  const json = await fetchResponse.json();
  return json;
}

async function fetchCurrentWeatherData(latitude, longitude) {
  const api_url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_KEY}`;
  const fetchResponse = await fetch(api_url);
  const json = await fetchResponse.json();
  return json;
}

async function fetchWeatherForecast(latitude, longitude) {
  const api_url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHERBIT_KEY}`;
  const fetchResponse = await fetch(api_url);
  const json = await fetchResponse.json();
  return json;
}

async function pixabayData()

module.exports = {
  fetchResponse,
};
