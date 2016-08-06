var router = require('express').Router(), fb = require('../bus/facebookOperations');
var HomePage = function (req, res) {
    res.render('index', { "welcomeText" : 'Welcome ' + new Date().toLocaleTimeString() });
};
var PostFacebookMessage = function (req, res) {
    fb.postMessage(req.params.token, req.params.message, function (result) { res.json(result); });
};
router.get('/', HomePage);
router.get('/facebook/post/:message/:token', PostFacebookMessage);
module.exports = router;