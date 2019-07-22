const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZGFiZWVycmF6YSIsImEiOiJjanh4NXM2dHcwbjhlM2tscm1meWh3d2dvIn0.52oiErD7gbsmZ71L1ROnrg";

  const urlObj = {
    url,
    json: true
  };

  request(urlObj, (error, { body }) => {
    if (error) {
      callback("unable to connect weather service!", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
