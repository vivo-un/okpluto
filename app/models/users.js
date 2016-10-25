"use strict";

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: { type: String, index: {
    unique: true
  }},
  id: {type: String, required: true, index: {
    unique: true
  }},
  firstname: String,
  lastname: String,
  profilepic: String,
  loc: String,
  lat: Number,
  lng: Number,
  picLink: String,
  dogname: String,
  dogLikes: [String],
  dogBreed: String,
  dogAge: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;