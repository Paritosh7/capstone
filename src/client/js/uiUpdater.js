let responseSection = document.getElementById("response-section");

function updateUIForValidResponse(res) {
  console.log(res);
  let weatherForecastSection = document.getElementById("weather-forecast");
  let documentFragment = document.createDocumentFragment();

  const weatherListDocumentFragment = createWeatherForecastDiv(res);

  responseSection.innerHTML = `<h1 id="destination">${res.destination}</h1>
                <div class="image-container">
                    <img src="${res.pixabayData}" alt="" srcset="">
                </div>
                <div class="current-container">
                    <h2>Today's weather</h2>
                    <ul>
                        <li>${res.currentWeatherData.description}</li>
                        <li>${res.currentWeatherData.airQuality}</li>
                        <li>${res.currentWeatherData.temperature}</li>
                        <li>${res.currentWeatherData.visibility}</li>
                    </ul>
                </div>
                <div class="country-data">
                    <h3>${res.countryData.countryName}</h3>
                    <img src="${res.countryData.flag}" alt="" srcset="">
                    <p>${res.countryData.countryName} is in ${res.countryData.region} and has a population of over ${res.countryData.population}, with ${res.countryData.primaryLanguage} as the country's most commonly spoken language.</p>
                    <p>Capital: ${res.countryData.capital}</p>
                    <p>Currency : ${res.countryData.currency}</p>
                </div>
                <div class="weather-forecast-data"></div>`;

  documentFragment.appendChild(weatherListDocumentFragment);
  weatherForecastSection.appendChild(documentFragment);
}

function createWeatherForecastDiv(res) {
  console.log("in weatherForecaseDiv");
  let weatherListDocumentFragment = document.createDocumentFragment();

  const obj = res.weatherForecastDataObj;

  for (const property in obj) {
    let div = document.createElement("div");
    div.innerHTML = `<h4>Date: ${obj[property].date}</h4>
    <h4>Description: ${obj[property].description}</h4>
    <h4>Precipitation chance: ${obj[property].precipitationChances}</h4>
    <h4>Temperature: ${obj[property].temperature}</h4>
    <h4>Visibility: ${obj[property].visibility}</h4>`;

    weatherListDocumentFragment.appendChild(div);
  }
  console.log(weatherListDocumentFragment.children);
  return weatherListDocumentFragment;
}

function updateUIForError() {
  responseSection.innerHTML = ` <div id="error">
    <h3>We are sorry! This shouldn't have happened</h3>
    <ul>Please make sure the following
      <li>Valid Date is entered within the provided limit.</li>
      <li>Valid city name entered</li>
      <li>We might not have the data for the provided city</li>
    </ul> 
  <div>`;
}

export { updateUIForValidResponse, updateUIForError };
