"use strict";

var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  creator: String,
  id: {type: String, required: true, index: {
    unique: true
  }},
  category: String,
  loc: String,
  lat: Number,
  lng: Number,
  picLink: String,
  date: Date,
  time: String,
  attendees: [String]
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;