'use strict';

var Model = require('../lib/helpers/model');
var Users = new Model();
var fields1 = ['network', 'networkId', 'username', 'password'];
var fields2 = ['email', 'avatar', 'subscribed'];

module.exports = {
    getPrivilege: getPrivilege,
    getUser: getUser,
    save: save
};

function getPrivilege(user, callback) {
    var procedure = Users.getProcedure('getUserPrivilege', user, fields1);

    Users.query(procedure, callback, function(result, callback) {
        var data = (result[0].length > 0) ? result[0] : false;

        callback(data);
    });
}

function getUser(user, callback) {
    var procedure = Users.getProcedure('getUser', user, fields1);

    Users.query(procedure, callback, function(result, callback) {
        var data = (result[0].length > 0) ? result[0] : false;

        callback(data);
    });
}

function save(user, callback) {
    var procedure = Users.getProcedure('saveUser', user, fields1.concat(fields2), {
        password: 'encrypt'
    });

    Users.query(procedure, callback, function(result, callback) {
        callback(result);
    });
}
