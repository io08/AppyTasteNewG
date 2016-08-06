var exphbs = require('express-handlebars');
module.exports = exphbs({
    defaultLayout: 'index', 
    extname: '.hbs',
    layoutsDir : './views/layouts/',
    partialsDir:  ['./views/partials/'] ,
    helpers: require('../public/js/hbsFunctions.js').helpers
});