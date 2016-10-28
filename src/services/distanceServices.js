"use strict";

import Promise from 'bluebird'

const getDistance = function(origin, destination) {
  // var originObj = {
  //   originLat: origin.lat,
  //   originLng: origin.lng
  // }

  // var destObj = {
  //   destinationLat: destination.lat,
  //   destinationLng: destination.lng
  // }

  // const serialize = function(obj) {
  //   var str = [];
  //   for(var p in obj)
  //     if (obj.hasOwnProperty(p)) {
  //       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  //     }
  //   return str.join("&");
  // }
  // const url = `api/distance?${serialize(originObj)}&${serialize(destObj)}`
  // console.log(url)
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/api/distance',
      type: 'POST',
      data: {origin: JSON.stringify(origin), destinations: JSON.stringify(destination)},
      success: resolve,
      error: reject
    });
  });
}

module.exports = {
  getDistance: getDistance
}