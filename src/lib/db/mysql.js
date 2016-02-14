'use strict';

var mysql = require('mysql');
var config = require('../config');

var connection = mysql.createConnection({
    port: config().database.mysql.port,
    host: config().database.mysql.host,
    user: config().database.mysql.user,
    password: config().database.mysql.password,
    database: config().database.mysql.database
});

/**
 * Exporting methods
 */
module.exports = {
    find: find,
    findAll: findAll,
    findBy: findBy,
    findBySQL: findBySQL,
    findFirst: findFirst,
    findLast: findLast,
    query: query
};

/**
 * @name find
 * @description Find a row by specific id
 * @param {object} obj
 * @param {function} callback
 */
function find(obj, callback) {
    if (!obj.id || !obj.table) {
        return false;
    }

    var fields = (obj.fields) ? obj.fields : '*';
    var sql = 'SELECT ' + fields + ' ';

    sql += 'FROM ' + obj.table + ' ';
    sql += 'WHERE ' + obj.key + ' = ' + obj.id;

    connection.query(sql, callback);
}

function findAll(obj, callback) {
    if (!obj.table) {
        return false;
    }

    var fields = (obj.fields) ? obj.fields : '*';
    var group = (obj.group) ? ' GROUP BY ' + obj.group + ' ' : '';
    var order = (obj.order) ? ' ORDER BY ' + obj.order + ' ' : '';
    var limit = (obj.limit) ? ' LIMIT ' + obj.limit + ' ' : '';
    var sql = 'SELECT ' + fields + ' ';

    sql += 'FROM ' + obj.table + ' ';
    sql += group;
    sql += order;
    sql += limit;

    connection.query(sql, callback);
}

function findBy(obj, callback) {
    if (!obj.table) {
        return false;
    }

    var fields = (obj.fields) ? obj.fields : '*';
    var group = (obj.group) ? ' GROUP BY ' + obj.group + ' ' : '';
    var order = (obj.order) ? ' ORDER BY ' + obj.order + ' ' : '';
    var limit = (obj.limit) ? ' LIMIT ' + obj.limit + ' ' : '';

    var sql = 'SELECT ' + fields + ' ';
    sql += 'FROM ' + obj.table + ' ';
    sql += 'WHERE ' + obj.field + ' = \'' + obj.value + '\'';
    sql += group;
    sql += order;
    sql += limit;

    connection.query(sql, callback);
}

function(obj, callback) {
    if (!obj.table) {
        return false;
    }

    if (!obj.query) {
        return false;
    }

    var fields = (obj.fields) ? obj.fields : '*';
    var group = (obj.group) ? ' GROUP BY ' + obj.group + ' ' : '';
    var order = (obj.order) ? ' ORDER BY ' + obj.order + ' ' : '';
    var limit = (obj.limit) ? ' LIMIT ' + obj.limit + ' ' : '';

    var sql = 'SELECT ' + fields + ' ';
    sql += 'FROM ' + obj.table + ' ';
    sql += 'WHERE ' + obj.query + ' ';
    sql += group;
    sql += order;
    sql += limit;

    connection.query(sql, callback);
}

function findFirst(obj, callback) {
    if (!obj.table) {
        return false;
    }

    var fields = (obj.fields) ? obj.fields : '*';
    var sql = 'SELECT ' + fields + ' ';
    sql += 'FROM ' + obj.table + ' ';
    sql += 'LIMIT 1';

    connection.query(sql, callback);
}

function findLast(obj, callback) {
    if (!obj.table || !obj.key) {
        return false;
    }

    var fields = (obj.fields) ? obj.fields : '*';
    var sql = 'SELECT ' + fields + ' ';
    sql += 'FROM ' + obj.table + ' ';
    sql += 'ORDER BY ' + obj.key + ' DESC LIMIT 1';

    connection.query(sql, callback);
}

function query(sql, callback) {
    if (!sql) {
        return false;
    }

    connection.query(sql, callback);
}
