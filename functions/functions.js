import jwt from 'jsonwebtoken';
import User from '../models/User';

export const signJWT

// Middleware function to decode and authenticate JWT tokens
// After decoding JWT token, look through User model to find matching decoded.id
// Then the decoded.id will be included in the request body, to be passed to next() 
export const decodeJWT = function(req, res, next) {
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
                    }
                })
                .catch(function(err) {
                    res.json({ status: 500, message: err });
                });
            }
        });
    } else {
        res.json({ status: 401, message: 'Token not provided' });
    }
}


// export more middlewares here if needed