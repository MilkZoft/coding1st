'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    port: $config().database.mysql.port,
    host: $config().database.mysql.host,
    user: $config().database.mysql.user,
    password: $config().database.mysql.password,
    database: $config().database.mysql.database
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
 * Find a row by specific id
 * @param {object} obj
 * @param {function} callback
 */
function find(obj, callback) {
    var fields;
    var sql;

    if (!obj.id || !obj.table) {
        return false;
    }

    fields = (obj.fields) ? obj.fields : '*';
    sql = 'SELECT ' + fields + ' ';

    sql += 'FROM ' + obj.table + ' ';
    sql += 'WHERE ' + obj.key + ' = ' + obj.id;

    connection.query(sql, callback);
}

/**
 * Finds all rows
 * @param {object} obj
 * @param {function} callback
 */
function findAll(obj, callback) {
    var fields;
    var group;
    var order;
    var limit;
    var sql;

    if (!obj.table) {
        return false;
    }

    fields = (obj.fields) ? obj.fields : '*';
    group = (obj.group) ? ' GROUP BY ' + obj.group + ' ' : '';
    order = (obj.order) ? ' ORDER BY ' + obj.order + ' ' : '';
    limit = (obj.limit) ? ' LIMIT ' + obj.limit + ' ' : '';
    sql = 'SELECT ' + fields + ' ';

    sql += 'FROM ' + obj.table + ' ';
    sql += group;
    sql += order;
    sql += limit;

    connection.query(sql, callback);
}

/**
 * Finds by specific field
 * @param {object} obj
 * @param {function} callback
 */
function findBy(obj, callback) {
    var fields;
    var group;
    var order;
    var limit;
    var sql;

    if (!obj.table) {
        return false;
    }

    fields = (obj.fields) ? obj.fields : '*';
    group = (obj.group) ? ' GROUP BY ' + obj.group + ' ' : '';
    order = (obj.order) ? ' ORDER BY ' + obj.order + ' ' : '';
    limit = (obj.limit) ? ' LIMIT ' + obj.limit + ' ' : '';
    sql = 'SELECT ' + fields + ' ';

    sql += 'FROM ' + obj.table + ' ';
    sql += 'WHERE ' + obj.field + ' = \'' + obj.value + '\'';
    sql += group;
    sql += order;
    sql += limit;

    connection.query(sql, callback);
}

/**
 * Finds by SQL Query
 * @param {object} obj
 * @param {function} callback
 */
function findBySQL(obj, callback) {
    var fields;
    var group;
    var order;
    var limit;
    var sql;

    if (!obj.table || !obj.query) {
        return false;
    }

    fields = (obj.fields) ? obj.fields : '*';
    group = (obj.group) ? ' GROUP BY ' + obj.group + ' ' : '';
    order = (obj.order) ? ' ORDER BY ' + obj.order + ' ' : '';
    limit = (obj.limit) ? ' LIMIT ' + obj.limit + ' ' : '';
    sql = 'SELECT ' + fields + ' ';

    sql += 'FROM ' + obj.table + ' ';
    sql += 'WHERE ' + obj.query + ' ';
    sql += group;
    sql += order;
    sql += limit;

    connection.query(sql, callback);
}

/**
 * Finds the first element of a table
 * @param {object} obj
 * @param {function} callback
 */
function findFirst(obj, callback) {
    var fields;
    var sql;

    if (!obj.table) {
        return false;
    }

    fields = (obj.fields) ? obj.fields : '*';
    sql = 'SELECT ' + fields + ' ';
    sql += 'FROM ' + obj.table + ' ';
    sql += 'LIMIT 1';

    connection.query(sql, callback);
}

/**
 * Finds the last element of a table
 * @param {object} obj
 * @param {function} callback
 */
function findLast(obj, callback) {
    var fields;
    var sql;

    if (!obj.table || !obj.key) {
        return false;
    }

    fields = (obj.fields) ? obj.fields : '*';
    sql = 'SELECT ' + fields + ' ';
    sql += 'FROM ' + obj.table + ' ';
    sql += 'ORDER BY ' + obj.key + ' DESC LIMIT 1';

    connection.query(sql, callback);
}

/**
 * Executes a SQL query
 * @param {string} sql
 * @param {function} callback
 */
function query(sql, callback) {
    if (!sql) {
        return false;
    }

    connection.query(sql, callback);
}
