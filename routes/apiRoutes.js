import bcrypt from 'bcryptjs';
import User from '../models/User';
import Merchandise from '../models/Merchandise';
import { signJWT, decodeJWT } from './functions/functions'

export default function(app) {

//---------- API routes for User ------------------------------

    // Get Users' username data
    app.get('/api/users', function(req, res) {
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
                bcrypt.compare(req.body.password, data.password)
                .then(function(decrypted) {
                    if (!decrypted) {
                        res.json({ status: 401, message: 'Wrong password' });
                    } else {
                        // make makeJWT middleware?
                        const token = jwt.sign({ id: data.id }, app.get('JWTKey'), { expiresIn: '1hr' });
                        res.json({ status: 200, data: { id: data.id, username: data.username, token: token }, message: 'User logged in succesfully' });                   
                    }
                });
            }
        })
        .catch(function(err) {
            res.json({ status: 500, message: err });
        });
    });

    // Create a User
    app.post('/api/user', function (req, res) {
        User.create(req.body)
        .then(function (data) {
            res.json({ status: 200, data: data.username, message: 'User created successfully' });
        })
        .catch(function (err) {
            if (err.name === 'MongoError') { 
                // errors resulting from schema specification are handled here
                // only really trigger if someone uses API to create user, as client code enforces specific input
                res.json({ status: 403, message: 'Please use the website to create user...' });
            } else { 
                res.json({ status: 500, message: err });
            }
        });
    });

    

    // Deleting function maybe.
    // need to think about removing all merchandise by user as well on deleting User


//---------- API routes for Merchandise ------------------------------
    

};