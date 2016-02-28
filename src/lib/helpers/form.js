'use strict';

/**
 * Dependencies
 */
var _ = require('lodash');
var utils = require('./utils');

/**
 * Exporting methods
 */
module.exports = {
    createInput: createInput,
    createLabel: createLabel,
    createTextarea: createTextarea,
    createSelect: createSelect
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

    _.forIn(attrs, (value, attr) => {
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
 * Creates an HTML Form Textarea
 * @param {object} attrs
 * @returns {string} html
 */
function createTextarea(attrs) {
    var html = '<textarea ';
    var type = attrs.type;
    var hasClass = attrs.hasOwnProperty('class');
    var content = '';

    if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
        html += 'class="textarea" ';
    }

    _.forIn(attrs, (value, attr) => {
        if (attr === 'name') {
            value = utils.md5(value);
        }

        if (attr === 'value' && value !== '') {
            content = value;
        } else if (value !== '') {
            html += attr + '="' + value + '" ';
        }
    });

    html += '>' + content + '</textarea>';

    return html;
}

/**
 * Creates an HTML Form Textarea
 * @param {object} attrs
 * @returns {string} html
 */
function createSelect(attrs) {
    var options = attrs.options.split('|');
    var html = '<select ';
    var type = attrs.type;
    var hasClass = attrs.hasOwnProperty('class');
    var value;

    if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
        html += 'class="select" ';
    }

    _.forIn(attrs, (value, attr) => {
        if (attr === 'name') {
            value = utils.md5(value);
        }

        if (value !== '') {
            html += attr + '="' + value + '" ';
        }
    });

    html += '>';

    _.forEach(options, (option) => {
        if (option.indexOf(':') > -1) {
            value = option.substr(0, option.indexOf(':'));
            option = option.substr(option.indexOf(':') + 1);

            html += '<option value="' + value + '">' + option + '</option>';
        } else {
            html += '<option>' + option + '</option>';
        }
    });

    html += '</select>';

    return html;
}

/**
 * Creates an HTML Form Label
 * @param {object} attrs
 * @returns {string} html
 */
function createLabel(attrs, text) {
    var html = '<label ';

    _.forIn(attrs, (value, attr) => {
        html += attr + '="' + value + '" ';
    });

    html += '>' + text + '</label>';

    return html;
}
