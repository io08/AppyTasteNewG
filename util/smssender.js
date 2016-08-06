var logger = require('./logger.js')
  , smsclient = require('twilio')(global.cfg.twilio.accountSid, global.cfg.twilio.authToken);
 
sendSMSMessage = function (to, body, cb){
    cb(null, 'success');
  //logger.debug(to);
  //smsclient.messages.create({
  //  from: cfg.twilio.from,
  //  body: body,
  //  to: to
  //}, function(err, message) {
  //  if (err){ 
  //    logger.error(err);
  //    return cb(err, null);
  //  }
  //  return cb(null, message);
  //});
};

exports.sendSMSMessage = sendSMSMessage;

