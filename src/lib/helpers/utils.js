'use strict';

var fs = require('fs');
var _ = require('lodash');
var dateFormat = require('date-format');
var dot = require('dot-object');
var security = require('./security');

module.exports = {
    buildJson: buildJson,
    clean: clean,
    day: day,
    encrypt: encrypt,
    escape: escape,
    getCurrentDevice: getCurrentDevice,
    getParamsFromUrl: getParamsFromUrl,
    glob: glob,
    isDay: isDay,
    isDefined: isDefined,
    isDesktop: isDesktop,
    isFunction: isFunction,
    isJson: isJson,
    isMobile: isMobile,
    isMonth: isMonth,
    isNumber: isNumber,
    isUndefined: isUndefined,
    isYear: isYear,
    md5: md5,
    month: month,
    now: now,
    pick: pick,
    randomCode: randomCode,
    removeHTML: removeHTML,
    sha1: sha1,
    year: year
};

/**
 * @name buildJson
 * @description Builds a json from vendomatic content
 * @param {object} nodes
 * @param {boolean} raw
 * @returns {object} vendomatic json
 */
function buildJson(nodes, raw) {
    var row = {};

    _.forEach(nodes, (node) => {
        row[node.keyName] = node.keyValue;
    });

    if (!raw) {
        dot.object(row);
    }

    return row;
}

/**
 * @name clean
 * @description Cleans a string
 * @param {string} str
 * @returns {string || boolean} Cleaned string
 */
function clean(str) {
    if (isDefined(str)) {
        return removeHTML(str).replace(/[`ª´·¨Ç~¿!#$%^&*()|+\-=?;'",<>\{\}\[\]\\]/gi, '');
    }

    return false;
}

/**
 * @name day
 * @description Returns the current day
 * @returns {string} Current Day
 */
function day() {
    return dateFormat('dd', new Date());
}

/**
 * @name encrypt
 * @description Returns a sha1(md5) hash with salt
 * @param {string} str String
 * @returns {string} Salted Hash
 */
function encrypt(str) {
    return security.sha1(security.md5(str));
}

/**
 * @name escape
 * @description Escapes a string
 * @param {string} str String
 * @returns {string || boolean} Escaped string
 */
function escape(str) {
    if (isDefined(str)) {
        return str
            .replace(/'/g, '\\\'')
            .replace(/"/g, '\\\\"')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    return false;
}

/**
 * @name getCurrentDevice
 * @description Validates if a device is a mobile or desktop
 * @param {string} ua User Agent
 * @returns {string} mobile or desktop
 */
function getCurrentDevice(ua) {
    return (/mobile/i.test(ua)) ? 'mobile' : 'desktop';
}

function isFunction(func) {
    return typeof func === 'function';
}

function isDefined(variable) {
    return typeof variable !== 'undefined';
}

function isUndefined(variable) {
    return typeof variable === 'undefined';
}

function isNumber(number) {
    return !isNaN(number);
}

function md5(str) {
    if (isDefined(str)) {
        return security.md5(str);
    }

    return false;
}

function sha1(str) {
    if (isDefined(str)) {
        return security.sha1(str);
    }

    return false;
}

function isYear(year) {
    return typeof year !== 'undefined' && year.length === 4 && !isNaN(year);
}

function isMonth(month) {
    return typeof month !== 'undefined' && month.length === 2 && !isNaN(month) && month <= 12;
}

function isDay(day) {
    return typeof day !== 'undefined' && day.length === 2 && !isNaN(day) && day <= 31;
}

function isDesktop(ua) {
    return !(/mobile/i.test(ua));
}

function isMobile(ua) {
    return (/mobile/i.test(ua));
}

function getParamsFromUrl(params) {
    params = params.split('/');
    params.shift();

    return params;
}

function randomCode(max, charSet) {
    var randomCode = '';
    var randomPoz;
    var i;

    max = max || 12;
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (i = 0; i < max; i++) {
        randomPoz = Math.floor(Math.random() * charSet.length);
        randomCode += charSet.substring(randomPoz, randomPoz + 1);
    }

    return randomCode;
}

function removeHTML(str) {
    if (isDefined(str)) {
        return str.replace(/(<([^>]+)>)/ig, '');
    }

    return false;
}

function isJson(str) {
    if (str === null) {
        return false;
    }

    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }

    return true;
}

function pick(key, obj) {
    return dot.pick(key, obj) || key;
}

function now() {
    return dateFormat(new Date());
}

function month() {
    return dateFormat('MM', new Date());
}

function year() {
    return dateFormat('yyyy', new Date());
}

function glob(dir, _files, urls) {
    var files = fs.readdirSync(dir);
    var i;
    var name;
    var tmp;
    var url;

    _files = _files || [];
    urls = urls || [];

    for (i in files) {
        if (files[i] !== '.DS_Store' && files[i] !== '.gitkeep') {
            name = dir + '/' + files[i];

            if (fs.statSync(name).isDirectory()) {
                glob(name, _files, urls);
            } else {
                tmp = name.split('/public/');

                if (isDefined(tmp[1])) {
                    url = $config().baseUrl + '/' + tmp[1];

                    _files.push(name);
                    urls.push(url);
                }
            }
        }
    }

    return urls;
}
