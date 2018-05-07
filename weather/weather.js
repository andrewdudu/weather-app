const request = require('request');

var getWeather = (locationObj, callback) => {
  request({
    url: `https://api.darksky.net/forecast/d1d929a6d3f6402146b41ecc2e84a611/${locationObj.lat},${locationObj.lng}`,
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