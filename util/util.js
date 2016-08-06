var cfg = require('../dal/appConfig/dalAppConfig')();
var randomNumber = function (min, max) {
    return Math.round((Math.random() * (max - min) + min));
}
var addMinutes = function (date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}
var readAppConfig = function (key, cb) {
    cfg.findByName(global.appConfigKeys.applicationIDS, function (data) { 
        cb(data);
    });
}
var isValidAppKey = function (key) {
    for (var i = 0; i < global.appIDS.length ; i++) {
        if (global.appIDS[0] == key) { 
            return true;
        }
    }
    return false;
};
exports.randomNumber = randomNumber;
exports.addMinutes = addMinutes;
exports.readAppConfig = readAppConfig;
exports.isValidAppKey = isValidAppKey;