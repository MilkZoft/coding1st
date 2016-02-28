'use strict';

var express = require('express');
var router = express.Router();
var usersModel = require('./users.model');
var utils = require($rootPath('/lib/helpers/utils'));
var renderOptions = {};

/**
 * Validates that the user is connected
 */
router.get('/validation', (req, res, next) => {
    if (utils.isDefined(res.session('user')) && utils.isDefined(res.session('oauth'))) {
        var connectedUser = res.session('user');

        usersModel.getUser({
            network: connectedUser.network,
            networkId: connectedUser.networkId,
            username: connectedUser.username,
            password: false
        }, (userInfo) => {
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
router.get('/logout', (req, res, next) => {
    res.destroySessions();

    res.redirect('/');
});

/**
 * Renders login view
 */
router.get('/login', (req, res, next) => {
    res.render('users/login');
});

/**
 * Renders register view
 */
router.get('/register', (req, res, next) => {
    if (utils.isDefined(res.session('user')) && utils.isDefined(res.session('oauth'))) {
        var connectedUser = res.session('user');

        res.clearSession(['user', 'oauth']);

        renderOptions.user = connectedUser;

        res.render('users/register', renderOptions);
    } else {
        renderOptions.user = false;

        res.render('users/register', renderOptions);
    }
});

/**
 * Register a new user
 */
router.post('/registration', (req, res, next) => {
    var post = res.getAllPost();

    usersModel.save(post, (status) => {
        if (utils.isUndefined(status)) {
            res.redirect('/');
        } else {
            var message = res.content('users.register.success');
            var alertType = 'success';
            var iconType = 'fa-check';

            if (utils.isDefined(status[0][0].error)) {
                renderOptions.message = res.__.db.errors[status[0][0].error];
                renderOptions.alertType = 'danger';
                renderOptions.iconType = 'fa-times';
            }

            res.render('users/registered', renderOptions);
        }
    });
});

module.exports = router;
