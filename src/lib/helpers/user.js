'use strict';

var usersModel = require('../../models/users');
var utils = require('./utils');

module.exports = function(req, res, next) {
    res.profileAllowed = profileAllowed;

    next();

    function profileAllowed(callback) {
        var connectedUser = res.session('user');

        if (utils.isDefined(connectedUser) && utils.isDefined(res.session('oauth'))) {
            usersModel.getPrivilege({
                network: connectedUser.network,
                networkId: connectedUser.networkId,
                username: connectedUser.username,
                password: false
            }, function(userInfo) {
                callback(userInfo[0].privilege !== 'user' ? connectedUser : false);
            });
        } else {
            callback(false);
        }
    }
};
