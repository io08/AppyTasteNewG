var MongoClient = require('mongodb').MongoClient;


var mongoDB = function (cb) {
    
    MongoClient.connect(global.cfg.MongoDB.connectionString, {
        db: {
            raw: true
        },
        server: {
            poolSize: 10
        }
    }, function (err, db) {
        cb(err, db);
    });
	 
}
module.exports = function () {
    return {
        Conn : mongoDB
    };
};

