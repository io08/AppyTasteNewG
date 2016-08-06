var router = require('express').Router();
var HomePage = function (req, res) {
    res.send({ "Result" : true });
};
var LogoutFunction = function (req, res) {
    req.session.userId = '';
    res.send({ "Result" : true });
};
router.post('/', HomePage);
router.post('/logout', LogoutFunction);
module.exports = router;