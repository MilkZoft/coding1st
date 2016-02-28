'use strict';

var availableLanguages = $config().languages.list.join('|');
var defaultApp = $config().app.default;

module.exports = (app) => {
    // Loading controllers
    var defaultController = require('./app/' + defaultApp + '/' + defaultApp + '.controller');
    var blogController = require('./app/blog/blog.controller');
    var dashboardController = require('./app/dashboard/dashboard.controller');
    var authController = require('./app/auth/auth.controller');
    var usersController = require('./app/users/users.controller');
    var vendoController = require('./app/vendomatic/vendomatic.controller');

    // Loading necessary helpers
    var i18n = require('./lib/helpers/i18n');
    var utils = require('./lib/helpers/utils');

    // Vendomatic
    app.use('/vendomatic', vendoController);

    // Loading isMobile, basePath, currentLanguage and __
    app.use((req, res, next) => {
        res.locals.isConnected = true;
        res.locals.isMobile = utils.isMobile(req.headers['user-agent']);
        res.locals.config.basePath = $config().baseUrl + i18n.getLanguagePath(req.url);
        res.locals.currentLanguage = i18n.getCurrentLanguage(req.url);
        res.__ = res.locals.__ = i18n.load(i18n.getCurrentLanguage(req.url));
        res.locals.basePath = res.locals.config.basePath;
        res.locals.securityToken = res.session('securityToken');

        next();
    });

    // default css and js
    app.use((req, res, next) => {
        res.locals.css = [
            '/css/style.css'
        ];

        res.locals.topJs = [
            '/js/vendors/ckeditor/ckeditor.js'
        ];

        res.locals.bottomJs = [
            '/js/vendors/jqEssentials/jqEssentials.js',
            '/js/dashboard/main.js'
        ];

        next();
    });

    // Controllers dispatch
    app.use('/', defaultController);
    app.use('/:language(' + availableLanguages + ')', defaultController);
    app.use('/:language(' + availableLanguages + ')/blog', blogController);
    app.use('/:language(' + availableLanguages + ')/dashboard', dashboardController);
    app.use('/auth', authController);
    app.use('/blog', blogController);
    app.use('/dashboard', dashboardController);
    app.use('/users', usersController);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
