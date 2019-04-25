const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Merchandise = require('../models/Merchandise');
const functions = require('../functions/functions');

module.exports = function(app) {

//---------- API routes for User ------------------------------

    // Get Users' username data
    app.get('/api/user', function(req, res) {
        User.find({}, 'username')
        .then(function (data) {
            res.json({ status: 200, data: data, message: 'All usernames retrieved successfully' });
        })
        .catch(function (err) {
            res.json({ status: 500, message: err });
        });        
    });

    // Logs-in the user, sending back the JWT token
    // JWT expires after 1hr
    app.get('/api/login', function(req, res) {
        User.findOne({ username: req.body.username })
        .then(function(data) {
            if (!data) {
                res.json({ status: 401, message: 'No such user or bad request format' });
            } else {
                if (req.body.password) {
                    bcrypt.compare(req.body.password, data.password)
                    .then(function(decrypted) {
                        if (!decrypted) {
                            res.json({ status: 401, message: 'Wrong password' });
                        } else {
                            functions.signJWT(data.id, data.username, app, res);
                        };
                    });
                } else {
                    res.json({ status: 401, message: 'Stop using API and use the website to login u hacker' });
                };
            };
        })
        .catch(function(err) {
            res.json({ status: 500, message: err });
        });
    });

    // Create a User
    app.post('/api/user', function (req, res) {
        User.create(req.body)
        .then(function (data) {
            functions.signJWT(data.id, data.username, app, res);
        })
        .catch(function (err) {
            if (err.name === 'MongoError') { 
                // errors resulting from schema specification are handled here
                // only really trigger if someone uses API to create user, as client code enforces specific input
                res.json({ status: 401, message: 'Please use the website to create user...' });
            } else { 
                res.json({ status: 500, message: err });
            };
        });
    });

    

    // Deleting function maybe.
    // need to think about deleting merchandise by user as well on deleting User


//---------- API routes for Merchandise ------------------------------
    // Get Merchandise data
    // maybe put limit for retrieval?
    app.get('/api/merchandise', function(req, res) {
        Merchandise.find()
        .then(function (data) {
            res.json({ status: 200, data: data, message: 'All merchandise retrieved successfully' });
        })
        .catch(function (err) {
            res.json({ status: 500, message: err });
        });        
    });

};