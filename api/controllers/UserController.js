/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var passwords = require('machinepack-passwords');
var Promise = require('bluebird');

var encryptPass = function(pass) {
	return new Promise(function (resolve, reject) {
		passwords.encryptPassword({password: pass}).exec({
			error: function(err) {
				return reject(err);
			},
			success: function (encryptedPass) {
				return resolve(encryptedPass);
			}
		});
	});
};

var checkPass = function(pass, encryptedPass) {
	return new Promise(function (resolve, reject) {
		passwords.checkPassword({
			passwordAttempt: pass,
			encryptedPassword: encryptedPass
		}).exec({
			error: function(err) {
				console.log("Error checking pass");
				console.log(err);
				return reject(err);
			},
			incorrect: function() {
				console.log("Wrong password");
				return reject("Wrong password")
			}, 
			success: function() {
				console.log("Correct password, red leader standing by");
				return resolve(true);
			}
		});
	});
};

var findUserbyEmail = function(email) {
	return new Promise(function (resolve, reject) {
		User.findOne({email: email}).exec(function (error, user) {
			if (error || !user) {
				console.log("Got error or user doesn't exist");
				console.log(error);
				return reject(error);
			} else {
				return resolve(user);
			}
		});
	});
};

module.exports = {
	signUp: function(req, res) {
		console.log("In UserController signup");
		console.log(req.body);
		var promiseEncryptedPass = encryptPass(req.body.pass).then(function (encryptedPass) {
			console.log(encryptedPass);
			User.create({
				email: req.body.email,
				encryptedPass: encryptedPass,
			}).exec(function (err, user) {
				if (err || !user) {
					console.log("Error making a user");
					console.log(err);
					res.negotiate(err);
				} else {
					res.send(user);
				}
			});
		}).catch(function (reason) {
			console.log("Error encrypting password");
			res.negotiate(reason);
		});
	},

	login: function(req, res) {
		console.log("In UserController login")
		console.log(req.body);
		findUserbyEmail(req.body.email).then(function (user) {
			console.log(user);
			checkPass(req.body.pass, user.encryptedPass).then(function (verified) {
				console.log(verified);
			}).catch(function (reason) {
				console.log("Not verified, you must construct additional pylons");
			});
		}).catch(function (reason){
			console.log("Failed to find a user");
			console.log(reason);
		});
	},
};

