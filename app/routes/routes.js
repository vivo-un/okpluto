"use strict";

var User = require('../models/users');
var request = require('request')
var authPath = require('../../config/auth0')
var api = require('../../config/api.js');
var Promise = require('bluebird');
const googleMaps = require('@google/maps').createClient({
	key: api.API_KEY
});

module.exports = function(app) {

	//======Location End Points=======//
	app.get('/api/geocode', (req, res) => {
    var getCoordinates = function(address) {
    	return new Promise(function(resolve, reject) {
    		googleMaps.geocode({ address: address }, function(err, res) {
    			if (err) reject(err);
    			resolve(res.json.results[0].geometry.location);
    		});
    	});
    };

    getCoordinates(req.query.loc)
      .then(function(results) {
      	res.status(200).send(results);
      });
	});

	//======User End Points=======//

	app.get('/query/dbId', (req, res) => {
		User.findById(req.query.dbId)
		.exec((err, user) => {
			if (err) console.log(err);
			res.status(201).send(user)
		});
	});

	app.get('/api/users', (req, res) => {
		User.find()
		.exec((err, users) => {
			if (err) {
				console.log(err);
				res.status(404).send("Database error, no users found")
			}
			//console.log(users)
			res.status(201).send({users: users});
		});
	});

	app.post('/signin', (req, res) => {
		//Auth0 user ID
		var id = req.body.id;
		//POST path to retrieve user info from Auth0
		var url = 'https://' + authPath.auth0.AUTH0_DOMAIN + '/tokeninfo';
		request.post(url, { json: {id_token: id} } , (err, response) => {
			if (err) console.log(err)
			//Look for user in mongoDB
			User.findOne({
				'id': response.body.user_id
			}).exec((err, user) => {
				//Add user if they don't exist
				if (!user) {
					//get user info supplied through login / signup from FB, Google and Auth0
					var userData = response.body;
					//For signups through Auth0 collect metadata
					if (userData.user_metadata) {
						for (var key in userData.user_metadata) {
							userData[key] = userData.user_metadata[key];
						}
					}
					if (userData.picture_large) {
						userData.picture = userData.picture_large;
					}
					//Create user in mongoDB
					new User ({
						id: userData.user_id,
						firstname: userData.given_name,
						lastname: userData.family_name,
						profilepic: userData.picture,
						username: 'anonymous' + Math.floor(Math.random()*100000000)
					}).save((err, user) => {
						if (err) console.log(err)
						res.status(200).send({user: user, creation: true})
					})
				} else {
					user.creation = false;
					res.status(200).send({user: user, creation: false})
				}
			})
		})
	});

	app.put('/api/users', (req, res) => {
		User.findById(req.body.dbId, (err, user) => {
			for (var key in req.body) {
				if (key !== 'dbId') {
					user[key] = req.body[key];
				}
			}
			user.save((err, updatedUser) => {
				res.status(200).send(updatedUser)
			})
		})
	});

	app.delete('/api/users', (req, res) => {
		User.findByIdAndRemove(req.body.dbId)
		.exec((user) => {
			res.status(200).send(userRemoved)
		})
	});

	//======Event End Points=======//

};