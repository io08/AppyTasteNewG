var router = require('express').Router();
var busRegister = require('../../bus/registration');
var facebookAuthentication = function (req, res) {
    console.log('4_facebookAuthentication', req);
    busRegister.RegisterFacebookUser({ status : req.status , authResponse: req.authResponse }, 
    function (result) {
        res.json(result);
    });
};
router.post('/facebook', facebookAuthentication);
module.exports = router;