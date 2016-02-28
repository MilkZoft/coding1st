'use strict';

var _ = require('lodash');
var utils = require('./utils');
var post = {};

module.exports = (req, res, next) => {
    res.post = getPost;
    res.validateSecurityToken = validateSecurityToken;
    res.refreshSecurityToken = refreshSecurityToken;
    res.getAllPost = getAllPost;
    res.isPost = isPost;
    res.isGet = isGet;
    res.debug = debug;
    res.validate = validate;
    res.getContentFromTemplate = getContentFromTemplate;

    next();

    function getContentFromTemplate(template, messageTemplate) {
        return _.template(messageTemplate)(template);
    }

    function validate(inputs, validation) {
        var element = [];

        _.forEach(inputs, (input) => {
            if (!validation || validation === 'empty') {
                if (post[utils.md5(input)] === '') {
                    element.push(input);
                    return;
                }
            }
        });

        return element.length > 0 ? element[0] : false;
    }

    function debug(variable) {
        res.send(variable);
    }

    function isPost() {
        return req.method === 'POST';
    }

    function isGet() {
        return req.method === 'GET';
    }

    function getAllPost(options) {
        var values = {};

        validateSecurityToken();

        if (utils.isUndefined(options)) {
            options = {
                exclude: [
                    utils.md5('register'),
                    utils.md5('securityToken')
                ]
            };
        }

        _.forEach(post, (value, key) => {
            if (options.exclude.length > 0) {
                if (!_.includes(options.exclude, key)) {
                    values[key] = value;
                }
            } else {
                values[key] = value;
            }
        });

        refreshSecurityToken();

        return values;
    }

    function refreshSecurityToken() {
        if ($config().refreshSecurityToken) {
            res.clearSession('securityToken');
        }
    }

    function validateSecurityToken() {
        if ($config().validateSecurityToken) {
            if (res.session('securityToken') === req.body[utils.md5('securityToken')]) {
                post = req.body;
            } else {
                post = false;
            }
        } else {
            post = req.body;
        }
    }

    function getPost(input, filter) {
        var value;
        var inputs = input;
        var fn;
        var posts = {};

        if (!filter) {
            filter = 'clean';
        }

        validateSecurityToken();

        if (inputs instanceof Array) {
            _.forEach(inputs, (input) => {
                value = post[utils.md5(input)];
                filter = input.split(':');
                fn = input.split('|');

                if (fn[1] === 'now') {
                    input = input.replace('|now', '');
                    value = utils.now();
                }

                if (filter[1]) {
                    input = input.replace(':' + filter[1], '');
                    value = post[utils.md5(input)];

                    if (filter[1] !== 'html') {
                        value = utils[filter[1]](value);
                    }
                }

                posts[input] = value;
            });

            return posts;
        } else {
            if (typeof post[utils.md5(input)] !== 'undefined') {
                value = post[utils.md5(input)];

                if (filter === 'escape') {
                    value = utils.escape(value);
                } else if (filter === 'clean') {
                    value = utils.escape(utils.removeHTML(value));
                }

                if (value === 'yes') {
                    return 1;
                }

                return value === 'no' ? 0 : value;
            } else {
                return false;
            }
        }
    }
};
