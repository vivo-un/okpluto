"use strict";

import Promise from 'bluebird'
import { getLatLng } from './userServices.js';

  const getEvents = function () {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'api/events',
        type: 'GET',
        success: resolve,
        error: reject
      });
    });
  };

  const saveEvent = function (data) {
    data.creator = localStorage.getItem('mongoUserId');
    getLatLng(data.loc)
    .then(function (results) {
      data.lat = results.lat;
      data.lng = reuslts.lng;
    });
    data.date = data.toDate();
    console.log(data);
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'api/events',
        type: 'POST',
        data: data,
        success: resolve,
        error: reject
      });
    });
  };


module.exports = {
  getEvents: getEvents,
  saveEvent: saveEvent
};