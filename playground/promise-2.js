const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCD2Ue21yIN0kFflLE1ziDk20b4oaQdIMk`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google Server');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address');
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          lat: body.results[0].geometry.location.lat,
          lng: body.results[0].geometry.location.lng
        });
      }
    });
  })
};

geocodeAddress('20117')
  .then((res) => {
    console.log(res.lat);
    console.log(res.lng);
  })
  .catch((err) => {
    console.log(err);
  })