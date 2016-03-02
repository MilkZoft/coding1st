'use strict';

var utils = require('./utils');

module.exports = (req, res, next) => {
    var contentBase;

    res.content = content;

    next();

    function content(contentKey, base) {
        if (base) {
            contentBase = contentKey;
        } else if (contentBase && utils.pick(contentKey, res.__) === contentKey) {
            contentKey = contentBase + '.' + contentKey;
        }

        return utils.pick(contentKey, res.__);
    }
};
