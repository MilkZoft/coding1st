'use strict';

var usersModel = require('../../app/users/users.model');
var utils = require('./utils');

module.exports = (req, res, next) => {
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
            }, (userInfo) => {
                callback(userInfo[0].privilege !== 'user' ? connectedUser : false);
            });
        } else {
            callback(false);
        }
    }
};
