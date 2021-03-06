# Capstone - Travel App

This is the final project for Udacity FrontEnd Developer Nanodegree.

> Enter a valid city name and a valid date for the travel, the app displays relavant information regarding the place. Valid date (YYYY-MM-DD, from the date requesting + 15 days) & valid city depends on the API http://www.geonames.org/export/web-services.html, if it has the data.

Entering an invalid place, results in a message which displays the details of what could have gone wrong with the request.

Also, this project supports cross browser rendering for Date used. For ex. Safari doesn't support Date. Therefore, a message is displayed to the user regarding the minimum date (whenever making the request) and maximum date allowed (+ 15 days from today), so that the user can enter the correct date. If the user still enters an incorrect date, error message is displayed on the screen.

## API's Used

- [Geonames API](http://www.geonames.org/export/web-services.html)
- [WeatherBit API](https://www.weatherbit.io/api)
- [Pixabay API](https://pixabay.com/api/docs/)
- [REST Countries API](https://restcountries.eu/)

## Goals (for learning)

- asynchronously calling multiple API's
- Handling errors
- Dynamically adding data to the webpage
- Broadly understanding cross browser rendering
- Makin responsive webpage
- Configuring Webpack broadly
- Using loaders and plugins
- Learning about development and Production environment
- Unit Testing using Jest
- Further optimising the code using OptimizeCSSAssetsPlugin and TerserPlugin
- Adding service workers for offline functionality

## Extended Feature (Requirement)

- Integrate the [REST Countries API](https://restcountries.eu/) to pull in data for the country being visited.

## Installation

First clone the project. Then in the root directory of your project open terminal run

```bash
npm install
```

After all the relevant dependencies are added, you need to build the project, production environment which will create a dist folder.

```bash
npm run build-prod
```

Once done, you need to run a server (local machine). In the terminal run

```bash
npm start
```

Thank you for reading this. Keep Learning!
