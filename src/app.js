'use strict';

// Dependencies
var express;
var path;
var app;
var bodyParser;
var cookieParser;
var exphbs;
var stylus;

// Helpers
var post;
var content;
var session;
var user;
var hbsHelpers;

// Loading dependencies
express = require('express');
app = express();
path = require('path');
bodyParser = require('body-parser');
cookieParser = require('cookie-parser');
exphbs = require('express-handlebars');
stylus = require('stylus');

// Set rootPath
global.$rootPath = (dirPath) => {
    return dirPath ? path.resolve(__dirname) + dirPath : path.resolve(__dirname);
};

// Loading Config
global.$config = require('./lib/config');

// Loading Helpers
post = require('./lib/helpers/post');
content = require('./lib/helpers/content');
session = require('./lib/helpers/session');
user = require('./lib/helpers/user');
hbsHelpers = require('./lib/helpers/handlebars');

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// post
app.use(post);

// content
app.use(content);

// Cookies / Session / User
app.use(cookieParser());
app.use(session);
app.use(user);

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
    helpers: hbsHelpers
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
