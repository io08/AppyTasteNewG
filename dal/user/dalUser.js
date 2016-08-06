var collections = {
	User : 'User'
}


var insert = function (data, callback) {
	var db = global.conn();
	var collection = db.collection(collections.User);
	collection.insert(data, function (e, result) {
        if (e) throw new Error(e);
        else {
            if (result.ops[0])
                result.ops[0].isNew = true;
            callback(result.ops[0])
        };
	});
};
var update = function (query,data, callback) {
    var db = global.conn();
    var collection = db.collection(collections.User);
    collection.update(query,data, {  }, function (e, result) {
        if (e) throw new Error(e);
        else {
            callback(result.result);
        };
    });
};

var find = function (data, callback) {
	var db = global.conn();
	var collection = db.collection(collections.User);
	collection.findOne(data, function (e, result) {
		if (e) throw new Error(e);
		else callback(result);
	});
};
var findOrInsert = function (data, cb) {
	find(data, function (userInfo) {
		if (userInfo == null) insert(data, cb);
		else cb(userInfo);
	});
} 
module.exports = function () {
	return {
		find: find,
		findOrInsert: findOrInsert,
        insert : insert,
        update : update
	};
};