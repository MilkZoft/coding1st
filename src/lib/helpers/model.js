'use strict';

/**
 * Dependencies
 */
var db = require($rootPath('/lib/db/mysql'));
var utils = require('./utils');
var _ = require('lodash');

/**
 * Exporting methods
 */
module.exports = __construct;

/**
 * Constructor
 */
function __construct(schema) {
    return {
        executeQuery: executeQuery,
        get: get,
        getProcedure: getProcedure,
        query: query
    };
}

/**
 * Performs a SQL Query
 * @param {string} sql
 * @param {function} callback
 * @returns {string} language (es, en, etc.)
 */
function executeQuery(sql, callback) {
    db.query(sql, callback);
}

/**
 * Builds a query based on the properties
 * @param {object} q
 * @param {function} callback
 * @returns {boolean} || {callback}
 */
function get(q, callback) {
    var fields = Object.keys(q);
    var count = fields.length - 1;
    var query = '';
    var field;
    var value;

    if (q === 'all') {
        schema.fields = schema.fields;

        db.findAll({
            table: schema.table,
            fields: schema.fields,
            group: schema.group,
            order: schema.order,
            limit: schema.limit
        }, callback);
    } else if (!isNaN(q)) {
        schema.key = schema.key;
        schema.fields = schema.fields;

        db.find({
            id: parseInt(q),
            table: schema.table,
            fields: schema.fields,
            key: schema.key
        }, callback);
    } else if (typeof(q) === 'object') {
        if (fields.length > 1) {
            for (var i = 0; i <= count; i++) {
                if (i === count) {
                    query += fields[i] + ' = \'' + q[fields[i]] + '\'';
                } else {
                    query += fields[i] + ' = \'' + q[fields[i]] + '\' AND ';
                }
            }

            db.findBySQL({
                query: query,
                table: schema.table,
                fields: schema.fields,
                group: schema.group,
                order: schema.order,
                limit: schema.limit
            }, callback);
        } else {
            field = fields[0];
            value = q[field];

            db.findBy({
                field: field,
                value: value,
                table: schema.table,
                fields: schema.fields,
                group: schema.group,
                order: schema.order,
                limit: schema.limit
            }, callback);
        }
    }

    return false;
}

/**
 * Builds the SQL Query to execute a procedure with params
 * @param {string} procedure
 * @param {object} values
 * @param {object} fields
 * @param {object} filters
 * @returns {string} SQL Procedure query
 */
function getProcedure(procedure, values, fields, filter) {
    var params = '';
    var i = 0;
    var total = fields.length - 1;
    var value;
    var keys = _.keys(values);
    var encrypted = false;
    var method;
    var filters = filter || {};

    if (utils.isUndefined(filters)) {
        filters = {};
    }

    if (keys[0].length === 32) {
        encrypted = true;
    }

    _.forEach(fields, function(field) {
        value = values[(encrypted) ? utils.md5(field) : field];

        if (value === 'on') {
            value = 1;
        }

        if (utils.isUndefined(value)) {
            value = '';
        }

        if (field === 'networkId') {
            value = '\'' + utils.clean(value.toString()) + '\'';
        }

        if (!utils.isNumber(value)) {
            method = filters[field];

            if (filter === false) {
                value = '\'' + value + '\'';
            } else {
                if (utils.isDefined(method) && utils.isFunction(utils[method])) {
                    value = '\'' + utils[method](value) + '\'';
                } else {
                    value = '\'' + utils.clean(value) + '\'';
                }
            }
        }

        if (i === total) {
            params += value;
        } else {
            params += value + ', ';
            i++;
        }
    });

    procedure = 'CALL ' + procedure + '(' + params + ');';

    return procedure.replace(new RegExp(', ,', 'g'), ', \'\',');
}

/**
 * Performs a SQL Query
 * @param {string} sql
 * @param {function} callback
 * @param {function} fn
 */
function query(sql, callback, fn) {
    executeQuery(sql, function(error, result) {
        fn(result, callback);
    });
}
