const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    weather.getWeather({
      lat: res.lat,
      lng: res.lng
    }, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`It's currently ${response.temperature}. But it feels like ${response.apparentTemperature}`);
      }
    })
  }
});
