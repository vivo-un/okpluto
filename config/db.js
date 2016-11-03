/*
  This file contains the connection to the database! Lets you know via console.logs if your db is working. Otherwise...rut roh...
*/

'use strict';
var dbkeys = process.env.MONGODB_URI ||'mongodb://localhost/okplutodb';
var mongoose = require('mongoose');
mongoose.connect(dbkeys);

var db = mongoose.connection;

db.on('error', function(err) {
	console.log('Rut roh: ', err);
});

db.once('open', function() {
	console.log('Bark bark! Db is working!');
});

module.exports = db;