'use strict';

var fs = require('fs');
var _ = require('lodash');
var dateFormat = require('date-format');
var dot = require('dot-object');
var security = require('./security');

module.exports = {
    buildJson: buildJson,
    clean: clean,
    convertCamelToNatural: convertCamelToNatural,
    convertSecondsToHHMMSS: convertSecondsToHHMMSS,
    day: day,
    encrypt: encrypt,
    escape: escaping,
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

function encrypt(str) {
    return security.sha1(security.md5(str));
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

function getCurrentDevice(ua) {
    return (/mobile/i.test(ua)) ? 'mobile' : 'desktop';
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

function escaping(str) {
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

function clean(str) {
    if (isDefined(str)) {
        return removeHTML(str).replace(/[`ª´·¨Ç~¿!#$%^&*()|+\-=?;'",<>\{\}\[\]\\]/gi, '');
    }

    return false;
}

function convertSecondsToHHMMSS(seconds) {
    var time;
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);

    seconds = seconds - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    time = hours + ':' + minutes + ':' + seconds;

    return !seconds ? '00:00:00' : time;
}

function convertCamelToNatural(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str.split(/(?=[A-Z])/).join(' ');
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

function pick(key, obj) {
    return dot.pick(key, obj) || key;
}

function now() {
    return dateFormat(new Date());
}

function day() {
    return dateFormat('dd', new Date());
}

function month() {
    return dateFormat('MM', new Date());
}

function year() {
    return dateFormat('yyyy', new Date());
}

function glob(dir, _files) {
    var files = fs.readdirSync(dir);
    var i;
    var name;

    _files = _files || [];

    for (i in files) {
        if (files[i] !== '.DS_Store') {
            name = dir + files[i];

            if (fs.statSync(name).isDirectory()) {
                getFiles(name, files_);
            } else {
                _files.push(name);
            }
        }
    }

    return _files;
}
