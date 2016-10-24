"use strict";

var User = require('../models/users');
var request = require('request')
var authPath = require('../../config/auth0')

module.exports = function(app) {

	// signup GET and POST requests for /api/users

	app.get('/api/users', function(req, res) {
		User.find()
		.exec((err, users) => {
			if (err) {
				console.log(err);
				res.status(404).send("Database error, no users found")
			}
			console.log(users)
			res.status(201).send({users: users});
		})
	});

	app.post('/signin', function(req, res) {
		//Auth0 user ID
		var id = req.body.id;
		//POST path to retrieve user info from Auth0
		var url = 'https://' + authPath.auth0.AUTH0_DOMAIN + '/tokeninfo';
		request.post(url, { json: {id_token: id} } , (err, response) => {
			if (err) console.log(err)
				console.log(response)
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
						profilepic: userData.picture
					}).save((err, user) => {
						if (err) console.log(err)
						res.status(200).send(user)
					})
				} else {
					res.status(200).send(user)
				}
			})
		})
	})
};