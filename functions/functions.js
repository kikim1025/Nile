const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    // Create JWT token and send back to user
    signJWT: function(id, username, app, res) {
        const token = jwt.sign({ id: id }, app.get('JWTKey'), { expiresIn: '3min' });
        res.json({ status: 200, data: { id: id, username: username, token: token }, message: 'User logged in succesfully' });
    },

    // Middleware function to decode and authenticate JWT tokens
    // After decoding JWT token, look through User model to find matching decoded.id
    // Then the decoded.id will be included in the request body, to be passed to next() 
    decodeJWT: function(req, res, next) {
        const token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, app.get('JWTKey'), function(err, decoded) { 
                if (err) {
                    res.json({ status: 401, message: 'Token expired or invalid' });
                } else {
                    User.find({_id: decoded.id})
                    .then(function(data) {
                        if (data.length > 0) {
                            req.body.decoded = decoded.id;////
                            next();
                        } else {
                            res.json({ status: 403, message: 'Id not present in database, old JWT conflict with testing codes. Deployed version will never see this' });
                        };
                    })
                    .catch(function(err) {
                        res.json({ status: 500, message: err });
                    });
                };
            });
        } else {
            res.json({ status: 401, message: 'Token not provided' });
        };
    }
};