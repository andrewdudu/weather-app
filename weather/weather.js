const request = require('request');
const dotenv = require('dotenv');
dotenv.config();

var getWeather = (locationObj, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${process.env.FORECAST_KEY}/${locationObj.lat},${locationObj.lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (response.statusCode === 200) {
      callback(null, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    } else {
      callback('Unable to fetch weather.')
    }
  })
}

module.exports = {
  getWeather
}