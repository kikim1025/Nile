

const decodeJWT = function(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get('JWTKey'), function(err, decoded) { 
            if (err) {
                res.json({ status: 401, message: 'Token expired or invalid' });
            } else {
                User.find({_id: decoded.id})
                .then(function(data) {
                    if (data.length > 0) {
                        req.body.sender = decoded.id;
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