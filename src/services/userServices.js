"use strict";

import Promise from 'bluebird'

module.exports =  {

  getUsers: function() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'api/users',
        type: 'GET',
        success: resolve,
        error: reject
      })
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
      })
    })
  },

  findUser: function(dbId) {
    dbId = dbId || localStorage.getItem('mongoUserId');
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `api/users?dbId=${dbId}`,
        type: 'GET',
        success: resolve,
        error: reject
      })
    })
  }
}