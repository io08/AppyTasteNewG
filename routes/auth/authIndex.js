var router = require('express').Router(),
    busRegister = require('../../bus/registration'),
    logger = require('../../util/logger.js');
var facebookAuthentication = function (req, res) { 
    logger.debug('facebookAuthentication', '', { data: req.body });
    busRegister.RegisterFacebookUser({ status : req.body.status , authResponse: req.body.authResponse }, 
    function (result) {
        if (result.status) {
            req.session.userId = result.data.user._id;
            req.session.token = result.data.token;
        }
        res.json(result);
    });
};
var ReloginUser = function (req, res) {
    logger.debug('App Launch User Login', '', { data: req.body });
    busRegister.ReloginUser({ appId : req.body.appId, userId : req.body.userId , sessionId : req.session.id }
        , function (result) { res.json(result); });
};
router.post('/reloginUser', ReloginUser);
router.post('/facebook', facebookAuthentication);
module.exports = router;