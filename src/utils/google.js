import GoogleMapsLoader from 'google-maps';
// import api from '../../config/api.js';
import Promise from 'bluebird'
require('dotenv').config();
var apiKeys = process.env.API_KEY;

GoogleMapsLoader.KEY = apiKeys;

exports.googleLoader = new Promise ((resolve, reject) => {GoogleMapsLoader.load(function(google) {
      resolve(google);
    })
  })

