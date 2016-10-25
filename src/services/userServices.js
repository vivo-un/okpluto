"use strict";

import Promise from 'bluebird'

module.exports =  {

  getLatLng: function(address) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'api/geocode?loc=' + address,
        type: 'GET',
        success: resolve,
        error: reject
      });
    });
  },

  updateDb: function(newProps) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'api/users',
        type: 'PUT',
        data: newProps,
        success: resolve,
        error: reject
      });
    });
  },

  getUsers: function() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'api/users',
        type: 'GET',
        success: resolve,
        error: reject
      });
    });
  },

  //POST to API to get mongoDB user info
  saveUser: function(idToken) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/signin',
        type: 'POST',
        data: {id: idToken},
        success: resolve,
        error: reject
      });
    });
  },

  findUser: function(dbId) {
    dbId = dbId || localStorage.getItem('mongoUserId');
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `api/users?dbId=${dbId}`,
        type: 'GET',
        success: resolve,
        error: reject
      });
    });
  },

  updateUser: function(newProps) {
    newProps.dbId = localStorage.getItem('mongoUserId');
    if (newProps.loc) {
      let self = this;
      this.getLatLng(newProps.loc)
        .then(function(results) {
          newProps.lat = results.lat;
          newProps.lng = results.lng;
          self.updateDb(newProps);
        });
    } else {
      this.updateDb(newProps);
    }
  },

  deleteUser: function(dbId) {
    dbId = dbId || localStorage.getItem('mongoUserId');
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'api/users',
        type: 'DELETE',
        data: {dbId: dbId},
        success: resolve,
        error: reject
      })
    })
  }
};