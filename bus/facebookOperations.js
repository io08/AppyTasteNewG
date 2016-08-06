var logger = require('../util/logger.js'),
    response = require('../entity/general/response'),
    request = require('request');

// http://code.runnable.com/UTlPM1-f2W1TAABY/post-on-facebook
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
            cb(new response(false, body.error.error_user_title ? body.error.error_user_title : body.error.message));
    });
}

// http://code.runnable.com/UTlPM1-f2W1TAABY/post-on-facebook
function sendNotification(access_token, userId, message, cb) {
    logger.debug('Send notification');
    // Specify the URL and query string parameters needed for the request
    var url = 'https://graph.facebook.com/' + userId + '/notifications';
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
            cb(new response(false, body.error.error_user_title ? body.error.error_user_title : body.error.message));
    });
}

exports.postMessage = postMessage;
exports.sendNotification = sendNotification;