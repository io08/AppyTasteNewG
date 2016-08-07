var response = require('../entity/general/response'),
    dalUser = require('../dal/user/dalUser')(),
    jt = require('../util/jwt.js')(),
    smsSender = require('../util/smssender'), 
    util = require('../util/util'),
    logger = require('../util/logger.js'),
    fb = require('./facebookOperations.js');

var RegisterByPhoneNumber = function (data, cb) {
    if (data.appId && !util.isValidAppKey(data.appId)) {
        cb(new response(false, "Application id is not valid"));
    } else {
        var token = jt.jwt.sign(data.sessionId, global.cfg.JSONToken.secret);
        dalUser.findOrInsert({ gsmNo : data.gsmNo }, function (userInfo) {
            var gsmValidationCode = util.randomNumber(100000, 999999);
            dalUser.update({ _id : userInfo._id }, { $set : { "gsmValidationCode": gsmValidationCode, "gsmIsValidated" : false , "gsmMaxValidationDate" : util.addMinutes(new Date(), 3) } }, function (updateResult) {
                var registrationMessage = 'Please register with the code below : ' + gsmValidationCode;
                logger.debug('User with GSM %s registration code : %s', data.gsmNo, gsmValidationCode);
                smsSender.sendSMSMessage(userInfo.gsmNo, registrationMessage, function (res) {
                    cb(new response(true, '', { token : token  , sessionId : data.sessionId, user  : userInfo }));
                });
            });
            
        });
    }
};

var ValidateUserGsmNo = function (data, cb) {
    dalUser.find({ _id : toObjectId(data._id) }, function (userInfo) {
        if (data.gsmValidationCode != userInfo.gsmValidationCode && userInfo.gsmMaxValidationDate > new Date()) {
            cb(new response(false, "Please input valid validation code"));
        } else {
            dalUser.update({ _id : toObjectId(data._id) }, { $set : { gsmValidationDate: new Date(), gsmIsValidated : true } }, function (updateResult) {
                logger.debug('User GSM registration succeed %s ', data._id);
                cb(new response(true, '', {}));
            });
        }
        
            
    });
};
var RegisterFacebookUser = function (data, cb) { 
    if (!(data.status && data.status == "connected")) {
        cb(new response(false, "Not connectod to SF"));
    } else { 
        logger.debug('FaceBookAuthCallBack', '', data);
        dalUser.findOrInsert({ fbUserId : data.authResponse.userID }, function (userInfo) {
            var isNewUser = userInfo.isNew;
            if (isNewUser) {
                //TODO generate long living facebook token in both cases...
                dalUser.update({ _id : userInfo._id }, { $set : { "accessToken": data.authResponse.accessToken, "signedRequest" : data.authResponse.signedRequest } }, function (updateResult) {
                    logger.debug('FacebookUser Registered', '', data.authResponse);
                    cb(new response(true, '', { token : token  , sessionId : data.sessionId, user  : userInfo }));
                });
            } else {
                dalUser.update({ _id : userInfo._id }, { $set : { "accessToken": data.authResponse.accessToken, "signedRequest" : data.authResponse.signedRequest } }, function (updateResult) {
                    logger.debug('FacebookUser Registered', '', data.authResponse);
                    cb(new response(true, '', { token : token  , sessionId : data.sessionId, user  : userInfo }));
                });
            }
            
        });
    };
};

exports.RegisterByPhoneNumber = RegisterByPhoneNumber;
exports.ValidateUserGsmNo = ValidateUserGsmNo;
exports.RegisterFacebookUser = RegisterFacebookUser;