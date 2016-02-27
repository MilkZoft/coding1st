'use strict';

var express = require('express');
var router = express.Router();
var usersModel = require('./users.model');
var utils = require($rootPath('/lib/helpers/utils'));

/**
 * Validates that the user is connected
 */
router.get('/validation', function(req, res, next) {
    if (utils.isDefined(res.session('user')) && utils.isDefined(res.session('oauth'))) {
        var connectedUser = res.session('user');

        usersModel.getUser({
            network: connectedUser.network,
            networkId: connectedUser.networkId,
            username: connectedUser.username,
            password: false
        }, function(userInfo) {
            if (userInfo) {
                res.redirect('/');
            } else {
                res.redirect('/users/register');
            }
        });
    } else {
        res.redirect('/');
    }
});

/**
 * Logout: destroy sessions.
 */
router.get('/logout', function(req, res, next) {
    res.destroySessions();

    res.redirect('/');
});

/**
 * Renders login view
 */
router.get('/login', function(req, res, next) {
    res.render('users/login');
});

/**
 * Renders register view
 */
router.get('/register', function(req, res, next) {
    if (utils.isDefined(res.session('user')) && utils.isDefined(res.session('oauth'))) {
        var connectedUser = res.session('user');

        res.clearSession(['user', 'oauth']);

        res.render('users/register', {
            user: connectedUser
        });
    } else {
        res.render('users/register', {
            user: false
        });
    }
});

/// GET Actions ///

/**
 * Register a new user
 */
router.post('/registration', function(req, res, next) {
    var post = res.getAllPost();

    usersModel.save(post, function(status) {
        if (utils.isUndefined(status)) {
            res.redirect('/');
        } else {
            var message = res.content('users.register.success');
            var alertType = 'success';
            var iconType = 'fa-check';

            if (utils.isDefined(status[0][0].error)) {
                message = res.__.db.errors[status[0][0].error];
                alertType = 'danger';
                iconType = 'fa-times';
            }

            res.render('users/registered', {
                message: message,
                alertType: alertType,
                iconType: iconType
            });
        }
    });
});

module.exports = router;
