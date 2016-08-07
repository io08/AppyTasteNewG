module.exports = [
    { route : '/admin/' , method : require('./admin.js') },
    { route : '/api/' , method : require('./register.js') },
    { route : '/api/' , method : require('./login.js') } ,
    { route : '/api/auth/' , method : require('./auth/authIndex.js') } 
];