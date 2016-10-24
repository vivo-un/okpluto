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
  }
}