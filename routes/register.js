var router = require('express').Router(), 
    JToken = require('../util/jwt.js'),
    busRegister = require('../bus/registration'),
    jt = JToken();
var registerFunction = function (req, res) {
    busRegister.RegisterByPhoneNumber({ appId : req.body.appId , gsmNo : req.body.gsmNo, sessionId : req.session.id }, function (result) {
        if (result.status) {
            req.session.userId = '12312';
            req.session.token = result.data.token;
        }
        res.json(result);
    });
};
var validateUserGsmNo = function (req, res) {
    busRegister.ValidateUserGsmNo({ _id : req.body._id, gsmValidationCode : req.body.gsmValidationCode }
        , function (result) { res.json(result); });
};

router.post('/validateUserGsmNo', validateUserGsmNo)
router.post('/register', registerFunction);
module.exports = router;