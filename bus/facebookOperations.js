var logger = require('../util/logger.js'),
    response = require('../entity/general/response'),
    request = require('request'),
    qs = require('querystring');
function postMessage(access_token, message, cb) {
    var url = 'https://graph.facebook.com/me/feed';
    var params = {
        access_token: access_token,
        message: message,
        /*link: 'www.google.com',
        picture: 'http://cdni.wired.co.uk/1920x1280/g_j/GOOGLELOGO_1.jpg',
        name: 'Google',
        caption: 'Google',
        description: 'Google description',*/
        privacy: {
            value: 'ALL_FRIENDS'
        }
    };
    request.post({ url: url, qs: params }, function (err, resp, body) {
        body = JSON.parse(body);
        if (body.id) {
            logger.debug('FBPOST' , { message : message, id : body.id });
            cb(new response(true, '', { id: body.id }));
        }
        else
            cb(new response(false, body.error));
    });
}

function sendNotification(access_token, userId, message, cb) {
    var url = String.format('https://graph.facebook.com/{0}/notifications', userId);
    var params = {
        href: 'users/login',
        access_token: global.cfg.facebook.appAccessToken,//access_token,
        template: message
    };
    request.post({ url: url, qs: params }, function (err, resp, body) {
        body = JSON.parse(body);
        if (body.id)
            cb(new response(true, '', { id: body.id }));
        else
            cb(new response(false, body.error));
    });
}
function extendAccessToken(access_token, cb) {
    var url = 'https://graph.facebook.com/oauth/access_token';
    var params = {
        grant_type : "fb_exchange_token",
        client_id: global.cfg.facebook.apiKey,
        client_secret : global.cfg.facebook.apiSecret,
        fb_exchange_token: access_token
    }; 
    request.post({ url: url, qs: params }, function (err, resp, body) {
        body = qs.parse(body);
        if (body.access_token)
            cb(new response(true, '', { access_token: body.access_token, expires : body.expires }));
        else
            cb(new response(false, body.error));
    });
}
function getUserInfo(access_token, cb) {
     
    var url = 'https://graph.facebook.com/me';
    var params = {
        access_token: access_token,
        fields : "email,first_name,last_name,birthday,location"
    };
    request.post({ url: url, qs: params }, function (err, resp, body) {
        //TODO empty data;
        body = JSON.parse(body);
        if (body.success)
            cb(new response(true, '', { }));
        else
            cb(new response(false, body.error));
    });
}

exports.postMessage = postMessage;
exports.sendNotification = sendNotification;
exports.extendAccessToken = extendAccessToken;
exports.getUserInfo = getUserInfo;