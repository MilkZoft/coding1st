'use strict';

// Dependencies
var app;
var bodyParser;
var cookieParser;
var exphbs;
var express;
var path;
var stylus;

// Helpers
var contentHelper;
var hbsHelper;
var postHelper;
var sessionHelper;
var templatesHelper;
var userHelper;

// Loading dependencies
express = require('express');
app = express();
bodyParser = require('body-parser');
cookieParser = require('cookie-parser');
exphbs = require('express-handlebars');
path = require('path');
stylus = require('stylus');

// Set rootPath
global.$rootPath = (dirPath) => {
    return dirPath ? path.resolve(__dirname) + dirPath : path.resolve(__dirname);
};

// Loading Config
global.$config = require('./lib/config');

// Loading Helpers
contentHelper = require('./lib/helpers/content');
hbsHelper = require('./lib/helpers/handlebars');
postHelper = require('./lib/helpers/post');
sessionHelper = require('./lib/helpers/session');
templatesHelper = require('./lib/helpers/templates');
userHelper = require('./lib/helpers/user');

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// templates
app.use(templatesHelper);

// post
app.use(postHelper);

// content
app.use(contentHelper);

// Cookies / Session / User
app.use(cookieParser());
app.use(sessionHelper);
app.use(userHelper);

// Compile Stylus on the fly
if (!$config().html.css.stylusPrecompile) {
    app.use(
        stylus.middleware({
            src: $rootPath('/stylus'),
            dest: $rootPath('/public/css'),
            compile: (str, path) => {
                return stylus(str)
                    .set('filename', path)
                    .set('compress', $config().html.css.compress);
            }
        })
    );
}

// Handlebars setup
app.engine($config().views.engine, exphbs({
    extname: $config().views.extension,
    defaultLayout: $config().views.layout,
    layoutsDir: $rootPath('/views/layouts'),
    partialsDir: $rootPath('/views/partials'),
    helpers: hbsHelper
}));

// View engine setup
app.set('views', path.join($rootPath(), 'views'));
app.set('view engine', $config().views.engine);
app.use(express.static(path.join($rootPath(), 'public')));

// Sending config to templates
app.use((req, res, next) => {
    res.locals.config = $config();
    next();
});

// Disabling x-powered-by
app.disable('x-powered-by');

// dispatch router
require($rootPath('/router'))(app);

// Export application or start the server
if (!module.parent) {
    app.listen($config().serverPort);
}

module.exports = app;
