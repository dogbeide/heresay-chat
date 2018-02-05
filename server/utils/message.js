const moment = require('moment');

var genMsg = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
};

var genGeoMsg = (from, lat, lng) => {
  return {
    from,
    url:  `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: moment().valueOf()
  }
};

module.exports = {genMsg, genGeoMsg};
