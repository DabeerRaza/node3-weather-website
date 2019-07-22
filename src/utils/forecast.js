const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/72e8aad861e454f2fa386109e100f072/" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "?lang=ur";

  const urlObj = {
    url,
    json: true
  };

  request(urlObj, (error, { body }) => {
    if (error) {
      callback("unable to connect weather service!", undefined);
    } else if (body.error) {
      callback(body.message, undefined);
    } else {
      callback(undefined, body.timezone);
    }
  });
};

module.exports = forecast;
