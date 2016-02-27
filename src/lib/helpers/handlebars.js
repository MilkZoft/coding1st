'use strict';

var config = require('../config');
var htmlMinify = require('html-minifier').minify;
var form   = require('./form');
var utils  = require('./utils');
var social = require('./social');

module.exports = {
    ceil: ceil,
    checkbox: checkbox,
    debug: debug,
    email: email,
    flash: flash,
    gt: gt,
    gte: gte,
    hidden: hidden,
    icon: icon,
    input: input,
    is: is,
    isNot: isNot,
    json: json,
    label: label,
    lowercase: lowercase,
    lt: lt,
    lte: lte,
    minify: minify,
    now: now,
    password: password,
    radio: radio,
    reverse: reverse,
    select: select,
    socialButtons: socialButtons,
    submit: submit,
    textarea: textarea,
    token: token,
    uppercase: uppercase
};

function flash(value) {
    return value || '';
}

function debug(variable) {
    console.log('Debugging Handlebars:');
    console.log('=====================');
    console.log(this);

    console.log('Dumping Variable:');
    console.log('========================');
    console.log(variable);
}

function lowercase(str) {
    return str.toLowerCase();
}

function uppercase(str) {
    return str.toUpperCase();
}

function reverse(str) {
    return str.split('').reverse().join('');
}

function ceil(number) {
    return Math.ceil(parseFloat(number));
}

function now() {
    return new Date();
}

function is(variable, value, options) {
    return variable && variable === value ? options.fn(this) : options.inverse(this);
}

function isNot(variable, value, options) {
    return !variable || variable !== value ? options.fn(this) : options.inverse(this);
}

function gt(value1, value2, options) {
    return value1 > value2 ? options.fn(this) : options.inverse(this);
}

function gte(value1, value2, options) {
    return value1 >= value2 ? options.fn(this) : options.inverse(this);
}

function lt(value1, value2, options) {
    return value1 < value2 ? options.fn(this) : options.inverse(this);
}

function lte(value1, value2, options) {
    return value1 <= value2 ? options.fn(this) : options.inverse(this);
}

function json(content) {
    return JSON.stringify(content);
}

function minify(content) {
    return htmlMinify(content.fn(this), {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true
    });
}

function input(options) {
    if (utils.isDefined(options.hash)) {
        return form.createInput(options.hash);
    }
}

function textarea(options) {
    if (utils.isDefined(options.hash)) {
        return form.createTextarea(options.hash);
    }
}

function select(options) {
     if (utils.isDefined(options.hash)) {
        return form.createSelect(options.hash);
    }
}

function submit(options) {
    if (utils.isDefined(options.hash)) {
        options.hash.type = 'submit';

        if (utils.isUndefined(options.hash.class)) {
            options.hash.class = 'submit';
        } else {
            options.hash.class += ' submit';
        }

        return form.createInput(options.hash);
    }
}

function password(options) {
    if (utils.isDefined(options.hash)) {
        options.hash.id = 'password';
        options.hash.type = 'password';
        options.hash.name = 'password';

        return form.createInput(options.hash);
    }
}

function email(options) {
    if (utils.isDefined(options.hash)) {
        options.hash.id = 'email';
        options.hash.type = 'email';
        options.hash.name = 'email';
        options.hash.maxlength = '80';
        options.hash.pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';

        return form.createInput(options.hash);
    }
}

function hidden(options) {
    if (utils.isDefined(options.hash)) {
        options.hash.type = 'hidden';

        return form.createInput(options.hash);
    }
}

function token(securityToken) {
    var options = {};

    if (utils.isDefined(securityToken)) {
        options.type  = 'hidden';
        options.name  = 'securityToken';
        options.value = securityToken;

        return form.createInput(options);
    }
}

function checkbox(options) {
    if (utils.isDefined(options.hash)) {
        options.hash.type = 'checkbox';

        return form.createInput(options.hash);
    }
}

function radio(options) {
    if (utils.isDefined(options.hash)) {
        options.hash.type = 'radio';

        return form.createInput(options.hash);
    }
}

function label(options) {
    if (utils.isDefined(options.hash)) {
        var labelText = (options.hash.text) ? options.hash.text : '';

        return form.createLabel(options.hash, labelText);
    }
}

function icon(icon) {
    return '<i class="fa ' + icon + '"></i>';
}

function socialButtons(options) {
    var networks = [];
    var network = {};

    if (utils.isDefined(options.hash)) {
        if (options.hash.facebook) {
            network = {
                name: 'facebook',
                text: options.hash.facebookText,
                link: options.hash.facebookLink
            };

            networks.push(network);
        }

        if (options.hash.twitter) {
            network = {
                name: 'twitter',
                text: options.hash.twitterText,
                link: options.hash.twitterLink
            };

            networks.push(network);
        }
    }

    return social.createButtons(networks);
}
