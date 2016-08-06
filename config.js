var path = require('path');

var ENV = process.env.NODE_ENV || 'DEV';
var Log = null;
var MongoDB = null;
var MongoDBLog = null;
var MongoDBHistory = null;
var loggly = null;
var JSONToken = null;
var redis = null;
var datadiff = null;

var fbcall = null;
var twittercall = null;
var linkedincall = null;
var foursquarecall = null;
var instagramcall = null;
var googlepluscall = null;
var vkcall = null;

var rootPath = __dirname;

// production environment
if (ENV == 'PROD') {
    MongoDB = {
        connectionString: "mongodb://appy:appy99@ds011288.mongolab.com:11288/appy"
    };
    
    MongoDBLog = {
        connectionString: "mongodb://appy:appy99@ds011308.mongolab.com:11308/appy_log"
    };
    
    MongoDBHistory = {
        connectionString: "mongodb://appy:appy99@ds013898.mongolab.com:13898/appy_history"
    };
    
    Log = {
        file: "./logs/all-logs.log",
    };
    
    loggly = {
        token: "3a7c8ea5-1b6a-4759-8b9f-cbe2a8423a86",
        subdomain: "appy",
        tags: ["Appy"],
        json: true
    };
    
    JSONToken = {
        secret: 's2crazu34Zd3ku44',
        expires: 10 * 60 * 6
    };
    
    redis = {
        host: 'ec2-54-83-207-91.compute-1.amazonaws.com',
        port: '7089',
        password: 'pcnj8oj3um615b3j1mifv0a8rfa'
    };
    
    datadiff = {
        key: 'c4fyad2sxscerk9qmyp7wb9vzp5vcxr', 
        secret: 'tix3imk8s2vmfgvipjl43xg4rbb7qfr'
    };
    
    fbcall = 'https://appyws.herokuapp.com/auth/facebook/callback';
    twittercall = 'https://appyws.herokuapp.com/auth/twitter/callback';
    linkedincall = 'https://appyws.herokuapp.com/auth/linkedin/callback';
    foursquarecall = 'https://appyws.herokuapp.com/auth/foursquare/callback';
    instagramcall = 'https://appyws.herokuapp.com/auth/instagram/callback';
    googlepluscall = 'https://appyws.herokuapp.com/auth/google/callback';
    vkcall = 'https://appyws.herokuapp.com/auth/vk/callback';
}

// development environment
if (ENV == 'DEV') {
    MongoDB = {
        connectionString: "mongodb://appy:appy99@ds011288.mongolab.com:11288/appy"
    };
    
    MongoDBLog = {
        connectionString: "mongodb://appy:appy99@ds011308.mongolab.com:11308/appy_log"
    };
    
    MongoDBHistory = {
        connectionString: "mongodb://appy:appy99@ds013898.mongolab.com:13898/appy_history"
    };
    
    Log = {
        file: "./logs/all-logs.log",
    };
    
    loggly = {
        token: "3a7c8ea5-1b6a-4759-8b9f-cbe2a8423a86",
        subdomain: "appy",
        tags: ["Appy"],
        json: true
    };
    
    JSONToken = {
        secret: 's3cretK33zdfwe33',
        expires: 10 * 60 * 6
    };
    
    redis = {
        host: 'ec2-54-83-207-91.compute-1.amazonaws.com',
        port: '7089',
        password: 'pcnj8oj3um615b3j1mifv0a8rfa'
    };
    
    datadiff = {
        key: 'c4fyad2sxscerk9qmyp7wb9vzp5vcxr', 
        secret: 'tix3imk8s2vmfgvipjl43xg4rbb7qfr'
    };
    
    fbcall = 'http://localhost:3000/auth/facebook/callback';
    twittercall = 'http://127.0.0.1:3000/auth/twitter/callback';
    linkedincall = 'http://localhost:3000/auth/linkedin/callback';
    foursquarecall = 'http://localhost:3000/auth/foursquare/callback';
    instagramcall = 'http://localhost:3000/auth/instagram/callback';
    googlepluscall = 'http://localhost:3000/auth/google/callback';
    vkcall = 'http://localhost:3000/auth/vk/callback';
}

var facebook = {
    appAccessToken: '1526838307617018|4c96buF2n5y0v3jjVhdl8lUsyMs',
    apiKey: '1526838307617018',
    apiSecret: '6e7115c22cb22d89d7b208ba1b5045a6',
    callback: fbcall,
    // All the fields
    // https://developers.facebook.com/docs/graph-api/reference/v2.5/user
    profileFields: ['id', 'birthday', 'email', 'first_name', 'gender', 'last_name', 'friends', 'languages'],
    scope: ['email', 'user_friends', 'publish_actions']
}

var linkedin = {
    apiKey: '755qgme9oyarzu',
    apiSecret: '4NH0WMakwmfngFAd',
    callback: linkedincall,
    scope: ['r_emailaddress', 'w_share']
}

var twitter = {
    apiKey: 'IuTxnLFvhul7eP7kVI0nmo4K0',
    apiSecret: 'eHh1TrfI1lza5qr8W4QQU6JIA7vBu7FtJgoEk1hcmFvffeOkiS',
    callback: twittercall
}

var foursquare = {
    'secrets' : {
        'clientId' : 'AIVNATEDJSU21PUF3YY523GPV3XCQM05OH3IWQRBY24NPMTC',
        'clientSecret' : 'Q2DQQHRKI2VVPG2NJTQEKNSENGBAT05YRCOT4N0KIW2LFDT5',
        'redirectUrl' : foursquarecall
    }
}

var instagram = {
    clientId : '95a30de28f5b41f5ada7d76e799894f1',
    clientSecret : '613091c2f99d47fa8db541ea11a7fe60',
    callback : instagramcall
}

var googleplus = {
    clientId : '960605552586-c3ejn9bloog6nv003cotli7b3qhkdobg.apps.googleusercontent.com',
    clientSecret : '8vk6j3e0tmgkVb0Ij-qITp6r',
    callback : googlepluscall,
    scope: ['profile', 'email']
}

var vk = {
    clientId : '5335535',
    clientSecret : 'wY0YMU5yQUFmDVQNoCib',
    callback : vkcall,
    //http://vk.com/dev/fields
    profileFields: ['screen_name', 'domain', 'photo_200_orig', 'sex', 'middle_name', 'city', 'bdate', 'photo_100', 'education', 'counters'],
    scope: ['friends', 'email']
}

var locu = {
    apiKey : 'f5a0902036696fdbc49875dc4440d41114cfbd47',
    widgetKey : 'a1f89be959bc4f8c683d3a687f4d2640fe7af675'
}

var mailgun = {
    apiKey: 'key-20700b4cadc80c0ad3116f0f794ff620', 
    domain: 'sandboxad4d16cd62bd4df9a26e2b4ee96feacc.mailgun.org'
}

var twilio = {
    from: '+18777486249',
    accountSid: 'AC5c5549958f561cfd17c7f2dc007a7130',
    authToken: 'da7f30e9b414c8a3f1234c9425978013'
}

var mail = {
    from: 'info@appy.com'
}

var googlegcm = {
    serverAPIKey: 'AIzaSyBLRnQib6RUGvfUGjVv3A8eO6Uik30BNTs',
    senderID: '960605552586'
}

// Server API Key help
// AIzaSyBLRnQib6RUGvfUGjVv3A8eO6Uik30BNTs
// Sender ID help
// 960605552586
// https://developers.google.com/cloud-messaging/android/client?configured=true
// https://developers.google.com/instance-id/
//http://androidexample.com/Android_Push_Notifications_using_Google_Cloud_Messaging_GCM/index.php?view=article_discription&aid=119&aaid=139

exports.ENV = ENV;
exports.Log = Log;
exports.MongoDB = MongoDB;
exports.MongoDBLog = MongoDBLog;
exports.MongoDBHistory = MongoDBHistory;
exports.facebook = facebook;
exports.linkedin = linkedin;
exports.twitter = twitter;
exports.instagram = instagram;
exports.foursquare = foursquare;
exports.googleplus = googleplus;
exports.vk = vk;
exports.locu = locu;
exports.googlegcm = googlegcm;

exports.loggly = loggly;
exports.JSONToken = JSONToken;
exports.mailgun = mailgun;
exports.twilio = twilio;
exports.redis = redis;
exports.datadiff = datadiff;

exports.mail = mail;
exports.rootPath = rootPath;  