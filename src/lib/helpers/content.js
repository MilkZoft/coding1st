'use strict';

var config = require('../config');
var _ = require('lodash');
var utils = require('./utils');

module.exports = function(req, res, next) {
    res.content = content;

    next();

    function content(contentKey) {
        return utils.pick(contentKey, res.__);
    }
};
