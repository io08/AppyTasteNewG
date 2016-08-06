var router = require('express').Router();
var busRegister = require('../../bus/registration');
var facebookAuthentication = function (req, res) {
    console.log('4_facebookAuthentication');
    busRegister.RegisterFacebookUser({ status : req.status , authResponse: req.authResponse }, 
    function (result) {
        res.json(result);
    });
};
router.get('/facebook', facebookAuthentication);
module.exports = router;