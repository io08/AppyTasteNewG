var response = require('../entity/general/response'),
    dalUser = require('../dal/user/dalUser')(),
    jt = require('../util/jwt.js')(),
    smsSender = require('../util/smssender'), 
    util = require('../util/util'),
    logger = require('../util/logger.js'),    
    request = require('request'),
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
                    cb(new response(true, '', { token : token  , sessionId : data.sessionId, user  : { _id : userInfo._id , gsmValidationCode : gsmValidationCode , gsmMaxValidationDate : util.addMinutes(new Date(), 3) } }));
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
            var isNewUser = userInfo.isNew != undefined && userInfo.isNew;
            fb.extendAccessToken(data.authResponse.accessToken, function (res) {
                if (res.status) {
                    var longToken = res.data.access_token;
                    if (isNewUser) { 
                        fb.getUserInfo(longToken, function (resDetail) {
                            if (!resDetail.status) {
                                cb(new response(false, "Kullanıcı detay datasına ulaşılamadı"));
                            } else {
                                var userDetail = resDetail.data;
                                dalUser.update({ _id : userInfo._id }, { $set : { "accessToken": longToken, "signedRequest" : data.authResponse.signedRequest,email: userDetail.email ,name: userDetail.name,birthday : userDetail.birthday ,location: userDetail.location } }, function (updateResult) {
                                    logger.debug('FacebookUser Registered', '', data.authResponse);
                                    cb(new response(true, '', { token : longToken  , sessionId : data.sessionId, user  : userInfo }));
                                });
                            }
                        });
                    } else {
                        dalUser.update({ _id : userInfo._id }, { $set : { "accessToken": longToken, "signedRequest" : data.authResponse.signedRequest } }, function (updateResult) {
                            logger.debug('FacebookUser Registered', '', data.authResponse);
                            cb(new response(true, '', { token : longToken  , sessionId : data.sessionId, user  : userInfo }));
                        });
                    }
                }
            });
        });
    };
};

exports.RegisterByPhoneNumber = RegisterByPhoneNumber;
exports.ValidateUserGsmNo = ValidateUserGsmNo;
exports.RegisterFacebookUser = RegisterFacebookUser;