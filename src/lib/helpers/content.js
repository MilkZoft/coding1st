'use strict';

var utils = require('./utils');

module.exports = (req, res, next) => {
    res.content = content;

    next();

    function content(contentKey) {
        return utils.pick(contentKey, res.__);
    }
};
