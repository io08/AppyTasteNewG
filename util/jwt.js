var jwt = require('jsonwebtoken'), 
    cfg = require('../config.js'),
    logger = require('./logger.js');

var TokenRequired = function () {
    return function (req, res, next) {
        if (req) {
            if (req.url.indexOf('/api/register') == 0)
                next();
            else
                jwt.verify(req.body.token, cfg.JSONToken.secret, function (err, object) {
                    if (err || !object || !req.session.userId || req.session.userId.length < 1) {
                        logger.debug('%s Unauthorized Request %s', err, object);
                        res.send({ "Result" : false , "Message" : "Unauthorized" });
                    }
                    else {
                        /* Authorization Succeed */
                        logger.debug('%s requested url %s', req.session.userId, req.url);
                        next();
                    }
                });
        }
    }
}

module.exports = function () {
    return {
        TokenRequired: TokenRequired ,
        jwt : jwt
    }
};