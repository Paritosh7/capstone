/** responseSection - It's the section which will display the main information to the user. Be it the destination or an error.
 * weatherForecaseSection - It contains the 16 day weather data for
 * the user if available.
 */

let responseSection = document.getElementById("response-section");
let weatherForecastSection = document.getElementById("weather-forecast");

/** if the response from the server (after calling the APIs) is valid,
 *  this function will be called.
 */
function updateUIForValidResponse(res) {
  console.log(res);
  weatherForecastSection.style.display = "grid";

  /** calling createWeatherForecastDiv to populate weather list */
  let documentFragment = document.createDocumentFragment();

  const weatherListDocumentFragment = createWeatherForecastDiv(res);

  responseSection.innerHTML = `
                <div id="response-div">
                  <div id="top">
                    <h3 id="destination">Your trip to ${res.destination}, 
                    <span style="text-transform:uppercase;">${res.countryData.countryName}</span>
                    </h3>
                    <img style="width :20px ; height:20px;"src="${res.countryData.flag}" alt="" srcset="">
                  </div>
                  <h3>It is on ${res.dateDays.date}. That's in ${res.dateDays.days} days. Start Packing!</h3>
                  <div id="middle">
                    <div class="image-container">
                    <img id="pixabay-image" src="${res.pixabayData}" alt="" srcset="">
                    </div>
                    <div class="current-container">
                      <h2>Today's weather</h2>
                        <ul>
                          <li>Current Temperature : ${res.currentWeatherData.temperature}</li>
                          <li>Visibility : ${res.currentWeatherData.visibility}</li>
                          <li>${res.currentWeatherData.description}</li>
                          <li>Air Quality : ${res.currentWeatherData.airQuality}</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div class="country-data">
                      <h3>${res.countryData.countryName}</h3>
                      <p>${res.countryData.countryName} is in ${res.countryData.region} and has a population of over ${res.countryData.population}, with ${res.countryData.primaryLanguage} as the country's most commonly spoken language.</p>
                      <p>Capital: ${res.countryData.capital}</p>
                      <p>Currency : ${res.countryData.currency}</p>
                  </div>
                </div>`;

  documentFragment.appendChild(weatherListDocumentFragment);

  /** weatherForecastSection can already be populated, as we are using          appendChild hence, if the children elements are already present, we       need to remove the previous data, so that new data can be added.
   */
  if (weatherForecastSection.childElementCount > 0) {
    weatherForecastSection.innerHTML = "";
  }
  weatherForecastSection.appendChild(documentFragment);
}

/** createWeatherForecastDiv will create the 16days weather forecast
 *  and further populated.
 */
function createWeatherForecastDiv(res) {
  weatherForecastSection.setAttribute("class", "weather-list-class");
  let weatherListDocumentFragment = document.createDocumentFragment();

  const obj = res.weatherForecastDataObj;

  for (const property in obj) {
    let div = document.createElement("div");
    div.setAttribute("class", "weather-list-div");
    div.innerHTML = `<h6>Date: ${obj[property].date}</h6>
    <ul>
      <li>Description: ${obj[property].description}</li>
      <li>Precipitation chance: ${obj[property].precipitationChances}</li>
      <li>Temperature: ${obj[property].temperature}</li>
      <li>Visibility: ${obj[property].visibility}</li>
    </ul>`;

    weatherListDocumentFragment.appendChild(div);
  }
  return weatherListDocumentFragment;
}

/** If an error is encountered, updateUIForError is called and the UI is
 * updated with the relevant data.
 */
function updateUIForError(err) {
  weatherForecastSection.style.display = "none";
  console.log(err);
  responseSection.innerHTML = ` <div id="error">
    <h3>We are sorry! This shouldn't have happened! While we try to fix it, make sure you are following the correct protocol. Thank you!  </h3>
    <ul>
      <li>Valid Date(YYYY-MM-DD, Y = Year, M = Month, D = Date) is entered within the provided limit.</li>
      <li>Valid city name is entered</li>
      <li>Please check the internet connection</li>
      <li>The city name provided, isn't available with us. We will soon incorporate this. Thank you! </li>
    </ul> 
  <div>`;
}

export { updateUIForValidResponse, updateUIForError };
