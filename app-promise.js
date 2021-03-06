const yargs = require('yargs');
const axios = require('axios');
const dotenv = require('dotenv');
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;
dotenv.config();

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GMAPS_KEY}`;

axios.get(geocodeUrl)
  .then((res) => {
    if (res.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that location.');
    }

    var lat = res.data.results[0].geometry.location.lat;
    var lng = res.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${process.env.FORECAST_KEY}/${lat},${lng}`;
    return axios.get(weatherUrl);
  })
  .then((res) => {
    const temperature = res.data.currently.temperature;
    const apparentTemperature = res.data.currently.apparentTemperature;
    console.log(`The temperature is ${temperature}. But it feels like ${apparentTemperature}`);
  })
  .catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to Google server.');
    } else {
      console.log(e.message);
    }
  })