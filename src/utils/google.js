import GoogleMapsLoader from 'google-maps';
// import api from '../../config/api.js';
import Promise from 'bluebird'

GoogleMapsLoader.KEY = process.env.API_KEY;

exports.googleLoader = new Promise ((resolve, reject) => {GoogleMapsLoader.load(function(google) {
      resolve(google);
    })
  })

