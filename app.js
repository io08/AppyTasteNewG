var express = require('express'),
    app = express(),
    port = process.env.port || 1337,
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    $ = require('jquery-deferred'),
    helmet = require('helmet'),
    JToken = require('./util/jwt.js'),
    cfg = require('./config.js'),
    jt = JToken(),
    logger = require('./util/logger.js'),
    util = require('./util/util.js'),
    ObjectID = require('mongodb').ObjectID;
 
global.cfg = cfg;
var dbDeff = new $.Deferred();
dbDeff.promise();
//app.use(helmet());

app.use(express.static('./public'));
app.all('/*', function (req, res, next) {
    logger.log('request Log ==> %s', req.url);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: 'kyKs3s!n' }));
var str = require('./util/stringHelper.js')();

var hbs = require('./util/handlebarsEngine');
app.engine('.hbs', hbs);
app.set('view engine', '.hbs');

process.on('uncaughtException', function (err) {
    logger.error(err.stack);
});

/*--------------------Get DB-------------*/
var connect = require('./dal/db/dalConnection.js')();
var db = connect.Conn(function (err, database) {
    if (err) throw err;
    db = database;
    logger.debug('DB Ready');
    global.appConfigKeys = require('./entity/enum/appConfigKeys.js');
    global.appIDS = [];
    util.readAppConfig(appConfigKeys.applicationIDS, function (data) { 
        global.appIDS = data.value;
    });
    dbDeff.resolve();
});
global.conn = function () {
    return db;
};

/*--------------------Get DB-------------*/
app.all('/api/*', jt.TokenRequired(), function (req, res, next) {
    next();
});
var routes = require('./routes/allRoutes.js');
for (var i = 0; i < routes.length; i++)
    app.use(routes[i].route, routes[i].method);


app.use(function (req, res, next) {
    if (req.session.loggedIn) {
        console.log('req.session.id ==>' + req.session.id + ' url==> ' + req.url);
    } else {
        console.log('url==> ' + req.url);
    }
    res.status(404);
    if (req.accepts('json')) {
        res.send({ "Result" : false , "Message" : "Unauthorized" });
        return;
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
});
var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
global.getIdFromBLOB = function (id) {
    if (typeof id === 'object') {
        var objectId = new ObjectID(id.id);
        return objectId.toHexString();
    }
    else
        return id;
};
global.toObjectId = function (id) {
    return ObjectID(id);
};