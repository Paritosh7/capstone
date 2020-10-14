const fetch = require("node-fetch");
require("dotenv").config();

const GEONAMES_API_KEY = process.env.GEONAMES_KEY;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_KEY;

/** fetchResponse will return the entire response from all the APIs */
async function fetchResponse(destination, date, days) {
  const coordinatesData = await fetchGeoCoordinatesData(destination);
  const lat = coordinatesData.lat;
  const long = coordinatesData.lng;
  const dateDays = { date: date, days: days };

  /** all are async calls */
  const currentWeatherData = await fetchCurrentWeatherData(lat, long);
  const weatherForecastData = await fetchWeatherForecast(lat, long);
  const pixabayData = await fetchPixabayData(destination);
  const countryData = await fetchCountryData(coordinatesData.countryCode);

  /** converting weatherForecastData to an object */
  const weatherForecastDataObj = Object.assign({}, weatherForecastData);

  /** response is returned as an object */
  return {
    destination,
    currentWeatherData,
    weatherForecastDataObj,
    pixabayData,
    countryData,
    dateDays,
  };
}

/** fetching coordinated of a valid place name */
async function fetchGeoCoordinatesData(destination) {
  const api_url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${GEONAMES_API_KEY}`;
  const fetchResponse = await fetch(api_url);
  const json = await fetchResponse.json();
  let coordinatesData = {
    lat: json.geonames[0].lat,
    lng: json.geonames[0].lng,
    countryCode: json.geonames[0].countryCode,
  };

  return coordinatesData;
}

/**  fetching the current weather using lat and long*/
async function fetchCurrentWeatherData(latitude, longitude) {
  const api_url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${WEATHERBIT_API_KEY}`;
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

/** fetching a 16 days weather forecast of the valid city, using lat
 * & long of the valid city
 */
async function fetchWeatherForecast(latitude, longitude) {
  const api_url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${WEATHERBIT_API_KEY}`;
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

/** fetching a relevant imageURL of the user entered valid city */
async function fetchPixabayData(destination) {
  const api_url = `https://pixabay.com/api/?q=${destination}&image_type=photo&pretty=true&key=${PIXABAY_API_KEY}`;
  const fetchResponse = await fetch(api_url);

  const jsonData = await fetchResponse.json();

  return jsonData.hits[0].webformatURL;
}

/** fetching the city's country information using country code.  */
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
