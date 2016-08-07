var router = require('express').Router();
var busRegister = require('../../bus/registration');
var facebookAuthentication = function (req, res) {
    console.debug('4_facebookAuthentication', '', { data: req.authResponse });
    busRegister.RegisterFacebookUser({ status : req.status , authResponse: req.authResponse }, 
    function (result) {
        if (result.status) {
            req.session.userId = result.data.user._id;
            req.session.token = result.data.token;
        }
        res.json(result);
    });
};
router.post('/facebook', facebookAuthentication);
module.exports = router;