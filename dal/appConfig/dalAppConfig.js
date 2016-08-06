var collections = {
	appConfig : 'appConfig'
} 
var insert = function (key, value, desc, callback) {
	var db = global.conn();
	var collection = db.collection(collections.appConfig);
	collection.insert({ key : '' + key + '', value: '' + value + '', desc: '' + desc + '' }, function (e, result) {
		callback(result);
	});
};
var findByName = function (key, callback) {
	var db = global.conn();
	var collection = db.collection(collections.appConfig);
	collection.findOne({ key: '' + key + '' }, function (e, result) {
		callback(result);
	});
};
var findAll = function (callback) {
	var db = global.conn();
	var collection = db.collection(collections.appConfig);
	collection.find({}, function (e, result) {
		callback(result);
	});
};
module.exports = function () {
	return {
		findByName: findByName,
		findAll: findAll,
		insert : insert 
	};
};