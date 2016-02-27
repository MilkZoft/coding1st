'use strict';

// Loading dependencies
var express = require('express');
var path = require('path');

// Initializing express application
var app = express();

// Set rootPath
global.$rootPath = function(dirPath) {
    return dirPath ? path.resolve(__dirname) + dirPath : path.resolve(__dirname);
}

// Loading Config
global.$config = require($rootPath('/lib/config'));

// Body parser
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Logger
var logger = require('morgan');
app.use(logger('dev'));

// post
var post = require($rootPath('/lib/helpers/post'));
app.use(post);

// content
var content = require($rootPath('/lib/helpers/content'));
app.use(content);

// Cookies / Session / User
var cookieParser = require('cookie-parser');
var session = require($rootPath('/lib/helpers/session'));
var user = require($rootPath('/lib/helpers/user'));

app.use(cookieParser());
app.use(session);
app.use(user);

// Layout setup
var exphbs = require('express-handlebars');
var hbsHelpers = require($rootPath('/lib/helpers/handlebars'));

// Stylus setup
var stylus = require('stylus');

// Compile Stylus on the fly
if (!$config().html.css.stylusPrecompile) {
    app.use(
        stylus.middleware({
            src: $rootPath('/stylus'),
            dest: $rootPath('/public/css'),
            compile: function(str, path) {
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
app.use(function(req, res, next) {
    res.locals.config = $config();
    next();
});

// Disabling x-powered-by
app.disable('x-powered-by');

// dispatch router
require($rootPath('/router'))(app);

// Export application or start the server
if (!!module.parent) {
    module.exports = app;
} else {
    app.listen($config().serverPort);
}
