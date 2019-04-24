import User from '../models/User';
import Merchandise from '../models/Merchandise';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default function(app) {

// API routes for User ----------

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
    // Uses the authJWT middleware function
    app.get('/api/login', function(req, res) {

    });

    // Create a User
    // need to add JWT login after
    app.post('/api/user', function (req, res) {
        User.create(req.body)
        .then(function (data) {
            res.json({ status: 200, data: data.username, message: 'User created successfully' });
        })
        .catch(function (err) {
            if (err.name === 'MongoError') { //  errors resulting from schema specification are handled here
                res.json({ status: 403, message: err });
            } else {
                res.json({ status: 500, message: err });
            }
        });
    });

    

    // Deleting function maybe.
    // need to think about removing all merchandise by user as well on deleting User


// API routes for Merchandise ----------
    

};