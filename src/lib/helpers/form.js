'use strict';

/**
 * Dependencies
 */
var config = require('../config');
var _ = require('lodash');
var utils = require('./utils');

/**
 * Exporting methods
 */
module.exports = {
    createInput: createInput,
    createLabel: createLabel
};

/**
 * Creates an HTML Form Input
 * @param {object} attrs
 * @returns {string} html
 */
function createInput(attrs) {
    var html = '<input ';
    var type = attrs.type;
    var hasType = attrs.hasOwnProperty('type');
    var hasClass = attrs.hasOwnProperty('class');

    if (!hasType) {
        html += 'type="text" ';
    }

    if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
        html += 'class="input" ';
    }

    _.forIn(attrs, function(value, attr) {
        if (attr === 'name') {
            value = utils.md5(value);
        }

        if (value !== '') {
            html += attr + '="' + value + '" ';
        }
    });

    html += ' />';

    return html;
}

/**
 * Creates an HTML Form Label
 * @param {object} attrs
 * @returns {string} html
 */
function createLabel(attrs, text) {
    var html = '<label ';

    _.forIn(attrs, function(value, attr) {
        html += attr + '="' + value + '" ';
    });

    html += '>' + text + '</label>';

    return html;
}
